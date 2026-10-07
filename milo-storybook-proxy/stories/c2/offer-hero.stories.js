import { ACROBAT, CC_PRO_TEST_FRAGMENTS, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/offer-hero';
import variants from 'virtual:variants/c2/offer-hero';

export default { title: 'Blocks/Offer Hero', parameters: { cssprops }, argTypes: { variants } };

export const AcrobatStudio = {
  name: 'adobe.com: Acrobat Studio',
  render: () => renderPageBlock(`${ACROBAT}/acrobat-studio`, 'offer-hero', { metadata: true, foundation: 'c2' }),
};

export const CreativeCloudProOffer = {
  name: 'adobe.com: Creative Cloud Pro offer',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-offer`, 'offer-hero', { metadata: true, foundation: 'c2' }),
};
