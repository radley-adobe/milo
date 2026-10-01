import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/MEP Lingo' };

const library = `${LIBRARY}/mep-lingo`;

export const Inline = {
  render: () => renderPageBlock(library, 'marquee'),
};

export const Block = {
  render: () => renderPageBlock(library, 'mep-lingo'),
};

export const Row = {
  render: () => renderPageBlock(library, 'text'),
};
