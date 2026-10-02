import { ACROBAT, CC_PRO_TEST_FRAGMENTS, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/faq';
import variants from 'virtual:variants/c2/faq';

export default { title: 'C2/FAQ', parameters: { cssprops }, argTypes: { variants } };

export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderPageBlock(ACROBAT, 'faq', { metadata: true, foundation: 'c2' }),
};

export const CreativeCloudProProduct = {
  name: 'adobe.com: Creative Cloud Pro product',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'faq', { metadata: true, foundation: 'c2' }),
};
