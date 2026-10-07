import { ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/product-marquee-grid';
import variants from 'virtual:variants/c2/product-marquee-grid';

export default { title: 'Blocks/Product Marquee Grid', parameters: { cssprops, liveExamples: [LIVE.acrobat] }, argTypes: { variants } };

export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderPageBlock(ACROBAT, 'product-marquee-grid', { metadata: true, foundation: 'c2' }),
};

export const CreativeCloudProProduct = {
  name: 'adobe.com: Creative Cloud Pro product',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'product-marquee-grid', { metadata: true, foundation: 'c2' }),
};
