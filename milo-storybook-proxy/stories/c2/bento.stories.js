import { LIBRARY, renderLibraryExample } from '../../src/milo.js';

const library = `${LIBRARY}/c2/bento`;

// The library's Bento examples: explore cards in a section that lays them out as a bento. Each
// example holds several blocks, so it renders as the library lists it. See Sections/Bento for
// stories that render a bento from args.
export default { title: 'Blocks/Bento' };

export const Default = {
  render: () => renderLibraryExample(library, 0, { foundation: 'c2' }),
};

export const MixedWidthStackMobile = {
  name: 'Mixed width stack mobile',
  render: () => renderLibraryExample(library, 1, { foundation: 'c2' }),
};
