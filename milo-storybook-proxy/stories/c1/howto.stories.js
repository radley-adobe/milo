import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/how-to';

export default { title: 'C1/HowTo', parameters: { cssprops } };

const library = `${LIBRARY}/howto`;

export const Default = {
  render: () => renderPageBlock(library, 'how-to'),
};

export const SEO = {
  render: () => renderPageBlock(library, 'how-to', { index: 1 }),
};

export const LargeMediaFirstLeft = {
  name: 'Large media first/left',
  render: () => renderPageBlock(library, 'how-to', { index: 2 }),
};

export const LargeMediaWMobileMediaBottom = {
  name: 'Large media w/ mobile media bottom',
  render: () => renderPageBlock(library, 'how-to', { index: 3 }),
};
