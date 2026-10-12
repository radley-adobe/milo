import { ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/logo-ticker';
import variants from 'virtual:variants/c2/logo-ticker';
import { attr, sectionMetadata } from './authored.js';

const description = `
A row of logos that scrolls sideways in a loop, with a button that pauses it. It's authored as one or two rows: the logos, then an optional row of labels.

- The first row holds the logos as icons, such as \`:sr-amazon-logo:\`. The second holds up to three labels separated by \`||\`: the logos' accessible name, the button's name while the logos are paused, and its name while they play. The button's names are \`Play logos\` and \`Pause logos\` when the row leaves them out.
- \`dark\` gives the block a dark background and styles the logos and button for it. A \`dark\` section styles them the same way.
- When the logos fit in the block with room to spare, they're centered and still, with no button. Otherwise they move toward the start of the line: to the left, or to the right on a right-to-left page.
- While the logos play and the block is in view, scrolling the page down moves them further along and scrolling up moves them back
- With reduced motion, the logos start paused, and the button plays them
`;

// The labels row: the logos' name, then the button's play and pause names, separated by `||`.
// Empty labels at the end are left out, so the block uses its own button names.
const labels = (...values) => {
  const list = values.map((value) => value ?? '');
  while (list.length && !list.at(-1)) list.pop();
  return list.join(' || ');
};

// Authored markup for the block from a story's args, followed by section metadata when `style`
// sets the section's style. Each logo is an icon, which Milo loads by its name from Federal, or
// from its own icons.
const authored = ({ variants: classes = [], logos = [], label, playLabel, pauseLabel }, style) => {
  const text = labels(label, playLabel, pauseLabel);
  const block = `
<div class="${['logo-ticker', ...classes].join(' ')}">
  <div>
    <div>
      ${logos.map((name) => `<p><span class="icon icon-${attr(name)}"></span></p>`).join('\n      ')}
    </div>
  </div>
  ${text ? `<div>
    <div>${text}</div>
  </div>` : ''}
</div>`.trim().replace(/\n\s*\n/g, '\n');
  return [block, sectionMetadata({ style })].filter(Boolean).join('\n');
};

// A story that renders the block from its args. Show code gives the authored markup.
const blockStory = (style) => ({
  render: (args) => renderBlock(authored(args, style), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args, style) } } },
});

export default {
  title: 'Blocks/Logo Ticker',
  parameters: { cssprops, liveExamples: [LIVE.pdfEssentials], docs: { description: { component: description } } },
  argTypes: {
    variants,
    logos: { control: 'object', description: 'Icon names of the logos, in order' },
    label: { control: 'text', description: 'Accessible name of the logos. Leave empty for none.' },
    playLabel: { control: 'text', description: 'The button\'s name while the logos are paused' },
    pauseLabel: { control: 'text', description: 'The button\'s name while the logos play' },
  },
};

// The logos on the PDF and document essentials page, in a section with that page's spacing.
export const Default = {
  ...blockStory('spacing-lg'),
  args: {
    variants: [],
    logos: ['sr-amazon-logo', 'sr-astrazeneca-logo', 'sr-duke-logo', 'sr-epson-logo', 'sr-fanatics-logo', 'sr-hsbc-logo',
      'sr-meta-logo', 'sr-puma-logo', 'sr-regeneron-logo', 'sr-tesla-logo', 'sr-walmart-logo', 'sr-mlb-logo'],
    label: 'Official logos for Amazon, AstraZeneca, Duke University, Epson, Fanatics, HSBC, Meta, Puma, Regeneron, Tesla, Walmart, and MLB',
    playLabel: '',
    pauseLabel: '',
  },
};

// The same logos with `dark`.
export const Dark = {
  ...blockStory('spacing-lg'),
  args: { ...Default.args, variants: ['dark'] },
};

// The block and its section on the PDF and document essentials page, as published.
export const PdfAndDocumentEssentials = {
  name: 'adobe.com: PDF and document essentials',
  render: () => renderPageBlock(`${ACROBAT}/pdf-and-document-essentials`, 'logo-ticker', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};

// The block and its `dark` section in the Creative Cloud Pro hub test fragment, as published.
export const CreativeCloudProHub = {
  name: 'Redesign test: Creative Cloud Pro hub',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-hub`, 'logo-ticker', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
