import { ACROBAT_TEST_FRAGMENTS, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/quick-actions';
import variants from 'virtual:variants/c2/quick-actions';

export default { title: 'Blocks/Quick Actions', parameters: { cssprops }, argTypes: { variants } };

export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderPageBlock(`${ACROBAT_TEST_FRAGMENTS}/ace1205-product`, 'quick-actions', { metadata: true, foundation: 'c2' }),
};
