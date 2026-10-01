import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Marquee' };

const library = `${LIBRARY}/marquee`;

export const SmallLight = {
  name: 'Small light',
  render: () => renderPageBlock(library, 'marquee'),
};

export const Default = {
  name: 'Medium dark (default)',
  render: () => renderPageBlock(library, 'marquee', { index: 1 }),
};

export const MediumLight = {
  name: 'Medium light',
  render: () => renderPageBlock(library, 'marquee', { index: 2 }),
};

export const MediumLightLargeButton = {
  name: 'Medium light with large button',
  render: () => renderPageBlock(library, 'marquee', { index: 3 }),
};

export const SmallOneThirdLight = {
  name: 'Small one-third light',
  render: () => renderPageBlock(library, 'marquee', { index: 4 }),
};

export const MediumOneThird = {
  name: 'Medium one-third',
  render: () => renderPageBlock(library, 'marquee', { index: 5 }),
};

export const LargeOneThird = {
  name: 'Large one-third',
  render: () => renderPageBlock(library, 'marquee', { index: 6 }),
};

export const Anchors = {
  render: () => renderPageBlock(library, 'marquee-anchors'),
};

export const AnchorsTransparent = {
  name: 'Anchors (transparent)',
  render: () => renderPageBlock(library, 'marquee-anchors', { index: 1 }),
};

export const BackgroundFocalPoint = {
  name: 'Background image focal point',
  render: () => renderPageBlock(library, 'marquee', { index: 7 }),
};

export const ExperienceManager = {
  name: 'adobe.com: Experience Manager',
  render: () => renderPageBlock('https://main--bacom--adobecom.aem.live/products/experience-manager/adobe-experience-manager', 'marquee'),
};
