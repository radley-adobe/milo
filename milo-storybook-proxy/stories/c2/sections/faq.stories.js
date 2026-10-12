import { ACROBAT, LIVE, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/faq';
import { section, sectionMetadata } from '../authored.js';
import { ACROBAT_QUESTIONS, faq } from './faq.js';

const description = `
A heading in a Rich Content block above a [FAQ](?path=/docs/blocks-faq--docs) block, with section metadata that sets the width, spacing, corners and background.

- The heading is authored as an \`h2\` and shows at \`heading-2\` size
- The FAQ block has one row per question, each with one cell: a heading for the question, at \`heading-5\` size, then the answer, at \`body-md\` size
- \`container\` gives the section side padding and a maximum content width
- \`spacing-3xl-top\` adds padding above the heading
- \`spacing-xl-bottom\` adds padding below the questions
- \`rounded-corners-bottom\` rounds the section's bottom corners, and the next section moves up behind them
- \`background\` sets the section's background color
- A class on the FAQ block that starts with \`heading-\`, such as \`heading-6\`, sets the size of the questions, and one that starts with \`body-\`, such as \`body-sm\`, sets the size of the answers
- \`seo\` on the FAQ block adds the questions and answers to the page's head as FAQPage structured data
- The first question starts open, clicking a question opens or closes its answer, and several answers can be open at once
- While the pointer is over the FAQ block, the other closed questions fade
- Questions move up and fade in as they scroll into view, and nothing moves with reduced motion
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
    heading: { control: 'text', description: 'The section\'s heading, authored as an `h2` in a Rich Content block. Leave empty for none.' },
    items: {
      control: 'object',
      description: 'One FAQ row each, in order: a `question`, authored as an `h3`, and its `answer` as HTML',
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
