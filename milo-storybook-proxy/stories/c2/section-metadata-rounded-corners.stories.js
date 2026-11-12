import { LIBRARY, renderLibraryExample } from '../../src/milo.js';

const library = `${LIBRARY}/c2/section-metadata-rounded-corners`;

// The library's examples of the `rounded-corners`, `rounded-corners-top` and
// `rounded-corners-bottom` section styles.
export default { title: 'Blocks/Section Metadata: Rounded Corners' };

export const AllFourCorners = {
  name: 'All four corners',
  render: () => renderLibraryExample(library, 0, { foundation: 'c2' }),
};

export const TopCornersOnly = {
  name: 'Top corners only',
  render: () => renderLibraryExample(library, 1, { foundation: 'c2' }),
};

export const BottomCornersOnly = {
  name: 'Bottom corners only',
  render: () => renderLibraryExample(library, 2, { foundation: 'c2' }),
};

export const DifferentEdgesByDevice = {
  name: 'Different edges by device',
  render: () => renderLibraryExample(library, 3, { foundation: 'c2' }),
};

export const AnImageBackedSection = {
  name: 'An image-backed section',
  render: () => renderLibraryExample(library, 4, { foundation: 'c2' }),
};
