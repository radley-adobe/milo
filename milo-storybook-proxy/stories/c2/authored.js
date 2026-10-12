import { MEDIA } from '../../src/milo.js';

// Authored markup that block and section stories build from their args.

// An icon in media/icons/.
export const icon = (name) => `${MEDIA}/icons/${name}.svg`;

// An arg as an attribute value.
export const attr = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;');

// Section metadata with a row for each setting that has a value, or nothing when none has.
export const sectionMetadata = (settings) => {
  const rows = Object.entries(settings).filter(([, value]) => value)
    .map(([key, value]) => `  <div><div>${key}</div><div>${value}</div></div>`);
  return rows.length ? `<div class="section-metadata">\n${rows.join('\n')}\n</div>` : '';
};

// A section holding the given markup, as a page's authored HTML has it, without blank lines.
export const section = (...parts) => `<div>\n${parts.filter(Boolean).join('\n')
  .replace(/^\s*\n/gm, '').replace(/^/gm, '  ')}\n</div>`;

// One base card. `showIcon` is true unless set.
export const baseCard = ({
  variants: classes = [], icon: iconUrl, showIcon = true, heading, body, ctaLabel, ctaHref, image, imageAlt,
}) => `
<div class="${['base-card', ...classes].join(' ')}">
  <div>
    <div>
      ${showIcon && iconUrl ? `<p><a href="${attr(iconUrl)}">${iconUrl}</a></p>` : ''}
      ${heading ? `<h3>${heading}</h3>` : ''}
      ${body ? `<p>${body}</p>` : ''}
      ${ctaLabel ? `<p><a href="${attr(ctaHref)}">${ctaLabel}</a></p>` : ''}
    </div>
    ${image ? `<div><picture><img src="${attr(image)}" alt="${attr(imageAlt)}"></picture></div>` : ''}
  </div>
</div>`.trim();

// One explore card. `showIcon` is true unless set. The image cell stays when it's empty,
// because the block takes the row's last cell as its image cell.
export const exploreCard = ({
  variants: classes = [], icon: iconUrl, showIcon = true, heading, body, ctaLabel, ctaHref, image, imageAlt,
}) => `
<div class="${['explore-card', ...classes].join(' ')}">
  <div>
    <div>
      ${showIcon && iconUrl ? `<p><a href="${attr(iconUrl)}">${iconUrl}</a></p>` : ''}
      ${heading ? `<h3>${heading}</h3>` : ''}
      ${body ? `<p>${body}</p>` : ''}
      ${ctaLabel ? `<p><a href="${attr(ctaHref)}">${ctaLabel}</a></p>` : ''}
    </div>
    <div>${image ? `<picture><img src="${attr(image)}" alt="${attr(imageAlt)}"></picture>` : ''}</div>
  </div>
</div>`.trim();

// One plans hero. With a `mobileImage`, a Mobile-viewport row shows the text and that image below
// 768px, and a Tablet-viewport row shows `image` from 768px, with an empty text cell that keeps
// the text. `focalPoint` follows each image in its cell. `showEyebrow` is true unless set.
export const plansHero = ({
  variants: classes = [], dark, eyebrow, showEyebrow = true, heading, body, image, mobileImage, imageAlt, focalPoint,
}) => {
  const row = (...cells) => `<div>\n    ${cells.join('\n    ')}\n  </div>`;
  const media = (src) => `<div>${src ? `<picture><img src="${attr(src)}" alt="${attr(imageAlt)}"></picture>${focalPoint ?? ''}` : ''}</div>`;
  const text = `<div>
      ${showEyebrow && eyebrow ? `<p>${eyebrow}</p>` : ''}
      ${heading ? `<h1>${heading}</h1>` : ''}
      ${body ? `<p>${body}</p>` : ''}
    </div>`;
  const rows = mobileImage
    ? [row('<div>mobile-viewport</div>'), row(text, media(mobileImage)), row('<div>tablet-viewport</div>'), row('<div></div>', media(image))]
    : [row(text, media(image))];
  return `
<div class="${['plans-hero', ...(dark ? ['dark'] : []), ...classes].join(' ')}">
  ${rows.join('\n  ')}
</div>`.trim();
};

