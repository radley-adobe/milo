import { ACROBAT, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/social-proof';
import variants from 'virtual:variants/c2/social-proof';

export default { title: 'Social Proof', parameters: { cssprops }, argTypes: { variants } };

export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderPageBlock(ACROBAT, 'social-proof', { metadata: true, foundation: 'c2' }),
};

export const AcrobatStudio = {
  name: 'adobe.com: Acrobat Studio',
  render: () => renderPageBlock(`${ACROBAT}/acrobat-studio`, 'social-proof', { metadata: true, foundation: 'c2' }),
};
