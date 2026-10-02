import { ACROBAT, CC_PRO_TEST_FRAGMENTS, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/split-aside-grid';
import variants from 'virtual:variants/c2/split-aside-grid';

export default { title: 'Split Aside Grid', parameters: { cssprops }, argTypes: { variants } };

export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderPageBlock(ACROBAT, 'split-aside-grid', { metadata: true, foundation: 'c2' }),
};

export const CreativeCloudProProduct = {
  name: 'adobe.com: Creative Cloud Pro product',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'split-aside-grid', { metadata: true, foundation: 'c2' }),
};
