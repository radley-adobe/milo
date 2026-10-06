import { CC_PRO_TEST_FRAGMENTS, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/globe-gallery';
import variants from 'virtual:variants/c2/globe-gallery';

export default { title: 'Blocks/Globe Gallery', parameters: { cssprops }, argTypes: { variants } };

export const CreativeCloudProHub = {
  name: 'adobe.com: Creative Cloud Pro hub',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-hub`, 'globe-gallery', { metadata: true, foundation: 'c2' }),
};
