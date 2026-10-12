import { ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/faq';
import variants from 'virtual:variants/c2/faq';
import { sectionMetadata } from './authored.js';
import { ACROBAT_QUESTIONS, faq } from './sections/faq.js';

const description = `
A list of questions, each of which opens to show its answer. It's authored as one row per question, each with one cell: a heading for the question, then the answer.

- The heading is the question. It keeps the level it's authored with and shows at \`heading-5\` size. Only its text is kept: links, other markup and the heading's id are dropped.
- The rest of the cell is the answer, such as paragraphs and lists, at \`body-md\` size in the subtle text color. A paragraph or list after a paragraph sits 8px below it, and one after a list sits 16px below it, because lists keep the browser's 1em margins. From 768px, the answer is up to 548px wide.
- A row with no heading doesn't show
- Each question is a \`details\` element whose \`summary\` holds the question and a chevron at its end. The first question is open when the page loads. Clicking a question opens or closes its answer, and several answers can be open at once.
- An answer opens and closes over 400ms, and its chevron turns over. With reduced motion, the answer closes at once, but opening and the chevron still animate.
- Each question has 32px above it and 8px between it and its answer, or 24px when the answer starts with a list. A line 32px below the question or its open answer separates it from the next: black at 8% opacity, or white at 8% in a \`dark\` section.
- While the pointer is over the block, the closed questions other than the one under it fade to 60% opacity. While focus is in the block and the pointer isn't over it, the closed questions other than the focused one fade. Keyboard focus shows a 2px ring around the question.
- Each question moves up and fades in as it scrolls into view. With reduced motion, or in a browser without CSS scroll-driven animations, nothing moves.
- \`seo\` adds the questions and answers to the page's head as FAQPage structured data, with each answer as plain text
- A class on the block that starts with \`heading-\`, such as \`heading-6\`, sets the size of the questions. One that starts with \`body-\`, such as \`body-sm\`, sets the size of the answers.
- \`aria-expanded\` on each \`summary\` follows its question's state. Its \`daa-ll\` analytics label is the question's number and text, starting with \`open-\` while the question is closed and \`close-\` while it's open.
- The block takes the width of its section. On the Acrobat page, its section has \`container\`, which gives the section 24px of side padding below 768px and 8.333% of its width from 768px, with its content up to 1920px wide.
`;

// Authored markup for the block from a story's args, followed by section metadata when `style`
// sets the section's style.
const authored = (args, style) => [faq(args), sectionMetadata({ style })].filter(Boolean).join('\n');

// A story that renders the block from its args. Show code gives the authored markup.
const blockStory = (style) => ({
  render: (args) => renderBlock(authored(args, style), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args, style) } } },
});

export default {
  title: 'Blocks/FAQ',
  parameters: { cssprops, liveExamples: [LIVE.acrobat, LIVE.acrobatPlans], docs: { description: { component: description } } },
  argTypes: {
    variants,
    seo: { control: 'boolean', description: 'Add the questions and answers to the page\'s head as FAQPage structured data (`seo`)' },
    questionSize: {
      control: 'select',
      options: ['heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6'],
      description: 'Size of the questions. A size other than `heading-5` adds its class to the block.',
    },
    answerSize: {
      control: 'select',
      options: ['body-sm', 'body-md', 'body-lg'],
      description: 'Size of the answers. A size other than `body-md` adds its class to the block.',
    },
    items: {
      control: 'object',
      description: 'One row each, in order: a `question`, authored as an `h3`, and its `answer` as HTML, such as paragraphs and lists. A row with no `question` doesn\'t show. Leave `answer` empty to leave it out.',
    },
  },
};

// The Acrobat page's first five questions, in the width of a container section.
export const Default = {
  ...blockStory('container'),
  args: {
    variants: [],
    seo: true,
    questionSize: 'heading-5',
    answerSize: 'body-md',
    items: ACROBAT_QUESTIONS,
  },
};

export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderPageBlock(ACROBAT, 'faq', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};

export const CreativeCloudProProduct = {
  name: 'adobe.com: Creative Cloud Pro product',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'faq', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
