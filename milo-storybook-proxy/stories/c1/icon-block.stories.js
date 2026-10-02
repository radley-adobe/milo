import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/icon-block';
import variants from 'virtual:variants/c1/icon-block';

export default { title: 'C1/IconBlock', parameters: { cssprops }, argTypes: { variants } };

const library = `${LIBRARY}/icon-block`;

export const FullWidthLarge = {
  name: 'Full width large',
  render: () => renderPageBlock(library, 'icon-block'),
};

export const FullWidthMedium = {
  name: 'Full width medium',
  render: () => renderPageBlock(library, 'icon-block', { index: 1 }),
};

export const FullWidthMediumIntro = {
  name: 'Full width medium intro',
  render: () => renderPageBlock(library, 'icon-block', { index: 2 }),
};

export const Small = {
  render: () => renderPageBlock(library, 'icon-block', { index: 3 }),
};

export const CenterBioSmall = {
  name: 'Center bio small',
  render: () => renderPageBlock(library, 'icon-block', { index: 4 }),
};

export const BioSmall = {
  name: 'Bio small',
  render: () => renderPageBlock(library, 'icon-block', { index: 5 }),
};
