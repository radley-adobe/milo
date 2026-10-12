import { MEDIA } from '../../../src/milo.js';
import { attr, icon } from '../authored.js';

const picture = (src, alt) => `<picture><img src="${attr(src)}" alt="${attr(alt)}"></picture>`;

// The buttons paragraph: the primary button in bold, then the secondary one.
const ctas = ({ ctaLabel, ctaHref, secondaryCtaLabel, secondaryCtaHref }) => {
  const buttons = [
    ctaLabel && `<em><strong><a href="${attr(ctaHref)}">${ctaLabel}</a></strong></em>`,
    secondaryCtaLabel && `<em><a href="${attr(secondaryCtaHref)}">${secondaryCtaLabel}</a></em>`,
  ].filter(Boolean);
  return buttons.length ? `<p>${buttons.join(' ')}</p>` : '';
};

// One slide's row: its text cell, then its background cell.
const slideRow = (slide, image) => `
  <div>
    <div>
      ${slide.eyebrow ? `<p>${slide.eyebrow}</p>` : ''}
      ${slide.heading ? `<h2>${slide.heading}</h2>` : ''}
      ${slide.body ? `<p>${slide.body}</p>` : ''}
      ${ctas(slide)}
      ${slide.icon ? `<p><a href="${attr(slide.icon)}">${slide.icon}</a></p>` : ''}
      ${slide.label ? `<p>${slide.labelHref ? `<a href="${attr(slide.labelHref)}">${slide.label}</a>` : slide.label}</p>` : ''}
    </div>
    <div>${image ? picture(image, slide.imageAlt) : ''}</div>
  </div>`;

// A tablet row: an empty text cell, which keeps the mobile row's text, and the background.
const tabletRow = ({ image, imageAlt }) => `
  <div>
    <div></div>
    <div>${image ? picture(image, imageAlt) : ''}</div>
  </div>`;

// Authored markup for a Router Marquee block from a story's args: a `mobile` row and one row per
// slide, with `mobileImage` as the background when a slide has one. When any slide has one, a
// `tablet` row follows, with a row per slide that gives `image` from 768px and keeps the text.
export const routerMarquee = ({ variants: classes = [], slides = [] }) => {
  const tablet = slides.some((slide) => slide.mobileImage);
  return `
<div class="${['router-marquee', ...classes].join(' ')}">
  <div>
    <div>mobile</div>
  </div>${slides.map((slide) => slideRow(slide, slide.mobileImage || slide.image)).join('')}${tablet ? `
  <div>
    <div>tablet</div>
  </div>${slides.map(tabletRow).join('')}` : ''}
</div>`.trim().replace(/^\s*\n/gm, '');
};

export const SLIDES_DESCRIPTION = 'One slide each, in order: an `eyebrow`, `heading` and `body`, a primary button from `ctaLabel` and `ctaHref`, the card\'s `icon`, the URL of an SVG, and its `label` linking to `labelHref`, and a background `image` with its `imageAlt`. `mobileImage` replaces `image` below 768px, and `secondaryCtaLabel` and `secondaryCtaHref` add a secondary button. `heading` is required. Leave `imageAlt` empty when the image is decorative. Leave another value empty to leave it out, apart from `image`, which then keeps `mobileImage` at every width, and `icon` or `label`, which then label the card with the heading.';

const slide = (name, iconName, text) => ({
  ...text,
  icon: icon(iconName),
  image: `${MEDIA}/router-marquee/${name}.webp`,
  mobileImage: `${MEDIA}/router-marquee/${name}-mobile.webp`,
  imageAlt: '',
});

// The homepage's five slides. The homepage loads their text from Merch at Scale, and its Free
// trial buttons open checkout, so these link to the card's page instead. The homepage's
// backgrounds from 768px are videos, and these are their posters. Its backgrounds are decorative,
// with empty alt text.
export const SLIDES = [
  slide('creative-cloud', 'creative-cloud', {
    eyebrow: 'Creative Cloud',
    heading: 'Create at the highest level.',
    body: 'Photoshop, Illustrator, Premiere, and much more. Work with the tools behind the world\'s most iconic creative content.',
    ctaLabel: 'Free trial',
    ctaHref: 'https://www.adobe.com/creativecloud.html',
    label: 'Creativity and design',
    labelHref: 'https://www.adobe.com/creativecloud.html',
  }),
  slide('firefly', 'firefly-appicon-256', {
    eyebrow: 'Firefly',
    heading: 'All the best models, all in one place.',
    body: 'Generate and edit images, video, audio, and designs using top AI models from Adobe, Google, OpenAI, and more.',
    ctaLabel: 'Create with Firefly',
    ctaHref: 'https://www.adobe.com/products/firefly.html',
    label: 'Content creation',
    labelHref: 'https://www.adobe.com/products/firefly.html',
  }),
  slide('acrobat', 'acrobat-pro', {
    eyebrow: 'Acrobat',
    heading: 'Get work done. Faster.',
    body: 'Create, edit, share and sign documents with trusted PDF tools. Use AI to make easy edits, get answers, share information, and create polished content.',
    ctaLabel: 'Free trial',
    ctaHref: 'https://www.adobe.com/acrobat/pdf-and-document-essentials.html',
    label: 'PDF and document essentials',
    labelHref: 'https://www.adobe.com/acrobat/pdf-and-document-essentials.html',
  }),
  slide('business', 'experience-cloud-logo', {
    eyebrow: 'Adobe for Business',
    heading: 'Orchestrate customer experiences with AI.',
    body: 'Unify data, content, and workflows with Adobe AI to move faster, personalize at scale, and prove impact across your business.',
    ctaLabel: 'It starts with Adobe',
    ctaHref: 'https://business.adobe.com/',
    label: 'Adobe for Business',
    labelHref: 'https://business.adobe.com/',
  }),
  slide('education', 'creative-cloud', {
    eyebrow: 'Education',
    heading: 'Students and teachers save 71%.',
    body: 'Save big on industry-standard tools with Creative Cloud Pro. Create designs, videos, presentations, and more—while building skills for your future.',
    ctaLabel: 'Free trial',
    ctaHref: 'https://www.adobe.com/education/students/creativecloud.html',
    label: 'Students and teachers',
    labelHref: 'https://www.adobe.com/education/students/creativecloud.html',
  }),
];
