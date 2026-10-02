import { ACROBAT_TEST_FRAGMENTS, CC_PRO_TEST_FRAGMENTS, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/tour';
import variants from 'virtual:variants/c2/tour';

export default { title: 'C2/Tour', parameters: { cssprops }, argTypes: { variants } };

export const AcrobatLegal = {
  name: 'adobe.com: Acrobat legal',
  render: () => renderPageBlock(`${ACROBAT_TEST_FRAGMENTS}/modals/legal`, 'tour', { metadata: true, foundation: 'c2' }),
};

export const CreativeCloudProDesign = {
  name: 'adobe.com: Creative Cloud Pro design',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/modals/design`, 'tour', { metadata: true, foundation: 'c2' }),
};
