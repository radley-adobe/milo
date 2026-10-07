import { action } from 'storybook/actions';
import { DOCS_PREPARED, GLOBALS_UPDATED, STORY_ARGS_UPDATED, UPDATE_STORY_ARGS } from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';
import { themes } from 'storybook/theming';
import { format } from 'prettier/standalone';
import htmlPlugin from 'prettier/plugins/html';
import { values as tokenValues } from 'virtual:design-tokens';
import { setStory, shownVariants, waitForMilo } from '../src/milo.js';

// The HTML addon reads the story's markup right after Storybook renders it, before Milo
// decorates it. Sends the decorated markup to its panel, formatted the same way the addon does.
async function showDecoratedHtml({ canvasElement }) {
  const html = canvasElement.innerHTML;
  const code = await format(html, {
    parser: 'html',
    plugins: [htmlPlugin],
    htmlWhitespaceSensitivity: 'ignore',
  }).catch(() => html);
  addons.getChannel().emit('storybook/html/codeUpdate', { code });
}

// Two addons write the values they list onto the story's elements as soon as their tab shows
// them, not only values someone edits. A value there overrides Milo's breakpoint values on
// :root and any variable a block reads with a fallback. Removes each property in the element's
// style attribute that `isUnedited` matches, now and whenever the attribute changes, and returns
// a function that does it once. A tab that's open when the page loads writes before this runs.
function keepEditedOnly(element, isUnedited) {
  const remove = () => {
    const { style } = element;
    Array.from(style)
      .filter((name) => isUnedited(name, style.getPropertyValue(name).trim()))
      .forEach((name) => style.removeProperty(name));
  };
  new MutationObserver(remove).observe(element, { attributeFilter: ['style'] });
  remove();
  return remove;
}

// The CSS custom properties addon writes onto the body every value in the story's cssprops
// parameter.
let cssprops = {};
const removeUneditedCssprops = keepEditedOnly(
  document.body,
  (name, value) => value === cssprops[name.slice(2)]?.value,
);

// The design token addon writes onto the html element each token its tab lists, and the
// breakpoint and theme categories repeat the same tokens with different values.
keepEditedOnly(document.documentElement, (name, value) => tokenValues[name]?.includes(value));

// The CSS custom properties addon also saves each story's values in localStorage the first time
// its tab opens, and keeps showing and applying them after Milo's CSS changes, even after Reset
// controls. Drops a story's saved values once they no longer match its parameter.
function dropStaleCssprops(storyId) {
  const saved = JSON.parse(localStorage.getItem('addon-cssprops'));
  const initial = saved?.initialCustomProperties?.[storyId];
  const current = Object.fromEntries(Object.entries(cssprops).map(([name, { value }]) => [name, value]));
  if (!initial || JSON.stringify(initial) === JSON.stringify(current)) return;
  delete saved.initialCustomProperties[storyId];
  delete saved.customProperties?.[storyId];
  localStorage.setItem('addon-cssprops', JSON.stringify(saved));
}

// A story's Variants control starts unset. Once Milo has decorated the story, sets it to the
// variants the block was authored with. Storybook renders the story again, and src/milo.js keeps
// the decorated block because its variants haven't changed.
function syncVariants({ id, args }) {
  const variants = shownVariants();
  if (args.variants !== undefined || !variants) return;
  addons.getChannel().emit(UPDATE_STORY_ARGS, { storyId: id, updatedArgs: { variants } });
}

// Logs each click on a link or button in the Actions tab. Links stay on the story. Milo's modal
// links and links to a # on the same page change the story's own hash, as they would on a page.
// Storybook's preview page sets `<base target="_parent">`, so a link left to navigate would load
// in the window that holds the story: Storybook's manager, or the Docs page. Listens on the
// document, where it runs after Milo's own click handlers and sees modals, which Milo opens
// outside the story's root.
const samePageHash = (a) => a.hash && a.href.split('#')[0] === window.location.href.split('#')[0];
document.addEventListener('click', (e) => {
  const el = e.target.closest('a, button');
  if (!el) return;
  action('click')({
    element: el.nodeName.toLowerCase(),
    text: el.textContent.trim(),
    ...(el.href && { href: el.href }),
    ...(el.hasAttribute('daa-ll') && { analytics: el.getAttribute('daa-ll') }),
  });
  if (!el.href || e.defaultPrevented) return;
  e.preventDefault();
  if (el.dataset.modalHash || samePageHash(el)) window.location.hash = el.hash;
});

