import { ACROBAT, LIVE, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/faq';
import { section, sectionMetadata } from '../authored.js';
import { ACROBAT_QUESTIONS, faq } from './faq.js';

const description = `
A heading above a [FAQ](?path=/docs/blocks-faq--docs) block. The heading is a Rich Content block, and the section's metadata sets the width, spacing, corners and background.

- The Rich Content block holds the section's heading, authored as an \`h2\`, which shows at \`heading-2\` size
- \`container\` gives the section 24px of side padding below 768px and 8.333% of its width from 768px, with its content up to 1920px wide
- \`spacing-3xl-top\` adds padding above the heading: 40px, 64px from 1024px and 128px from 1280px
- \`spacing-xl-bottom\` adds padding below the questions: 40px, 80px from 1024px and 128px from 1280px
- \`rounded-corners-bottom\` rounds the section's bottom corners, 22px or 32px from 1280px, and the next section moves up behind them by the same amount
- \`background\` sets the section's background color. Storybook shows a white background in the theme's default background color, so it follows the Theme menu.
- Style values are separated by a comma and a space. A space inside a value becomes a hyphen, and capitals don't matter.
- The FAQ block has one row per question, each with one cell: a heading for the question, then the answer. The question shows at \`heading-5\` size and the answer at \`body-md\` size in the subtle text color. A paragraph or list after a paragraph sits 8px below it, and one after a list sits 16px below it, because lists keep the browser's 1em margins. From 768px, the answer is up to 548px wide.
- The question keeps the heading level it's authored with. Only its text is kept: links, other markup and the heading's id are dropped.
- A row with no heading doesn't show
- Each question is a \`details\` element whose \`summary\` holds the question and a chevron at its end. The first question is open when the page loads. Clicking a question opens or closes its answer, and several answers can be open at once.
- An answer opens and closes over 400ms, and its chevron turns over. With reduced motion, the answer closes at once, but opening and the chevron still animate.
- Each question has 32px above it, which also separates the first one from the heading, and 8px between it and its answer, or 24px when the answer starts with a list. A line 32px below each question or its open answer separates it from the next: black at 8% opacity, or white at 8% in a \`dark\` section.
- While the pointer is over the block, the closed questions other than the one under it fade to 60% opacity. While focus is in the block and the pointer isn't over it, the closed questions other than the focused one fade. Keyboard focus shows a 2px ring around the question.
- Each question moves up and fades in as it scrolls into view. With reduced motion, or in a browser without CSS scroll-driven animations, nothing moves.
- \`seo\` on the FAQ block adds the questions and answers to the page's head as FAQPage structured data, with each answer as plain text
- A class on the FAQ block that starts with \`heading-\`, such as \`heading-6\`, sets the size of the questions. One that starts with \`body-\`, such as \`body-sm\`, sets the size of the answers.
- \`aria-expanded\` on each \`summary\` in the FAQ block follows its question's state. Its \`daa-ll\` analytics label is the question's number and text, starting with \`open-\` while the question is closed and \`close-\` while it's open.
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
      description: 'One FAQ row each, in order: a `question`, authored as an `h3`, and its `answer` as HTML, such as paragraphs and lists. A row with no `question` doesn\'t show. Leave `answer` empty to leave it out.',
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
