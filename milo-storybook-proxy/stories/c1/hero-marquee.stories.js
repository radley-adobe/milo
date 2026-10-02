import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/hero-marquee';
import variants from 'virtual:variants/c1/hero-marquee';

export default { title: 'C1/Hero Marquee', parameters: { cssprops }, argTypes: { variants } };

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
