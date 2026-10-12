import { ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/faq';
import variants from 'virtual:variants/c2/faq';
import { sectionMetadata } from './authored.js';
import { ACROBAT_QUESTIONS, faq } from './sections/faq.js';

const description = `
A list of questions, each of which opens to show its answer. It's authored as one row per question, each with one cell: a heading for the question, then the answer.

- The question shows at \`heading-5\` size and the answer, such as paragraphs and lists, at \`body-md\` size
- The first question is open when the page loads. Clicking a question opens or closes its answer, and several answers can be open at once.
- While the pointer is over the block, the other closed questions fade
- Each question moves up and fades in as it scrolls into view. With reduced motion, nothing moves.
- A class on the block that starts with \`heading-\`, such as \`heading-6\`, sets the size of the questions. One that starts with \`body-\`, such as \`body-sm\`, sets the size of the answers.
- \`seo\` adds the questions and answers to the page's head as FAQPage structured data
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
      description: 'Size of the questions',
    },
    answerSize: {
      control: 'select',
      options: ['body-sm', 'body-md', 'body-lg'],
      description: 'Size of the answers',
    },
    items: {
      control: 'object',
      description: 'One row each, in order: a `question`, authored as an `h3`, and its `answer` as HTML',
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
  name: 'Redesign test: Creative Cloud Pro product',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'faq', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
