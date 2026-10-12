import { ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, MEDIA, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/product-marquee-grid';
import variants from 'virtual:variants/c2/product-marquee-grid';
import { attr, icon, sectionMetadata } from './authored.js';

const description = `
A product page's hero: the product's icon and name, a subheading, and a card with the product's price and buttons. It's authored as one row with two cells: the product, then the card.

- The icon is a link to an SVG, alone in its paragraph. The card cell holds Merch at Scale (MAS) fields, each a link to a card's field in MAS Studio, and links. A bold link shows as a blue button and an italic link as an outline button.
- \`dark\` gives the block a dark background and light text
- \`transparent-bg\` makes the block's background translucent and blurs what's behind it, such as the section's background image
- \`cta-pill\` shows the card from 768px as a pill at the bottom right, with its text and buttons in one row
- \`special-promo\` gives the card the block's opposite colors from 768px: dark in a light block and light in a \`dark\` block
- Below 900px, the card sits below the subheading. From 900px, it sits at the bottom right.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the block different content at each viewport. An empty cell keeps the content of the viewport below it.
`;

// One MAS field in its own paragraph, or nothing when the field is empty.
const field = (name, value) => (value ? `<p><mas-field field="${name}">${value}</mas-field></p>` : '');

// Authored markup for the block from a story's args, followed by section metadata when
// `metadata` sets the section's style or background. `special-promo` is read only by the block's
// JavaScript, so the Variants control doesn't list it. The card cell is left out when it would
// be empty.
const authored = ({
  variants: classes = [], specialPromo, icon: iconUrl, showIcon = true, heading, subheading,
  planName, showPrice = true, price, commitment, description: copy, legal,
  primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref,
}, metadata = {}) => {
  const ctas = [
    primaryCtaLabel ? `<strong><a href="${attr(primaryCtaHref)}">${primaryCtaLabel}</a></strong>` : '',
    secondaryCtaLabel ? `<em><a href="${attr(secondaryCtaHref)}">${secondaryCtaLabel}</a></em>` : '',
  ].filter(Boolean).join(' ');
  const card = [
    field('subtitle', planName),
    showPrice ? field('prices', price) : '',
    showPrice && price && commitment ? `<p>${commitment}</p>` : '',
    field('description', copy),
    field('shortDescription', legal),
    ctas ? `<p>${ctas}</p>` : '',
  ].filter(Boolean);
  const block = `
<div class="${['product-marquee-grid', ...(specialPromo ? ['special-promo'] : []), ...classes].join(' ')}">
  <div>
    <div>
      ${showIcon && iconUrl ? `<p><a href="${attr(iconUrl)}">${iconUrl}</a></p>` : ''}
      ${heading ? `<h1>${heading}</h1>` : ''}
      ${subheading ? `<h5>${subheading}</h5>` : ''}
    </div>
    ${card.length ? `<div>\n      ${card.join('\n      ')}\n    </div>` : ''}
  </div>
</div>`.trim().replace(/^\s*\n/gm, '');
  return [block, sectionMetadata(metadata)].filter(Boolean).join('\n');
};

// A story that renders the block from its args in a section with `metadata`. Show code gives the
// authored markup.
const blockStory = (metadata) => ({
  render: (args) => renderBlock(authored(args, metadata), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args, metadata) } } },
});

// The section style of the block on the Acrobat page.
const STYLE = 'rounded-corners-bottom';

export default {
  title: 'Blocks/Product Marquee Grid',
  parameters: { cssprops, liveExamples: [LIVE.acrobat], docs: { description: { component: description } } },
  argTypes: {
    variants,
    specialPromo: { control: 'boolean', description: 'Give the card the opposite colors of the block from 768px (`special-promo`)' },
    icon: { control: 'text', description: 'URL of the SVG icon. Leave empty for no icon.' },
    showIcon: { control: 'boolean', description: 'Show the icon' },
    heading: { control: 'text', description: 'Product name, authored as an `h1`' },
    subheading: { control: 'text', description: 'Subheading, authored as an `h5`. Leave empty for none.' },
    planName: { control: 'text', description: 'The card\'s first line, a `subtitle` field. Leave empty for none.' },
    showPrice: { control: 'boolean', description: 'Show the price and commitment' },
    price: { control: 'text', description: 'Price, a `prices` field. Leave empty for none.' },
    commitment: { control: 'text', description: 'Commitment, a paragraph after the price. Leave empty for none.' },
    description: { control: 'text', description: 'Description, a `description` field, which can hold HTML. Leave empty for none.' },
    legal: { control: 'text', description: 'Legal text, a `shortDescription` field. Leave empty for none.' },
    primaryCtaLabel: { control: 'text', description: 'Text of the blue button, a bold link. Leave empty for none.' },
    primaryCtaHref: { control: 'text', description: 'URL of the blue button' },
    secondaryCtaLabel: { control: 'text', description: 'Text of the outline button, an italic link. Leave empty for none.' },
    secondaryCtaHref: { control: 'text', description: 'URL of the outline button' },
  },
};

