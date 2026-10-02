import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/merch-card';
import variants from 'virtual:variants/c1/merch-card';

export default { title: 'C1/Merch Card', parameters: { cssprops }, argTypes: { variants } };

const library = `${LIBRARY}/merch-card`;

export const MWeb = {
  name: 'mWeb',
  render: () => renderPageBlock(library, 'merch-card'),
};

export const Segment = {
  render: () => renderPageBlock(library, 'merch-card', { index: 1 }),
};

export const SegmentWithBadge = {
  name: 'Segment with badge',
  render: () => renderPageBlock(library, 'merch-card', { index: 2 }),
};

export const SpecialOffers = {
  name: 'Special Offers',
  render: () => renderPageBlock(library, 'merch-card', { index: 3 }),
};

export const SpecialOffersWithBadge = {
  name: 'Special Offers with badge',
  render: () => renderPageBlock(library, 'merch-card', { index: 4 }),
};

export const Plans = {
  render: () => renderPageBlock(library, 'merch-card', { index: 5 }),
};

export const PlansWithBadge = {
  name: 'Plans with badge',
  render: () => renderPageBlock(library, 'merch-card', { index: 6 }),
};

export const PlansSecure = {
  name: 'Plans, secure',
  render: () => renderPageBlock(library, 'merch-card', { index: 7 }),
};

export const PlansSecureWithBadge = {
  name: 'Plans, secure with badge',
  render: () => renderPageBlock(library, 'merch-card', { index: 8 }),
};

export const CatalogWithMoreInfoAndBadge = {
  name: 'Catalog with more info and badge',
  render: () => renderPageBlock(library, 'merch-card', { index: 9 }),
};

export const CatalogWithMoreInfo = {
  name: 'Catalog with more info',
  render: () => renderPageBlock(library, 'merch-card', { index: 10 }),
};

export const CatalogWithBadge = {
  name: 'Catalog with badge',
  render: () => renderPageBlock(library, 'merch-card', { index: 11 }),
};

export const Catalog = {
  render: () => renderPageBlock(library, 'merch-card', { index: 12 }),
};

export const Default = {
  render: () => renderPageBlock(library, 'merch-card', { index: 13 }),
};

export const InlineHeadingBackgroundOpacity70 = {
  name: 'Inline Heading, background opacity 70%',
  render: () => renderPageBlock(library, 'merch-card', { index: 14 }),
};

export const Image = {
  render: () => renderPageBlock(library, 'merch-card', { index: 15 }),
};

export const Product = {
  render: () => renderPageBlock(library, 'merch-card', { index: 16 }),
};

export const ProductSecure = {
  name: 'Product, secure',
  render: () => renderPageBlock(library, 'merch-card', { index: 17 }),
};

export const MultiOfferSecure = {
  name: 'MultiOffer, secure',
  render: () => renderPageBlock(library, 'merch-card', { index: 18 }),
};

export const MiniCompareChartWithBadge = {
  name: 'Mini compare chart with badge',
  render: () => renderPageBlock(library, 'merch-card', { index: 19 }),
};

export const MiniCompareChartWithCheckList = {
  name: 'Mini compare chart with check list',
  render: () => renderPageBlock(library, 'merch-card', { index: 20 }),
};

export const Image2 = {
  name: 'Image 2',
  render: () => renderPageBlock(library, 'merch-card', { index: 21 }),
};

export const ImageWithBadge = {
  name: 'Image with badge',
  render: () => renderPageBlock(library, 'merch-card', { index: 22 }),
};
