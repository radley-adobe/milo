import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/iframe';
import variants from 'virtual:variants/c1/iframe';

export default { title: 'C1/iFrame', parameters: { cssprops }, argTypes: { variants } };

const library = `${LIBRARY}/iframe`;

export const Default = {
  render: () => renderPageBlock(library, 'iframe'),
};
