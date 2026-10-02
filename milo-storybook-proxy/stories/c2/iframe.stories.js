import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/iframe';
import variants from 'virtual:variants/c2/iframe';

export default { title: 'C2/iFrame', parameters: { cssprops }, argTypes: { variants } };

export const Default = {
  render: () => renderPageBlock(`${LIBRARY}/iframe`, 'iframe', { foundation: 'c2' }),
};
