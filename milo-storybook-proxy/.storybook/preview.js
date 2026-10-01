import { addons } from 'storybook/preview-api';
import { format } from 'prettier/standalone';
import htmlPlugin from 'prettier/plugins/html';

// Milo decorates a story after Storybook renders it. Waits until the story's main element has a
// data-milo-status, or 30 seconds pass, so checks that run after the story see the decorated
// block. Storybook runs afterEach hooks in reverse order, so this one runs before the addons'.
async function waitForMilo({ canvasElement }) {
  const main = canvasElement.querySelector('main');
  const end = Date.now() + 30000;
  while (main && !main.dataset.miloStatus && Date.now() < end) {
    await new Promise((resolve) => { setTimeout(resolve, 100); });
  }
}

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

// The CSS custom properties addon writes every value in the story's cssprops parameter onto the
// body when its tab opens, not only edited ones. A value on the body overrides Milo's breakpoint
// values on :root and any variable a block reads with a fallback, so this removes each value
// that still matches the parameter.
let cssprops = {};
function removeUneditedCssprops() {
  const { style } = document.body;
  Array.from(style)
    .filter((name) => style.getPropertyValue(name).trim() === cssprops[name.slice(2)]?.value)
    .forEach((name) => style.removeProperty(name));
}
new MutationObserver(removeUneditedCssprops)
  .observe(document.body, { attributeFilter: ['style'] });

// The addon also saves each story's values in localStorage the first time its tab opens, and
// keeps showing and applying them after Milo's CSS changes, even after Reset controls. Drops a
// story's saved values once they no longer match its parameter.
function dropStaleCssprops(storyId) {
  const saved = JSON.parse(localStorage.getItem('addon-cssprops'));
  const initial = saved?.initialCustomProperties?.[storyId];
  const current = Object.fromEntries(Object.entries(cssprops).map(([name, { value }]) => [name, value]));
  if (!initial || JSON.stringify(initial) === JSON.stringify(current)) return;
  delete saved.initialCustomProperties[storyId];
  delete saved.customProperties?.[storyId];
  localStorage.setItem('addon-cssprops', JSON.stringify(saved));
}

export default {
  tags: ['autodocs'],
  parameters: {
    // Each story on a Docs page gets its own iframe, so Milo's page styles don't apply to the
    // Docs page itself.
    docs: { story: { inline: false, iframeHeight: '600px' } },
  },
  beforeEach: ({ id, parameters }) => {
    cssprops = parameters.cssprops ?? {};
    dropStaleCssprops(id);
    removeUneditedCssprops();
  },
  afterEach: async (context) => {
    await waitForMilo(context);
    await showDecoratedHtml(context);
  },
};
