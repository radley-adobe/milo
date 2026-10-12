import { ACROBAT, LIVE, MEDIA, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/social-proof';
import variants from 'virtual:variants/c2/social-proof';
import { attr } from './authored.js';

const description = `
A customer quote beside an image. It's authored as two rows: the text and a background color, then the image.

- The text cell holds a blockquote: the quote, at \`heading-3\` size, then the quoted person's name and role, at \`body-lg\` size, each in its own paragraph
- Without a blockquote, the text cell's heading shows at \`heading-3\` size and the rest below it at \`body-lg\` size
- The background color is a CSS color shown behind the image and text
- \`container\` among the block's classes adds side padding and a maximum content width
- \`fluid\` with \`container\` removes the padding and raises the maximum width
- \`fixed\` with \`container\` keeps the padding from 768px the same as below it
- Below 768px, the image sits above the text, and from 768px beside it on the end side
- As the block scrolls into view, it shrinks from the window's width to its own size while the image zooms out and the text moves up. With reduced motion, nothing moves.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the block different content at each viewport, and an empty cell keeps the content of the viewport below it
`;

// Authored markup for the block from a story's args, as the Acrobat pages author it: `container`
// among its classes, and a Mobile viewport row with `fluid` and a Tablet viewport row with
// `fixed`, each followed by the block's two rows. The tablet rows' empty text and image cells keep
// the content of the mobile rows. Without `blockquote`, or with no text for one, the quote is a
// heading and the name and role are paragraphs. The image row stays when it's empty, because the
// block moves its cell into the first row. `showAttribution` is true unless set.
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
    ${background ? `<div>${background}</div>` : ''}
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
    blockquote: { control: 'boolean', description: 'Author the text as a blockquote instead of an `h3` and paragraphs' },
    quote: { control: 'text', description: 'The quote. Leave empty for none.' },
    name: { control: 'text', description: 'Name of the person quoted. Leave empty for none.' },
    role: { control: 'text', description: 'Role of the person quoted. Leave empty for none.' },
    showAttribution: { control: 'boolean', description: 'Show the name and role' },
    background: { control: 'text', description: 'CSS color of the background behind the image and text. Leave empty for no background.' },
    image: { control: 'text', description: 'Image URL' },
    imageAlt: { control: 'text', description: 'Image alt text. Leave empty when the image is decorative.' },
  },
};

// The Acrobat page's block, with the subtle background color token in place of the page's
// #F6F6F6, so the background follows the Theme menu.
export const Default = {
  ...blockStory,
  args: {
    variants: [],
    blockquote: true,
    quote: '“Acrobat has enabled me to streamline my workflows because I can finally keep all of my documents in one place.”',
    name: 'Katrina Owens',
    role: 'Personal Branding & PR Consultant',
    showAttribution: true,
    background: 'var(--s2a-color-background-subtle)',
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
