import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Quick Facts' };

const library = `${LIBRARY}/quick-facts`;

export const WithHeading = {
  name: 'With heading',
  render: () => renderPageBlock(library, 'quick-facts'),
};

export const WithTitlebodyNoInset = {
  name: 'With titlebody + no inset',
  render: () => renderPageBlock(library, 'quick-facts', { index: 1 }),
};
