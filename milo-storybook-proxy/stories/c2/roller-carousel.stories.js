import { CC_PRO_TEST_FRAGMENTS, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/roller-carousel';
import variants from 'virtual:variants/c2/roller-carousel';

export default { title: 'Roller Carousel', parameters: { cssprops }, argTypes: { variants } };

export const CreativeCloudProOffer = {
  name: 'adobe.com: Creative Cloud Pro offer',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-offer`, 'roller-carousel', { metadata: true, foundation: 'c2' }),
};
