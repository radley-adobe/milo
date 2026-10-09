import { MEDIA } from '../../../src/milo.js';
import { attr } from '../authored.js';

// The name that links the carousel to its slide sections.
const NAME = 'customer-testimonials';

const picture = (src, alt) => `
      <div><picture><img src="${attr(src)}" alt="${attr(alt)}"></picture></div>`;

// Authored markup for a Carousel C2 block's section.
export const carousel = ({ variants: classes = [], label }) => `
<div>
  <div class="${['carousel-c2', ...classes].join(' ')}">
    <div><div>${NAME}</div><div>${label}</div></div>
  </div>
</div>`.trim();

// Authored markup for one slide section: a Rich Content block over the section's background
// image, with the mobile image first when there is one. `showAttribution` and `showCta` are
// true unless set.
export const slide = ({
  heading, name, role, showAttribution = true, ctaLabel, ctaHref, showCta = true,
  image, mobileImage, imageAlt,
}) => `
<div>
  <div class="rich-content dark button-lg">
    <div>
      <div>
        ${heading ? `<h3>${heading}</h3>` : ''}
        ${showAttribution && name ? `<p><strong>${name}</strong></p>` : ''}
        ${showAttribution && role ? `<p>${role}</p>` : ''}
        ${showCta && ctaLabel ? `<p><em><a href="${attr(ctaHref)}">${ctaLabel}</a></em></p>` : ''}
      </div>
    </div>
  </div>
  <div class="section-metadata">
    ${image ? `<div>
      <div>background</div>${mobileImage ? picture(mobileImage, imageAlt) : ''}${picture(image, imageAlt)}
    </div>` : ''}
    <div><div>carousel</div><div>${NAME}</div></div>
  </div>
</div>`.trim();

const testimonial = (file, alt) => ({
  image: `${MEDIA}/carousel-c2/${file}.webp`,
  mobileImage: `${MEDIA}/carousel-c2/${file}-mobile.webp`,
  imageAlt: alt,
});

// The homepage's customer testimonials. `#_button-fill` gives each link the fill button style.
export const TESTIMONIALS = [{
  heading: '"Creative Cloud lets me create effortlessly and allows me to focus on what\'s important."',
  name: 'Antoni Sendra',
  role: 'Filmmaker',
  ctaLabel: 'See all plans',
  ctaHref: 'https://www.adobe.com/creativecloud/plans.html#_button-fill',
  ...testimonial('antoni-sendra', 'Filmmaker Antoni Sendra, staring thoughtfully at his editing workstation.'),
}, {
  heading: '“With Acrobat, I can summarize key contract details in seconds.”',
  name: 'Angi Ciccarelli',
  role: 'Real Estate Agent',
  ctaLabel: 'See all plans',
  ctaHref: 'https://www.adobe.com/creativecloud/plans.html#filter=acrobat#_button-fill',
  ...testimonial('angi-ciccarelli', 'Real estate agent Angi Ciccarelli, speaking interview style to someone off screen.'),
}, {
  heading: '"If it wasn\'t for Creative Cloud, I don\'t think I\'d be here. I feel like I can create anything."',
  name: 'Michelle Phan',
  role: 'Creator',
  ctaLabel: 'See all plans',
  ctaHref: 'https://www.adobe.com/creativecloud/plans.html#_button-fill',
  ...testimonial('michelle-phan', 'Portrait of creator Michelle Phan in a shaggy pink sweater, holding a makeup compact and brush.'),
}];
