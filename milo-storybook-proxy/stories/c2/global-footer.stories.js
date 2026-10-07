import { FEDERAL, LIVE, renderGlobalFooter } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/global-footer';

// No Variants control: the class the block's CSS lists is one Milo sets itself.
export default { title: 'Navigation/Global Footer', parameters: { cssprops, liveExamples: [LIVE.home, LIVE.acrobat] } };

export const Homepage = {
  name: 'adobe.com: Homepage',
  render: () => renderGlobalFooter(`${FEDERAL}/site-redesign/footer/footer`, { foundation: 'c2' }),
};

export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderGlobalFooter('https://main--da-dc--adobecom.aem.live/dc-shared/navigation/footer/footer', { foundation: 'c2' }),
};
