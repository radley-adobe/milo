import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Hero Marquee' };

const library = `${LIBRARY}/hero-marquee`;

export const Standard = {
  render: () => renderPageBlock(library, 'hero-marquee'),
};

export const Center = {
  render: () => renderPageBlock(library, 'hero-marquee', { index: 1 }),
};

export const MediaCover = {
  name: 'Media cover',
  render: () => renderPageBlock(library, 'hero-marquee', { index: 2 }),
};
