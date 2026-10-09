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
