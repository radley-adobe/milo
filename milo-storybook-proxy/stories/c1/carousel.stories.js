import { LIBRARY, renderLibraryExample } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/carousel';

export default { title: 'C1/Carousel', parameters: { cssprops } };

const library = `${LIBRARY}/carousel`;

export const MWeb = {
  name: 'mWeb',
  render: () => renderLibraryExample(library, 0),
};

export const Container = {
  render: () => renderLibraryExample(library, 1),
};

export const WithLightbox = {
  name: 'With lightbox',
  render: () => renderLibraryExample(library, 2),
};

export const HintingCenterMobileShow3AlignHeight = {
  name: 'Hinting center mobile + show 3 + align height',
  render: () => renderLibraryExample(library, 3),
};

export const HintingMobileTallVideo = {
  name: 'Hinting mobile + Tall video',
  render: () => renderLibraryExample(library, 4),
};

export const Show4Container = {
  name: 'Show-4, container',
  render: () => renderLibraryExample(library, 5),
};
