import { HOMEPAGE_FRAGMENTS, LIVE, MEDIA, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/elastic-carousel';
import variants from 'virtual:variants/c2/elastic-carousel';
import { attr, icon } from './authored.js';

const description = `
A row of linked video slides that widen on hover. It's authored as one row per slide, with two cells: the text, then the video.

- The text cell holds, in order, a paragraph with an icon, a paragraph with a label, a heading, a paragraph of body copy and a paragraph with a link. The block reads them by position.
- An icon is a link to an SVG. It shows in the slide's header, beside the label, which is cut to one line.
- Below the video, the heading shows at eyebrow size, cut to one line, and the body copy cut to two lines
- The whole slide links to the link's URL
- The video cell holds an image whose alt text is the URL of an MP4 video, a \`|\` and a description. Milo turns it into a muted video with the image as its poster, and the block crops the video to the slide's width. The cell can hold an image with plain alt text instead, which the block doesn't crop.
- The block's CSS is written for five slides
- From 768px, the slides sit side by side in a row centered on the window, and the block clips the row at its sides
- Between 768px and 1700px, hovering or focusing one of the first three slides moves the row to the block's left edge, and hovering or focusing the fifth moves it to the window's right edge
- From 768px, hovering or focusing a slide widens it, turns it dark with light text, shows an arrow and plays its video. Moving the pointer off the slide rewinds its video.
- While the mouse wheel scrolls the page, the block adds \`disable-hover\` to itself, which from 768px stops the slides responding to hover
- As the block scrolls into view from 768px, the row slides in from the right and fades in, and the gaps between the slides close
- Below 768px, the slides stack in a column, dark with light text and an arrow. Each sticks near the top of the window as the page scrolls and the next one covers it, while the ones beneath narrow and fade. A slide's video plays when the slide is in view and rewinds when the next slide covers it.
- The scroll animations run with reduced motion too, unless the block or an element around it has a \`parallax-\` class
- In a right-to-left page, the row keeps the slides' left-to-right order, the column below 768px shows them last first, the arrows point left and the hover shift is mirrored
`;

// Authored markup for one slide. Every element of the text cell stays when it's empty, because
// the block reads them by position. The video's poster needs a WebP source for each width, as a
// published page gives it. Milo makes a video only of an image whose alt text has a `|` after
// the video's URL. `name` goes after the link's URL in its text.
const slide = ({ icon: iconUrl, iconAlt, label, heading, body, href, poster, video, videoAlt }, name) => `
  <div>
    <div>
      <p>${iconUrl ? `<a href="${attr(iconUrl)}">${iconUrl}${iconAlt ? ` | ${iconAlt}` : ''}</a>` : ''}</p>
      <p>${label ?? ''}</p>
      <h3>${heading ?? ''}</h3>
      <p>${body ?? ''}</p>
      <p>${href ? `<a href="${attr(href)}">${href}${name ? ` | ${name}` : ''}</a>` : ''}</p>
    </div>
    <div>
      <picture>${poster ? `
        <source type="image/webp" srcset="${attr(poster)}" media="(min-width: 600px)">
        <source type="image/webp" srcset="${attr(poster)}">` : ''}
        <img${poster ? ` src="${attr(poster)}"` : ''} alt="${attr(video ? `${video} | ${videoAlt ?? ''}` : videoAlt)}">
      </picture>
    </div>
  </div>`;

// Authored markup for the block from a story's args. Only the first slide's link names the
// carousel.
const authored = ({ variants: classes = [], name, slides = [] }) => `
<div class="${['elastic-carousel', ...classes].join(' ')}">${slides.map((s, i) => slide(s, i === 0 ? name : '')).join('')}
</div>`.trim();

// A story that renders the block from its args. Show code gives the authored markup.
const blockStory = {
  render: (args) => renderBlock(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
};

// A video on the homepage's site, and its poster in media/elastic-carousel/.
const video = (file) => `https://main--upp--adobecom.aem.live/homepage/assets/video/sr/${file}.mp4`;
const poster = (name) => `${MEDIA}/elastic-carousel/${name}.webp`;

export default {
  title: 'Blocks/Elastic Carousel',
  parameters: { cssprops, layout: 'fullscreen', liveExamples: [LIVE.home], docs: { description: { component: description } } },
  argTypes: {
    variants,
    name: { control: 'text', description: 'The carousel\'s name, after a `|` in the first slide\'s link text. Leave empty for `Adobe slides`.' },
    slides: {
      control: 'object',
      description: 'One row each, in order: an `icon` URL with its `iconAlt`, a `label`, `heading` and `body`, the URL the slide links to in `href`, a `poster` image URL, and the `video` URL with its description in `videoAlt`. Leave `video` empty to show the poster as an image, with `videoAlt` as its alt text.',
    },
  },
};

// The homepage's five slides.
export const Default = {
  ...blockStory,
  args: {
    variants: [],
    name: 'Adobe products',
    slides: [{
      icon: icon('creative-cloud'),
      iconAlt: 'Adobe Creative Cloud',
      label: 'Creativity and design',
      heading: 'Create with the top tools.',
      body: 'Do it all with industry-leading apps for design, photo, video, and creative AI.',
      href: 'https://www.adobe.com/creativecloud.html',
      poster: poster('photoshop-select-subject'),
      video: video('media_1badc9f153c69f16292c23f9752012c9ab7edb851'),
      videoAlt: 'A dramatic photo of a woman runner is opened in Photoshop, where the Select Subject feature instantly finds her outline in fine detail.',
    }, {
      icon: icon('firefly-appicon-256'),
      iconAlt: 'Adobe Firefly',
      label: 'Content creation',
      heading: 'Generate stunning content easily.',
      body: 'Quickly create and edit images, video, and audio with creative AI.',
      href: 'https://www.adobe.com/products/firefly.html',
      poster: poster('firefly-generated-scene'),
      video: video('media_159d163e5e983109aed71b1cb4e1048b4f849ab72'),
      videoAlt: 'We see a striking image of a fashionably-dressed man standing in a tranquil, lotus-dotted pool in front of green elevator doors. The scene pulls back to reveal that it was generated by a text prompt in Firefly.',
    }, {
      icon: icon('acrobat-pro'),
      iconAlt: 'Adobe Acrobat',
      label: 'PDF and document essentials',
      heading: 'Do it all in less time.',
      body: 'Create, edit, and share PDFs. Make edits and create presentations with AI.',
      href: 'https://www.adobe.com/acrobat/pdf-and-document-essentials.html',
      poster: poster('acrobat-presentation'),
      video: video('media_1928dd1a3e8e5ed6e7979b5bb37fcd4c273746e62'),
      videoAlt: 'Three pages of a sleek modern presentation deck converge under an AI assistant chat field which reads, "How can I help you?" The user prompt reads, "Help me come up with a plan to land more partnerships." Below the prompt field is a drop-down menu to "Choose an assistant"',
    }, {
      icon: icon('experience-cloud-logo'),
      iconAlt: '',
      label: 'Adobe for Business',
      heading: 'Orchestrate customer experiences.',
      body: 'Deliver business impact, move faster, and personalize at scale.',
      href: 'https://business.adobe.com/',
      poster: poster('business-social-posts'),
      video: video('media_14d261ad034b647cf9ec9e77e1a4e53cbbd31af35'),
      videoAlt: 'We see a stylish hand-model photo of a lotion bottle. Pull back to reveal it is one of a series of branded social posts by the same boutique company, which are being tracked and optimized for performance.',
    }, {
      icon: icon('creative-cloud'),
      iconAlt: 'Adobe Creative Cloud',
      label: 'Students and teachers',
      heading: 'Students and teachers save big.',
      body: 'Save a bundle on our biggest bundle of top industry creative tools.',
      href: 'https://www.adobe.com/education/students/creativecloud.html',
      poster: poster('illustrator-numeral'),
      video: video('media_11ef0b05657078d2235cbedc8322cd486a4d83a86'),
      videoAlt: 'We see a graphic high-contrast duotone numeral 1 with a distressed overlay to evoke a vintage weathered poster texture. The image pulls out to reveal that it is being crafted in Adobe Illustrator.',
    }],
  },
};

// The homepage fragment's block, as published.
export const HomepageEverythingYouNeed = {
  name: 'adobe.com: Homepage everything you need',
  render: () => renderPageBlock(`${HOMEPAGE_FRAGMENTS}/everything-you-need/everything-you-need`, 'elastic-carousel', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
