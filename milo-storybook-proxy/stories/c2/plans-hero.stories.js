import { ACROBAT_TEST_FRAGMENTS, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/plans-hero';
import variants from 'virtual:variants/c2/plans-hero';

export default { title: 'Plans Hero', parameters: { cssprops }, argTypes: { variants } };

export const AcrobatPlans = {
  name: 'adobe.com: Acrobat plans',
  render: () => renderPageBlock(`${ACROBAT_TEST_FRAGMENTS}/ace1205-plans`, 'plans-hero', { metadata: true, foundation: 'c2' }),
};
