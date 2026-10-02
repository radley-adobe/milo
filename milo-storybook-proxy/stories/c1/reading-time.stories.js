import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/reading-time';
import variants from 'virtual:variants/c1/reading-time';

export default { title: 'C1/Reading Time', parameters: { cssprops }, argTypes: { variants } };

const library = `${LIBRARY}/reading-time`;

export const Default = {
  render: () => renderPageBlock(library, 'reading-time'),
};
