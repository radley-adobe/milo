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

export default {
  tags: ['autodocs'],
  parameters: {
    // Each story on a Docs page gets its own iframe, so Milo's page styles don't apply to the
    // Docs page itself.
    docs: { story: { inline: false, iframeHeight: '600px' } },
  },
  afterEach: async (context) => {
    await waitForMilo(context);
    await showDecoratedHtml(context);
  },
};