// One quote: the quote as an `h2`, then the name and role. `showAttribution` is true unless set.
export const quote = ({ variants: classes = [], quote: text, name, role, showAttribution = true }) => `
<div class="${['quote', ...classes].join(' ')}">
  <div>
    <div>
      ${text ? `<h2>${text}</h2>` : ''}
      ${showAttribution && name ? `<p>${name}</p>` : ''}
      ${showAttribution && role ? `<p>${role}</p>` : ''}
    </div>
  </div>
</div>`.trim();

// A Side by Side card's media cell. A shown icon goes in its own paragraph before the image,
// because the block takes the first of two images in a stacked card's cell as its icon.
function sideBySideMedia({ icon: iconUrl, image, imageAlt }, showIcon) {
  const img = image ? `<picture><img src="${attr(image)}" alt="${attr(imageAlt)}"></picture>` : '';
  if (!showIcon || !iconUrl) return `<div>${img}</div>`;
  const parts = [`<p><a href="${attr(iconUrl)}">${iconUrl}</a></p>`, img && `<p>${img}</p>`].filter(Boolean);
  return `<div>\n      ${parts.join('\n      ')}\n    </div>`;
}

// A Side by Side card's text cell.
function sideBySideText({ heading, body, ctaLabel, ctaHref }) {
  const parts = [
    heading && `<h3>${heading}</h3>`,
    body && `<p>${body}</p>`,
    ctaLabel && `<p><a href="${attr(ctaHref)}">${ctaLabel}</a></p>`,
  ].filter(Boolean);
  return parts.length ? `<div>\n      ${parts.join('\n      ')}\n    </div>` : '<div></div>';
}

// One Side by Side block: a media row and a text row, with one cell per card. `showIcon` is true
// unless set.
export const sideBySide = ({ variants: classes = [], cards = [], showIcon = true }) => `
<div class="${['side-by-side', ...classes].join(' ')}">
  <div>
    ${cards.map((card) => sideBySideMedia(card, showIcon)).join('\n    ')}
  </div>
  <div>
    ${cards.map(sideBySideText).join('\n    ')}
  </div>
</div>`.trim();

// One Split Aside Grid item's row: its text, then `image`. The image cell stays when it's empty,
// because the block takes each row's second cell as its media.
const splitAsideGridRow = ({ heading, body, ctaLabel, ctaHref }, image, imageAlt) => {
  const text = [
    heading && `      <h3>${heading}</h3>`,
    body && `      <p>${body}</p>`,
    ctaLabel && `      <p><a href="${attr(ctaHref)}">${ctaLabel}</a></p>`,
  ].filter(Boolean);
  return [
    '  <div>',
    text.length ? ['    <div>', ...text, '    </div>'].join('\n') : '    <div></div>',
    `    <div>${image ? `<picture><img src="${attr(image)}" alt="${attr(imageAlt)}"></picture>` : ''}</div>`,
    '  </div>',
  ].join('\n');
};

// One Split Aside Grid block, with a row per item, authored with `container` as the adobe.com
// pages do, and with `dark` when `dark` is set. When any item has a `mobileImage`, a
// `Mobile-viewport` row comes first, then the items with their `mobileImage`, or `image` when they
// have none, then a `Tablet-viewport` row and the items with an empty text cell, which keeps the
// text above, and their `image`.
export const splitAsideGrid = ({ variants: classes = [], dark, items = [] }) => {
  const label = (name) => `  <div>\n    <div>${name}</div>\n  </div>`;
  const rows = items.some((item) => item.mobileImage) ? [
    label('Mobile-viewport'),
    ...items.map((item) => splitAsideGridRow(item, item.mobileImage || item.image, item.imageAlt)),
    label('Tablet-viewport'),
    ...items.map((item) => splitAsideGridRow({}, item.image, item.imageAlt)),
  ] : items.map((item) => splitAsideGridRow(item, item.image, item.imageAlt));
  return `<div class="${['split-aside-grid', 'container', ...(dark ? ['dark'] : []), ...classes].join(' ')}">\n${rows.join('\n')}\n</div>`;
};
