import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Accordion' };

const library = `${LIBRARY}/accordion`;

export const Default = {
  render: () => renderPageBlock(library, 'accordion'),
};

export const Seo = {
  name: 'SEO',
  render: () => renderPageBlock(library, 'accordion', { index: 1 }),
};

export const ExpandAll = {
  name: '12 col with expand/collapse all',
  render: () => renderPageBlock(library, 'accordion', { index: 2 }),
};

export const RichMedia = {
  name: 'Rich media',
  render: () => renderPageBlock(library, 'accordion', { index: 3 }),
};

export const PhotoshopFaq = {
  name: 'adobe.com: Photoshop FAQ',
  render: () => renderPageBlock('https://main--cc--adobecom.aem.live/cc-shared/fragments/products/photoshop/photoshop-faq', 'accordion'),
};