// The block on the Acrobat page. The page's fields and Free trial button load from MAS, so the
// story gives their published text and links the button to the Acrobat free trial page.
export const Default = {
  ...blockStory({ style: STYLE }),
  args: {
    variants: [],
    specialPromo: false,
    icon: icon('acrobat-pro'),
    showIcon: true,
    heading: 'Acrobat',
    subheading: 'Edit, sign, and understand documents faster with conversational AI. Share and collaborate with ease. Work smarter with Acrobat.',
    planName: 'Adobe Acrobat Pro + AI Assistant Plus',
    showPrice: true,
    price: 'US$24.98/mo',
    commitment: 'Annual, billed monthly',
    description: '<strong>US$19.99/mo for Acrobat Pro + US$4.99/mo for AI Assistant Plus.</strong> Monthly plans also available.',
    legal: 'Fee applies up to half your remaining annual commitment if you cancel 14 days after your free trial ends.',
    primaryCtaLabel: 'Free trial',
    primaryCtaHref: 'https://www.adobe.com/acrobat/free-trial-download.html',
    secondaryCtaLabel: 'See all plans',
    secondaryCtaHref: 'https://www.adobe.com/acrobat/plans.html',
  },
};

// The same block with its price and Free trial button in a pill.
export const CtaPill = {
  ...blockStory({ style: STYLE }),
  name: 'CTA Pill',
  args: {
    ...Default.args,
    variants: ['cta-pill'],
    planName: '',
    description: '',
    legal: '',
    secondaryCtaLabel: '',
  },
};

// The block in the Creative Cloud Pro product fragment, with `dark` added. Its fields and both
// buttons load from MAS too, so the story gives their published text and links, with Free trial
// linked to the Photoshop free trial page.
export const Dark = {
  ...blockStory({ style: STYLE }),
  args: {
    variants: ['dark'],
    specialPromo: false,
    icon: icon('photoshop'),
    showIcon: true,
    heading: 'Photoshop',
    subheading: 'Astonishingly powerful and precise, Photoshop is the industry choice for image transformations, graphic design, and visual art.',
    planName: '',
    showPrice: true,
    price: 'US$22.99/mo',
    commitment: 'Annual, billed monthly',
    description: 'Build your body of work with the tools pros rely on. Create, edit, and design with advanced workflows, precise selections, and AI-powered speed.',
    legal: '',
    primaryCtaLabel: 'Free trial',
    primaryCtaHref: 'https://www.adobe.com/products/photoshop/free-trial-download.html',
    secondaryCtaLabel: 'See plans',
    secondaryCtaHref: 'https://www.adobe.com/creativecloud/pro/plans.html',
  },
};

// The Photoshop block with `transparent-bg`, over the image below it in its fragment, set as the
// section's background so the blur shows.
export const TransparentBackground = {
  ...blockStory({
    style: STYLE,
    background: `<picture><img src="${attr(`${MEDIA}/product-marquee-grid/photoshop-collage.webp`)}" alt=""></picture>`,
  }),
  name: 'Transparent Background',
  args: { ...Dark.args, variants: ['transparent-bg'] },
};

// The Acrobat block with a dark card.
export const SpecialPromo = {
  ...blockStory({ style: STYLE }),
  name: 'Special Promo',
  args: { ...Default.args, specialPromo: true },
};

// The live stories render published content, so they have only the Variants control. Their MAS
// fields load from www.adobe.com, which blocks requests from Storybook, so each field shows a load
// error.
export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderPageBlock(ACROBAT, 'product-marquee-grid', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};

export const CreativeCloudProProduct = {
  name: 'Redesign test: Creative Cloud Pro product',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'product-marquee-grid', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
