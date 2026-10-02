import { ACROBAT, CC_PRO_TEST_FRAGMENTS, renderPageSections } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/tabs';
import variants from 'virtual:variants/c2/tabs';

export default { title: 'Tabs', parameters: { cssprops }, argTypes: { variants } };

// The tabs and their panels, which are the sections after them. Each panel of the first tabs
// holds a second tabs block and its panels.
export const AcrobatPlans = {
  name: 'adobe.com: Acrobat plans',
  render: () => renderPageSections(`${ACROBAT}/plans`, 'tabs', { count: 11, foundation: 'c2' }),
};

export const CreativeCloudProProduct = {
  name: 'adobe.com: Creative Cloud Pro product',
  render: () => renderPageSections(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'tabs', { count: 4, foundation: 'c2' }),
};