// The manager shows Docs pages and stories in the same preview window. A Docs page's table of
// contents leaves its click, scroll and hashchange listeners on the window, and they throw on a
// link to a #, such as a Milo modal link, which fails the story's play function. A story leaves
// Milo's styles in the window, and their heading styles apply to a Docs page's headings. So a
// story that renders after a Docs page, and a Docs page that renders after a story, load the
// window again first. The hash of a modal that a story opened is cleared before that, so the
// modal doesn't open again.
let docsShown = false;
let storyShown = false;
addons.getChannel().on(DOCS_PREPARED, () => {
  docsShown = true;
  if (window.location.hash) window.location.hash = '';
  if (storyShown) window.location.reload();
});

// Events Milo blocks dispatch on window that a story can trigger.
['milo:tab:changed', 'milo:modal:loaded', 'milo:modal:closed'].forEach((name) => {
  window.addEventListener(name, () => action(name)());
});

// On a Docs page, each story renders in its own iframe, and only the Docs page itself gets the
// toolbar's Preview background and Theme and the args its Controls table sets. A story iframe on a
// Docs page copies the background and Theme when it loads, before its story first renders, and
// copies them and its story's args whenever they change. Elsewhere, the parent window is
// Storybook's manager, which has no preview, or a page on another site, which can't be read.
// Returns a function that stops following them.
function followDocsPage() {
  let docsPage;
  try {
    if (window.parent !== window) docsPage = window.parent.__STORYBOOK_PREVIEW__;
  } catch {
    return undefined;
  }
  if (!docsPage) return undefined;
  const preview = window.__STORYBOOK_PREVIEW__;
  const followGlobals = () => {
    const { backgrounds, theme } = docsPage.storyStoreValue.userGlobals.get();
    const own = preview.storyStoreValue.userGlobals.get();
    if (JSON.stringify(backgrounds) === JSON.stringify(own.backgrounds) && theme === own.theme) return;
    preview.onUpdateGlobals({ globals: { backgrounds, theme } });
  };
  // The iframe sends its own args updates to the Docs page too, so an update that matches the
  // story's args is skipped. Storybook merges updated args into the story's, so args the Docs
  // page no longer has, such as one Reset controls unset, are unset here too.
  const ownStory = new URLSearchParams(window.location.search).get('id');
  const followArgs = ({ storyId, args }) => {
    if (storyId !== ownStory) return;
    const own = preview.storyStoreValue.args.get(storyId);
    if (JSON.stringify(args) === JSON.stringify(own)) return;
    const unset = Object.fromEntries(Object.keys(own).map((name) => [name, undefined]));
    preview.onUpdateArgs({ storyId, updatedArgs: { ...unset, ...args } });
  };
  const stop = () => {
    docsPage.channel.off(GLOBALS_UPDATED, followGlobals);
    docsPage.channel.off(STORY_ARGS_UPDATED, followArgs);
  };
  preview.ready().then(() => {
    followGlobals();
    docsPage.channel.on(GLOBALS_UPDATED, followGlobals);
    docsPage.channel.on(STORY_ARGS_UPDATED, followArgs);
  });
  window.addEventListener('pagehide', stop);
  return stop;
}

