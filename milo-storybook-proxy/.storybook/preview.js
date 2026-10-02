import { action } from 'storybook/actions';
import { UPDATE_STORY_ARGS } from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';
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

// Logs each click on a link or button in the Actions tab. Links stay on the story, apart from
// Milo's modal links and links to a # on the same page. Listens on the document, where it runs
// after Milo's own click handlers and sees modals, which Milo opens outside the story's root.
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
  if (el.href && !el.dataset.modalHash && !samePageHash(el)) e.preventDefault();
});

// Events Milo blocks dispatch on window that a story can trigger.
['milo:tab:changed', 'milo:modal:loaded', 'milo:modal:closed'].forEach((name) => {
  window.addEventListener(name, () => action(name)());
});

// scripts/build.js builds the default branch at the site's root and each other branch in a
// folder named after it, and gives each build the branch switcher's state. The switcher links to
// another build by host and path, so it needs the site's path, such as /milo on GitHub Pages.
const { currentBranch, defaultBranch } = JSON.parse(import.meta.env.STORYBOOK_BRANCH_SWITCHER_STATE ?? '{}');
const site = new URL(currentBranch === defaultBranch ? '.' : '..', window.location.href);

export default {
  tags: ['autodocs'],
  parameters: {
    // Each story on a Docs page gets its own iframe, so Milo's page styles don't apply to the
    // Docs page itself. The table of contents lists a page's h3 headings.
    docs: { story: { inline: false, iframeHeight: '600px' }, toc: true },
    // The CSS Custom Properties tab lists the tokens each block reads, and the Design Tokens Docs
    // pages list every token, so the Design Tokens tab is hidden.
    designToken: { disable: true },
    options: {
      storySort: {
        order: ['C2', ['Design Tokens', [
          'Primitive', ['Color', 'Font', 'Spacing', 'Border', 'Effects'],
          'Semantic', ['Color', 'Font', 'Spacing', 'Border', 'Effects'],
          'Responsive', [
            'Typography', ['Font Size', 'Letter Spacing', 'Line Height'],
            'Spacing', ['Viewport & Section Padding', 'Layout', 'Other'],
          ],
        ]], 'C1'],
      },
    },
    branches: { hostname: `${site.host}${site.pathname.replace(/\/$/, '')}` },
    // Stories render live pages, so they have no args to save to a story file. Without this,
    // setting the Variants control to the authored variants offers to save them.
    controls: { disableSaveFromUI: true },
  },
  beforeEach: (context) => {
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
