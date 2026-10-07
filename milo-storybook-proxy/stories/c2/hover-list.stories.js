import { ACROBAT, CC_PRO_TEST_FRAGMENTS, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/hover-list';
import variants from 'virtual:variants/c2/hover-list';

export default { title: 'Blocks/Hover List', parameters: { cssprops }, argTypes: { variants } };

export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderPageBlock(ACROBAT, 'hover-list', { metadata: true, foundation: 'c2' }),
};

export const CreativeCloudProProduct = {
  name: 'adobe.com: Creative Cloud Pro product',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'hover-list', { metadata: true, foundation: 'c2' }),
};
