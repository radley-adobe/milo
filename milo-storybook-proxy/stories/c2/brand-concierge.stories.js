import { CC_PRO_TEST_FRAGMENTS, NALA, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/brand-concierge';
import variants from 'virtual:variants/c2/brand-concierge';

export default { title: 'Blocks/Brand Concierge', parameters: { cssprops }, argTypes: { variants } };

export const Default = {
  render: () => renderPageBlock(`${NALA}/brand-concierge/brand-concierge`, 'brand-concierge', { metadata: true, foundation: 'c2' }),
};

export const Hero = {
  render: () => renderPageBlock(`${NALA}/brand-concierge/brand-concierge-hero`, 'brand-concierge', { metadata: true, foundation: 'c2' }),
};

export const CreativeCloudProHub = {
  name: 'adobe.com: Creative Cloud Pro hub',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-hub`, 'brand-concierge', { metadata: true, foundation: 'c2' }),
};
