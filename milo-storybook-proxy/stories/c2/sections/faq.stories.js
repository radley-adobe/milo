import { ACROBAT, LIVE, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/faq';
import { section, sectionMetadata } from '../authored.js';
import { ACROBAT_QUESTIONS, faq } from './faq.js';

const description = `
A heading above a [FAQ](?path=/docs/blocks-faq--docs) block. The heading is a Rich Content block, and the section's metadata sets the width, spacing, corners and background.

- The Rich Content block holds the section's heading, authored as an \`h2\`, which shows at \`heading-2\` size
- \`container\` gives the section side padding, with its content up to a maximum width
- \`spacing-3xl-top\` adds padding above the heading, and \`spacing-xl-bottom\` adds padding below the questions
- \`rounded-corners-bottom\` rounds the section's bottom corners, and the next section moves up behind them
- \`background\` sets the section's background color
- Style values are separated by a comma and a space. A space inside a value becomes a hyphen, and capitals don't matter.
- The FAQ block has one row per question, each with one cell: a heading for the question, then the answer
- The question shows at \`heading-5\` size and the answer, such as paragraphs and lists, at \`body-md\` size
- The first question is open when the page loads. Clicking a question opens or closes its answer, and several answers can be open at once.
- While the pointer is over the block, the other closed questions fade
- Each question moves up and fades in as it scrolls into view. With reduced motion, nothing moves.
- A class on the FAQ block that starts with \`heading-\`, such as \`heading-6\`, sets the size of the questions. One that starts with \`body-\`, such as \`body-sm\`, sets the size of the answers.
- \`seo\` on the FAQ block adds the questions and answers to the page's head as FAQPage structured data
`;

// The section's authored markup from a story's args. The Acrobat page's Rich Content block also
// has `parallax-line-height`, which matches only C2's generic `[class*="parallax-"]` rule, whose
// defaults move nothing, so this leaves it out.
const authored = ({ heading, items, seo, style, background }) => section(
  heading ? `<div class="rich-content">
  <div>
    <div>
      <h2>${heading}</h2>
    </div>
  </div>
</div>` : '',
  faq({ items, seo }),
  sectionMetadata({ style, background }),
);

export default {
  title: 'Sections/FAQ',
  parameters: { cssprops, liveExamples: [LIVE.acrobat, LIVE.acrobatPlans], docs: { description: { component: description } } },
  argTypes: {
    heading: { control: 'text', description: 'The section\'s heading, authored as an `h2` in a Rich Content block. Leave empty for no Rich Content block.' },
    items: {
      control: 'object',
      description: 'One FAQ row each, in order: a `question`, authored as an `h3`, and its `answer` as HTML, such as paragraphs and lists. Leave `answer` empty to leave it out.',
    },
    seo: { control: 'boolean', description: 'Add the questions and answers to the page\'s head as FAQPage structured data (`seo`)' },
    style: { control: 'text', description: 'The section\'s style: classes separated by a comma and a space. Leave empty for none.' },
    background: { control: 'text', description: 'The section\'s background color. Leave empty for none.' },
  },
};

// The Acrobat page's FAQ section, with its first five questions.
export const Default = {
  render: (args) => renderSections(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
  args: {
    heading: 'Frequently asked questions',
    items: ACROBAT_QUESTIONS,
    seo: true,
    style: 'rounded-corners-bottom, spacing-3xl-top, spacing-xl-bottom, container',
    background: '#fff',
  },
};

// The Acrobat page's FAQ section, as published.
export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderPageSections(ACROBAT, 'faq', { foundation: 'c2' }),
  parameters: { controls: { disable: true } },
};
