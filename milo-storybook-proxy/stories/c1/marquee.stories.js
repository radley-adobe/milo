import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import marquee from 'virtual:cssprops/c1/marquee';
import marqueeVariants from 'virtual:variants/c1/marquee';
import marqueeAnchors from 'virtual:cssprops/c1/marquee-anchors';
import marqueeAnchorsVariants from 'virtual:variants/c1/marquee-anchors';

export default { title: 'C1/Marquee' };

const library = `${LIBRARY}/marquee`;

export const SmallLight = {
  name: 'Small light',
  parameters: { cssprops: marquee },
  argTypes: { variants: marqueeVariants },
  render: () => renderPageBlock(library, 'marquee'),
};

export const Default = {
  name: 'Medium dark (default)',
  parameters: { cssprops: marquee },
  argTypes: { variants: marqueeVariants },
  render: () => renderPageBlock(library, 'marquee', { index: 1 }),
};

export const MediumLight = {
  name: 'Medium light',
  parameters: { cssprops: marquee },
  argTypes: { variants: marqueeVariants },
  render: () => renderPageBlock(library, 'marquee', { index: 2 }),
};

export const MediumLightLargeButton = {
  name: 'Medium light with large button',
  parameters: { cssprops: marquee },
  argTypes: { variants: marqueeVariants },
  render: () => renderPageBlock(library, 'marquee', { index: 3 }),
};

export const SmallOneThirdLight = {
  name: 'Small one-third light',
  parameters: { cssprops: marquee },
  argTypes: { variants: marqueeVariants },
  render: () => renderPageBlock(library, 'marquee', { index: 4 }),
};

export const MediumOneThird = {
  name: 'Medium one-third',
  parameters: { cssprops: marquee },
  argTypes: { variants: marqueeVariants },
  render: () => renderPageBlock(library, 'marquee', { index: 5 }),
};

export const LargeOneThird = {
  name: 'Large one-third',
  parameters: { cssprops: marquee },
  argTypes: { variants: marqueeVariants },
  render: () => renderPageBlock(library, 'marquee', { index: 6 }),
};

export const Anchors = {
  parameters: { cssprops: marqueeAnchors },
  argTypes: { variants: marqueeAnchorsVariants },
  render: () => renderPageBlock(library, 'marquee-anchors'),
};

export const AnchorsTransparent = {
  name: 'Anchors (transparent)',
  parameters: { cssprops: marqueeAnchors },
  argTypes: { variants: marqueeAnchorsVariants },
  render: () => renderPageBlock(library, 'marquee-anchors', { index: 1 }),
};

export const BackgroundFocalPoint = {
  name: 'Background image focal point',
  parameters: { cssprops: marquee },
  argTypes: { variants: marqueeVariants },
  render: () => renderPageBlock(library, 'marquee', { index: 7 }),
};

export const ExperienceManager = {
  name: 'adobe.com: Experience Manager',
  parameters: { cssprops: marquee },
  argTypes: { variants: marqueeVariants },
  render: () => renderPageBlock('https://main--bacom--adobecom.aem.live/products/experience-manager/adobe-experience-manager', 'marquee'),
};
