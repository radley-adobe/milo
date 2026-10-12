import { ACROBAT, LIVE, MEDIA, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/social-proof';
import variants from 'virtual:variants/c2/social-proof';
import { attr } from './authored.js';

const description = `
A customer quote beside an image. It's authored as two rows: the text and a background color, then the image.

- The text cell holds a blockquote: the quote, then the name and role of the person quoted, each in its own paragraph. The block wraps the blockquote in a \`figure\`, shows the quote at \`heading-3\` size and moves the other paragraphs into a \`figcaption\` at \`body-lg\` size, keeping only their text. Each line of the caption after the first shows in the subtle text color.
- A text cell with no blockquote shows its heading at \`heading-3\` size and the rest of the cell below the heading at \`body-lg\` size, with the last paragraph in the subtle text color
- A curly opening quote mark, such as “, at the start of the quote or heading hangs outside the text's edge
- The first row's second cell holds a CSS color, such as \`#F6F6F6\`, for the block's background. Without it, the block has no background.
- The second row holds the image. The block needs this row, even when its cell is empty.
- Below 768px, the image sits above the text, up to 400px high, and the text is up to 460px wide
- From 768px, the text and the image sit side by side, each taking half the block. The image covers its half and is at least 460px high. The quote or heading sits at the top of the text's half, and the caption or the rest of the text at the bottom.
- The text has 40px of padding from 768px, 64px from 1280px and 96px from 1920px
- The block's corners are rounded by 24px, or 32px from 768px, and the image's by 16px
- As the block scrolls into view, it starts scaled up to the width of the window, up to 2560px, and shrinks to its own size. The image zooms out with it and the text moves up into place. From 768px, the text keeps its size as the block shrinks. The block clips the stretched content at its own edges, including its side padding. Without CSS scroll-driven animations, or with reduced motion, nothing moves.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the block different content at each viewport. An empty cell keeps the content of the viewport below it. Classes in brackets after the name, such as \`mobile-viewport(fluid)\`, apply to the block at that viewport.
- \`container\` among the block's classes gives the block 24px of side padding below 768px and 8.333% of the width from 768px, with its content up to 1920px wide. With \`fluid\`, the block has no side padding and its content is up to 2560px wide. With \`fixed\`, the side padding is 24px at every width. The Acrobat pages give the block \`container\`, with \`fluid\` in a Mobile viewport row and \`fixed\` in a Tablet viewport row.
`;

// Authored markup for the block from a story's args, as the Acrobat pages author it: `container`
// among its classes, and a Mobile viewport row with `fluid` and a Tablet viewport row with
// `fixed`, each followed by the block's two rows. The tablet rows' empty cells keep the content of
// the mobile rows. Without `blockquote`, or with no text for one, the quote is a heading and the
// name and role are paragraphs. The image row stays when it's empty, because the block moves its
// cell into the first row. `showAttribution` is true unless set.
const authored = ({
  variants: classes = [], blockquote, quote, name, role, showAttribution = true, background, image, imageAlt,
}) => {
  const attribution = (showAttribution ? [name, role] : []).filter(Boolean);
  const quoted = [quote, ...attribution].filter(Boolean);
  const text = blockquote && quoted.length ? `
      <blockquote>
        ${quoted.map((line) => `<p>${line}</p>`).join('\n        ')}
      </blockquote>` : `
      ${quote ? `<h3>${quote}</h3>` : ''}
      ${attribution.map((line) => `<p>${line}</p>`).join('\n      ')}`;
  return `
<div class="${['social-proof', 'container', ...classes].join(' ')}">
  <div>
    <div>mobile-viewport(fluid)</div>
  </div>
  <div>
    <div>${text}
    </div>
    ${background ? `<div>${background}</div>` : ''}
  </div>
  <div>
    <div>${image ? `<picture><img src="${attr(image)}" alt="${attr(imageAlt)}"></picture>` : ''}</div>
  </div>
  <div>
    <div>tablet-viewport(fixed)</div>
  </div>
  <div>
    <div></div>
    <div></div>
  </div>
  <div>
    <div></div>
  </div>
</div>`.trim().replace(/^\s*\n/gm, '');
};

// A story that renders the block from its args. Show code gives the authored markup.
const blockStory = {
  render: (args) => renderBlock(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
};

export default {
  title: 'Blocks/Social Proof',
  parameters: { cssprops, liveExamples: [LIVE.acrobat, LIVE.acrobatStudio], docs: { description: { component: description } } },
  argTypes: {
    variants,
    blockquote: { control: 'boolean', description: 'Author the text as a blockquote, which shows as a quote with a caption. Off, the quote is an `h3` and the name and role are paragraphs.' },
    quote: { control: 'text', description: 'The quote. Leave empty for none: in a blockquote, the name then shows as the quote.' },
    name: { control: 'text', description: 'Name of the person quoted. Leave empty for none.' },
    role: { control: 'text', description: 'Role of the person quoted, below the name. Leave empty for none.' },
    showAttribution: { control: 'boolean', description: 'Show the name and role' },
    background: { control: 'text', description: 'CSS color of the block\'s background. Leave empty for no background.' },
    image: { control: 'text', description: 'Image URL. Leave empty for an empty image cell.' },
    imageAlt: { control: 'text', description: 'Image alt text. Leave empty when the image is decorative.' },
  },
};

// The Acrobat page's block.
export const Default = {
  ...blockStory,
  args: {
    variants: [],
    blockquote: true,
    quote: '“Acrobat has enabled me to streamline my workflows because I can finally keep all of my documents in one place.”',
    name: 'Katrina Owens',
    role: 'Personal Branding & PR Consultant',
    showAttribution: true,
    background: '#F6F6F6',
    image: `${MEDIA}/social-proof/katrina-owens.webp`,
    imageAlt: '',
  },
};

export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderPageBlock(ACROBAT, 'social-proof', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};

export const AcrobatStudio = {
  name: 'adobe.com: Acrobat Studio',
  render: () => renderPageBlock(`${ACROBAT}/acrobat-studio`, 'social-proof', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
