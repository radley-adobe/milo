import { CC_PRO_TEST_FRAGMENTS, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/quote';
import variants from 'virtual:variants/c2/quote';

export default { title: 'Quote', parameters: { cssprops }, argTypes: { variants } };

export const CreativeCloudProProduct = {
  name: 'adobe.com: Creative Cloud Pro product',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'quote', { metadata: true, foundation: 'c2' }),
};

export const CreativeCloudProOffer = {
  name: 'adobe.com: Creative Cloud Pro offer',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-offer`, 'quote', { metadata: true, foundation: 'c2' }),
};
