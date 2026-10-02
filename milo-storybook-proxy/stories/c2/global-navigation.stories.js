import { FEDERAL, renderGlobalNavigation } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/global-navigation';

// No Variants control: the classes the block's CSS lists are ones Milo sets itself. The Docs
// iframes leave room for an open menu.
export default {
  title: 'Global Navigation',
  parameters: { cssprops, docs: { story: { iframeHeight: '700px' } } },
};

// Without gnav-dark-font metadata, the navigation has light text for the dark top of its page.
const dark = { backgrounds: { value: 'dark' } };

export const Homepage = {
  name: 'adobe.com: Homepage',
  globals: dark,
  render: () => renderGlobalNavigation(`${FEDERAL}/site-redesign/gnav`, { foundation: 'c2' }),
};

export const CreativeCloudPro = {
  name: 'adobe.com: Creative Cloud Pro',
  globals: dark,
  render: () => renderGlobalNavigation(`${FEDERAL}/site-redesign/localnav-creativecloud`, { foundation: 'c2' }),
};

export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderGlobalNavigation('https://main--da-dc--adobecom.aem.live/dc-shared/navigation/c2/globalnav/localnav-acrobat', {
    metadata: { 'gnav-dark-font': 'true' },
    foundation: 'c2',
  }),
};
