import { HOMEPAGE_FRAGMENTS, LIVE, renderBlock, renderPage } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/news';
import variants from 'virtual:variants/c2/news';
import { attr, icon, sectionMetadata } from './authored.js';

const description = `
A heading over a row of news items, each with a heading, body copy and a link. It's authored as one row for the block's heading, then one row per item, each with one cell.

- The first row holds an optional icon and a heading or paragraph, which shows as an eyebrow in the body font. Anything else in the cell doesn't show. Without a heading or paragraph, a block with items fails to load.
- An icon is a link to an SVG, alone in its paragraph, or an image. It shows 24px square, 16px before the heading.
- Each item's cell holds a heading, body copy and a link. The first heading or paragraph in the cell is the item's headline. The heading shows at \`heading-5\` size.
- Body copy shows in the subtle text color and is cut to three lines
- A link alone in its paragraph shows as a label with an arrow, at the bottom of its item, so the links in a row line up
- \`quiet\` removes the underline from each item's link alone in its paragraph
- From 768px, the heading and each item have 24px of side padding, with 24px between the heading and the items. Two, three, four or six items sit side by side in that many columns, 8px apart.
- Any other number of items stacks in one column at every width, with no space between them
- From 768px, the items move up into place as the block scrolls into view, each starting lower than the one before it. With CSS scroll-driven animations, only two, three, four or six items move, and three start 72px, 156px and 264px below their place. With reduced motion, nothing moves.
- Below 768px, the block has 16px of side padding, with 40px between the heading and the items. Two, three, four or six items stack in one column, 40px apart.
- A block with only its heading row shows the row as authored
- The block adds nothing to its section. Its stories set the section's style to \`container\`, as the homepage does, which gives the section 24px of side padding below 768px and 8.333% of its width from 768px, with its content up to 1920px wide.
`;

// Authored markup for the block from a story's args: the heading row, then one row per item.
// `showIcon`, `showBody` and `showCta` are true unless set.
const news = ({
  variants: classes = [], quiet, icon: iconUrl, showIcon = true, heading, items = [], showBody = true, showCta = true,
}) => `
<div class="${['news', ...(quiet ? ['quiet'] : []), ...classes].join(' ')}">
  <div>
    <div>
      ${showIcon && iconUrl ? `<p><a href="${attr(iconUrl)}">${iconUrl}</a></p>` : ''}
      ${heading ? `<h2>${heading}</h2>` : ''}
    </div>
  </div>
${items.map((item) => `  <div>
    <div>
      ${item.heading ? `<h3>${item.heading}</h3>` : ''}
      ${showBody && item.body ? `<p>${item.body}</p>` : ''}
      ${showCta && item.ctaLabel ? `<p><a href="${attr(item.ctaHref)}">${item.ctaLabel}</a></p>` : ''}
    </div>
  </div>`).join('\n')}
</div>`.trim();

// Authored markup for the block from a story's args, followed by section metadata when `style`
// sets the section's style.
const authored = (args, style) => [news(args), sectionMetadata({ style })].filter(Boolean).join('\n');

// A story that renders the block from its args. Show code gives the authored markup.
const blockStory = (style) => ({
  render: (args) => renderBlock(authored(args, style), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args, style) } } },
});

export default {
  title: 'Blocks/News',
  parameters: { cssprops, liveExamples: [LIVE.home], docs: { description: { component: description } } },
  argTypes: {
    variants,
    quiet: { control: 'boolean', description: 'Remove the underline from each item\'s link (`quiet`)' },
    icon: { control: 'text', description: 'URL of the SVG icon before the heading. Leave empty for no icon.' },
    showIcon: { control: 'boolean', description: 'Show the icon' },
    heading: { control: 'text', description: 'The block\'s heading, authored as an `h2`. Leave empty and a block with items fails to load.' },
    items: {
      control: 'object',
      description: 'One row each, in order: a `heading`, `body` copy and a link from `ctaLabel` and `ctaHref`. Text after ` | ` in `ctaLabel` becomes the link\'s accessible name. Leave `heading`, `body` or `ctaLabel` empty to leave it out. The first heading or paragraph is the item\'s headline, so without a heading the body copy, or else the link, becomes the headline and shows as plain text or a plain link. Leave `ctaHref` empty and the link points at the current page. With no items, the block shows its heading row as authored.',
    },
    showBody: { control: 'boolean', description: 'Show each item\'s body copy' },
    showCta: { control: 'boolean', description: 'Show each item\'s link' },
  },
};

// The homepage's news, in the width of a container section. The homepage's block also has
// `quiet`, which the Quiet story shows.
export const Default = {
  ...blockStory('container'),
  args: {
    variants: [],
    quiet: false,
    icon: icon('b-app-experiencecloud'),
    showIcon: true,
    heading: 'Adobe News',
    items: [{
      heading: 'Adobe brings docs into focus like never before.',
      body: 'New features in Adobe Acrobat give customers the power to turn documents into visual reports and presentations that are easier to understand.',
      ctaLabel: 'Read story | Read story about Adobe brings docs into focus like never before.',
      ctaHref: 'https://blog.adobe.com/en/publish/2026/09/09/show-up-sharper-faster-with-new-acrobat-ai',
    }, {
      heading: 'Introducing Adobe Brand Visibility.',
      body: 'Get to know Adobe\'s new unified GEO platform for enterprise brands.',
      ctaLabel: 'Read story | Read story about Introducing Adobe Brand Visibility.',
      ctaHref: 'https://business.adobe.com/blog/introducing-adobe-brand-visibility',
    }, {
      heading: 'Explore new ways to share information with PDF Spaces.',
      body: 'Today in Acrobat, we\'re introducing a new way to share information, one designed to engage, inform and move the people who matter most.',
      ctaLabel: 'Read story | Read story about Explore new ways to share information with PDF Spaces.',
      ctaHref: 'https://blog.adobe.com/en/publish/2026/05/06/stop-sending-files-start-sharing-experiences-with-pdf-sapces-acrobat',
    }],
    showBody: true,
    showCta: true,
  },
};

// The same block with `quiet`, as the homepage has it.
export const Quiet = {
  ...blockStory('container'),
  args: { ...Default.args, quiet: true },
};

// The homepage fragment, as published.
export const HomepageNews = {
  name: 'adobe.com: Homepage news',
  render: () => renderPage(`${HOMEPAGE_FRAGMENTS}/news/news`, { foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