// On a Docs page, each story iframe sits in a box as high as the story's `iframeHeight`
// parameter. Makes the box as high as the story when the story is higher, whenever the story's
// size changes. Positioned elements, such as menus and modals, don't count. Content sized to the
// frame's height, such as `100vh`, grows each time the box does, so a change in the story's
// height that matches the box's last change is left alone. Returns a function that stops.
function fitDocsFrame() {
  let box;
  try {
    if (window.parent !== window && window.parent.__STORYBOOK_PREVIEW__) box = window.frameElement?.parentElement;
  } catch {
    return undefined;
  }
  const min = parseFloat(box?.style.height);
  if (!min) return undefined;
  const root = document.getElementById('storybook-root');
  let height = min;
  let content = 0;
  let change = 0;
  const fit = () => {
    const next = Math.ceil(root.getBoundingClientRect().bottom + window.scrollY
      + parseFloat(getComputedStyle(document.body).paddingBottom));
    const grew = next - content;
    content = next;
    const target = Math.max(min, next);
    if (target === height || (change > 0 && grew === change)) return;
    change = target - height;
    height = target;
    box.style.height = `${height}px`;
  };
  // Resizing the box resizes the story, so it waits for the next frame, outside the observer's
  // callback.
  const observer = new ResizeObserver(() => requestAnimationFrame(fit));
  observer.observe(root);
  const stop = () => observer.disconnect();
  window.addEventListener('pagehide', stop);
  return stop;
}

// scripts/build.js builds the default branch at the site's root and each other branch in a
// folder named after it, and gives each build the branch switcher's state. The switcher links to
// another build by host and path, so it needs the site's path, such as /milo on GitHub Pages.
const { currentBranch, defaultBranch } = JSON.parse(import.meta.env.STORYBOOK_BRANCH_SWITCHER_STATE ?? '{}');
const site = new URL(currentBranch === defaultBranch ? '.' : '..', window.location.href);

export default {
  tags: ['autodocs'],
  beforeAll: () => {
    const stops = [followDocsPage(), fitDocsFrame()];
    return () => stops.forEach((stop) => stop?.());
  },
  // The Theme menu in the toolbar puts Milo's `dark` class on the body, which sets the dark
  // color tokens for every story.
  globalTypes: {
    theme: {
      description: "Milo's light or dark theme",
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [(story, { globals }) => {
    document.body.classList.toggle('dark', globals.theme === 'dark');
    return story();
  }],
  parameters: {
    // Each story on a Docs page gets its own iframe, so Milo's page styles don't apply to the
    // Docs page itself. `iframeHeight` is the iframe's least height; fitDocsFrame() grows it to
    // fit the story. The table of contents lists a page's h3 headings. Docs pages are light or
    // dark as the browser prefers, like the rest of Storybook.
    docs: { theme: themes.normal, story: { inline: false, iframeHeight: '600px' }, toc: true },
    // The CSS Custom Properties tab lists the tokens each block reads, and the Design Tokens Docs
    // pages list every token, so the Design Tokens tab is hidden.
    designToken: { disable: true },
    options: {
      // Titles after the listed ones sort by name. Stories in one file keep their file's order.
      storySort: {
        method: 'alphabetical',
        order: ['Foundations', [
          'Typography', ['Headings', 'Body', 'Misc'],
          'Layout', 'Section Spacing', 'Motion', 'Utilities',
        ], 'Design Tokens', [
          'Primitive', ['Color', 'Font', 'Spacing', 'Border', 'Effects'],
          'Semantic', ['Color', 'Color - Button', 'Color - Icon Button', 'Font', 'Spacing', 'Border', 'Effects'],
          'Responsive', [
            'Typography', ['Font Size', 'Letter Spacing', 'Line Height'],
            'Spacing', ['Section Spacing', 'Viewport Vertical Padding', 'Layout', 'Misc'],
          ],
        ], 'Blocks', 'Sections', 'Components', 'Navigation'],
      },
    },
    branches: { hostname: `${site.host}${site.pathname.replace(/\/$/, '')}` },
    // Stories render live pages, so they have no args to save to a story file. Without this,
    // setting the Variants control to the authored variants offers to save them.
    controls: { disableSaveFromUI: true },
  },
  beforeEach: (context) => {
    if (docsShown) window.location.reload();
    storyShown = true;
    setStory(context);
    cssprops = context.parameters.cssprops ?? {};
    dropStaleCssprops(context.id);
    removeUneditedCssprops();
  },
  // Waits for Milo, so checks that run after the story see the decorated block. Storybook runs
  // afterEach hooks in reverse order, so this one runs before the addons'.
  afterEach: async (context) => {
    await waitForMilo(context);
    await showDecoratedHtml(context);
    syncVariants(context);
  },
};
