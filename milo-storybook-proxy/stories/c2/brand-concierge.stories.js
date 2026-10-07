import { CC_PRO_TEST_FRAGMENTS, MEDIA, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/brand-concierge';
import variants from 'virtual:variants/c2/brand-concierge';

const description = `
A prompt for Adobe's AI assistant: a heading, suggested prompts and an input, each of which opens the Brand Concierge chat. It's authored as five rows: background, heading, prompts, input and legal text.

- The background row holds a CSS color or gradient, or an image that covers the block
- The heading row holds a heading and an optional paragraph
- The prompts row has one cell per suggested prompt, which shows as a button that opens the chat with its text. From 768px, the prompts sit side by side in one row, and a prompt's image shows on its card.
- The input row's text is the input's placeholder. Submitting the input opens the chat with what was typed.
- The legal row holds text and links, shown last
- \`input-first\` puts the input above the prompts
- \`pill-cards\` shows the prompts as pills from 768px, wrapping onto as many rows as they need
- \`hero\` puts the input above the prompts and shows the prompts as pills from 768px. Over a background image, the block fades to white at the bottom.
- \`marquee\` sets the heading, input, prompts and legal text in a left-aligned column over the background image. A first heading before the main one shows as an eyebrow. The background row holds one image, or three: below 600px, from 600px and from 1200px.
- In a marquee, \`light\` or \`dark\` adds a white or black gradient behind the text, and \`dark\` makes the text light. A first row holding a \`linear-gradient()\` replaces the gradient, and \`no-gradient\` removes it.
- \`c2-dark\` gives light text, dark prompts and a dark input with a gradient border, for a dark section
- \`floating-button\` adds a button labeled with the input's placeholder, fixed to the bottom of the window, which opens the chat. \`floating-button-only\` shows only the button and makes the page's \`main\` background dark.
- \`floating-input\` adds a bar fixed to the bottom of the window with the input and, from 768px, the prompts that fit beside it. \`floating-input-only\` shows only the bar, and \`floating-input-dark\` makes it dark.
- A floating button or bar stops at the end of the page's \`main\` element. \`floating-anchor-hide\` hides it there instead, \`floating-delay-<px>\` shows it once the page scrolls that far, and \`floating-anchor-delay-<px>\` hides it that far before the end. With \`hero\`, it shows once the page scrolls past the block.
- The chat opens in a modal, or in a panel at the side of the page when the page has Brand Concierge Global
- When the page's privacy settings don't allow Adobe's C0002 cookie group, the block is hidden
`;

const image = (name) => `${MEDIA}/brand-concierge/${name}.webp`;

// An arg as an attribute value.
const attr = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;');

const picture = (src) => `<picture><img src="${attr(src)}" alt=""></picture>`;

// Authored markup for the block from a story's args. Every row stays when it's empty, because the
// block reads its rows by position. The block cuts a background image's URL at its `?`, which
// every image on a published page has, so the template adds one.
const authored = ({
  variants: classes = [], inputFirst, pillCards, background, backgroundImages = [], eyebrow, heading,
  subtitle, prompts = [], placeholder, legal,
}) => `
<div class="${['brand-concierge', ...(inputFirst ? ['input-first'] : []), ...(pillCards ? ['pill-cards'] : []), ...classes].join(' ')}">
  <div>
    ${background || !backgroundImages.length ? `<div>${background ?? ''}</div>` : backgroundImages.map((src) => `<div>${picture(`${src}?optimize=medium`)}</div>`).join('\n    ')}
  </div>
  <div>
    <div>
      ${eyebrow ? `<h3>${eyebrow}</h3>` : ''}
      ${heading ? `<h2>${heading}</h2>` : ''}
      ${subtitle ? `<p>${subtitle}</p>` : ''}
    </div>
  </div>
  <div>
    ${prompts.map(({ text, image: src }) => `<div>${src ? `<p>${picture(src)}</p><p>${text}</p>` : text}</div>`).join('\n    ')}
  </div>
  <div>
    <div>${placeholder ?? ''}</div>
  </div>
  <div>
    <div>${legal ?? ''}</div>
  </div>
</div>`.trim();

// A story that renders the block from its args. Show code gives the authored markup.
const blockStory = {
  render: (args) => renderBlock(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
};

const gradient = 'linear-gradient(122.87deg, #E1E9FF 20.72%, #EFE3FA 34.96%, #F5DFF8 42.08%, #FCDCF5 49.2%, #FFDEC3 91.6%)';
const terms = 'https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html';

export default {
  title: 'Blocks/Brand Concierge',
  parameters: { cssprops, docs: { description: { component: description } } },
  argTypes: {
    variants,
    inputFirst: { control: 'boolean', description: 'Put the input above the prompts (`input-first`)' },
    pillCards: { control: 'boolean', description: 'Show the prompts as pills from 768px (`pill-cards`)' },
    background: { control: 'text', description: 'CSS color or gradient for the background. Leave empty to use the background images.' },
    backgroundImages: { control: 'object', description: 'Background image URLs, used when `background` is empty. The block shows the first. `marquee` shows one at every width, or three below 600px, from 600px and from 1200px. Leave empty for no background.' },
    eyebrow: { control: 'text', description: '`marquee` only: eyebrow above the heading, authored as an `h3`. Other variants show it in place of the heading. Leave empty for no eyebrow.' },
    heading: { control: 'text', description: 'Heading, authored as an `h2`' },
    subtitle: { control: 'text', description: 'Paragraph below the heading. Leave empty for none.' },
    prompts: { control: 'object', description: 'Suggested prompts, each a `text` and an optional `image` URL that shows on its card from 768px. Leave empty for no prompts.' },
    placeholder: { control: 'text', description: 'The input\'s placeholder, which is also the label of a floating button' },
    legal: { control: 'text', description: 'Legal text, which can hold HTML links. Leave empty for no text.' },
  },
};

// The block on its Nala page.
export const Default = {
  ...blockStory,
  args: {
    variants: [],
    inputFirst: false,
    pillCards: false,
    background: gradient,
    backgroundImages: [],
    eyebrow: '',
    heading: 'Explore what you can do with Adobe apps.',
    subtitle: 'Choose an option or tell us what interests you and we’ll point you in the right direction.',
    prompts: [
      { text: 'I’d like to explore templates to see what I can create.', image: image('prompt-templates') },
      { text: 'I want to touch up and enhance my photos.', image: image('prompt-photos') },
      { text: 'I’d like to edit PDFs and make them interactive.', image: image('prompt-pdfs') },
      { text: 'I want to turn my clips into polished videos.', image: image('prompt-videos') },
    ],
    placeholder: 'Tell us about a project or idea that interests you',
    legal: `By using this AI-powered automated chatbot, you consent that any personal information you provide in the chat may be collected, used, analyzed, disclosed, and retained by Adobe and its service providers, in accordance with the Adobe <a href="https://www.adobe.com/privacy/policy.html">Privacy Policy</a>. Please do not enter any sensitive personal information (e.g., financial or health data). AI responses may be inaccurate, and any offers the chatbot may provide are non-binding. Check answers and sources. <a href="${terms}">Terms</a>.`,
  },
};

// The hero block on its Nala page.
export const Hero = {
  ...blockStory,
  args: {
    variants: ['hero'],
    inputFirst: false,
    pillCards: false,
    background: '',
    backgroundImages: [image('hero-background')],
    eyebrow: '',
    heading: 'Ask Adobe anything',
    subtitle: '',
    prompts: [
      { text: 'How do I quickly resize content for social platforms?' },
      { text: 'How can I quickly touch up all my photos?' },
      { text: 'How can I edit my video transcript?' },
      { text: 'How do I summarize my PDF using AI?' },
    ],
    placeholder: 'Ask anything',
    legal: `By using this AI chatbot (beta), you agree Adobe may use your info per its Privacy Policy. Don’t share sensitive data. AI replies may be inaccurate; please verify answers. Offers are not binding. <a href="${terms}">Terms</a>`,
  },
};

// The light marquee on its Nala page. The page lists its images widest first, and the block reads
// them as below 600px, from 600px and from 1200px, so the story lists them in that order.
export const Marquee = {
  ...blockStory,
  args: {
    variants: ['marquee', 'light'],
    inputFirst: false,
    pillCards: false,
    background: '',
    backgroundImages: [image('marquee-mobile'), image('marquee-tablet'), image('marquee-desktop')],
    eyebrow: 'Adobe for business',
    heading: 'Grow your business with Adobe.',
    subtitle: 'Unify data, content, and workflows with Adobe AI to move faster, personalize at scale, and prove impact across your business.',
    prompts: [
      { text: 'What creative tools does Adobe have for business?' },
      { text: 'How can I unlock my content supply chain?' },
      { text: 'What are the latest PDF solutions?' },
    ],
    placeholder: 'What do you want help with?',
    legal: Hero.args.legal,
  },
};

// The block on the Nala 404 page, with its input first and pill prompts.
export const InputFirst = {
  ...blockStory,
  name: 'Input First',
  args: {
    variants: [],
    inputFirst: true,
    pillCards: true,
    background: gradient,
    backgroundImages: [],
    eyebrow: '',
    heading: 'Sorry, we couldn\'t find that page.',
    subtitle: '',
    prompts: Hero.args.prompts,
    placeholder: 'Tell us what you\'d like to create',
    legal: `Use of this beta AI chatbot is subject to Adobe’s <a href="https://www.adobe.com/privacy.html">Privacy Policy</a>. Don’t share sensitive data. AI responses are not your Content, may be inaccurate and any offers provided are non-binding. <a href="${terms}">Generative AI Terms</a>`,
  },
};

// The floating button alone, at the bottom of the frame. Its Nala page has the default block's
// content. The chat it opens shows the heading and prompts.
export const FloatingButton = {
  ...blockStory,
  name: 'Floating Button',
  args: { ...Default.args, variants: ['floating-button-only'] },
};

// The floating bar alone, at the bottom of the frame. Its Nala page also has
// `floating-delay-100`, which hides the bar until the page scrolls, so the story leaves it out.
export const FloatingInput = {
  ...blockStory,
  name: 'Floating Input',
  args: {
    variants: ['floating-input-only'],
    inputFirst: true,
    pillCards: true,
    background: gradient,
    backgroundImages: [],
    eyebrow: '',
    heading: 'Find the right app to bring your ideas to life.',
    subtitle: '',
    prompts: [
      { text: 'Which apps can help me combine and retouch my photos?' },
      { text: 'How can I generate and edit videos for social?' },
      { text: 'How can I create and edit PDFs?' },
      { text: 'What are Adobe\'s solutions for businesses?' },
    ],
    placeholder: 'Ask a question',
    legal: `Use of this beta AI chatbot is subject to Adobe’s <a href="https://www.adobe.com/privacy/policy.html">Privacy Policy</a>. Don’t share sensitive data. AI responses are not your Content, may be inaccurate and any offers provided are non-binding. <a href="${terms}">Generative AI Terms</a>.`,
  },
};

// The only example of `c2-dark`, on a black background. It renders the live fragment, so it has
// only the Variants control.
export const CreativeCloudProHub = {
  name: 'adobe.com: Creative Cloud Pro hub',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-hub`, 'brand-concierge', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
