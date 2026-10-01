import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Media' };

const library = `${LIBRARY}/media`;

export const SmallChecklistBio = {
  name: 'Small + checklist + bio',
  render: () => renderPageBlock(library, 'media'),
};

export const MediumChecklistBio = {
  name: 'Medium + checklist + bio',
  render: () => renderPageBlock(library, 'media', { index: 1 }),
};

export const MediumCompactChecklist = {
  name: 'Medium-compact + checklist',
  render: () => renderPageBlock(library, 'media', { index: 2 }),
};

export const LargeChecklistBioDark = {
  name: 'Large + checklist + bio + dark',
  render: () => renderPageBlock(library, 'media', { index: 3 }),
};

export const QR = {
  render: () => renderPageBlock(library, 'media', { index: 4 }),
};

export const MerchMedium = {
  name: 'Merch medium',
  render: () => renderPageBlock(library, 'media', { index: 5 }),
};
