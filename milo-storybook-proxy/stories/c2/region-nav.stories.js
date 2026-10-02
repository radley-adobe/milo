import { FEDERAL, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/region-nav';
import variants from 'virtual:variants/c2/region-nav';

export default { title: 'Region Nav', parameters: { cssprops }, argTypes: { variants } };

// The global footer's Change region link opens this fragment in a modal.
export const ChangeRegion = {
  name: 'adobe.com: Change region',
  render: () => renderPageBlock(`${FEDERAL}/footer/fragments/regions`, 'region-nav', { foundation: 'c2' }),
};
