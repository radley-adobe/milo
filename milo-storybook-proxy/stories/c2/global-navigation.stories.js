import { FEDERAL, LIVE, renderGlobalNavigation } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/global-navigation';

// No Variants control: the classes the block's CSS lists are ones Milo sets itself. The Docs
// iframes leave room for an open menu.
export default {
  title: 'Navigation/Global Navigation',
  parameters: { cssprops, liveExamples: [LIVE.home, LIVE.acrobat, LIVE.acrobatPlans], docs: { story: { iframeHeight: '700px' } } },
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

// The homepage navigation with a Brand Concierge Global block, which shows its prompts and input
// in the navigation when the page's gnav-brand-concierge metadata is on. The block is authored in
// the page, as on the Milo test page that added it.
export const BrandConcierge = {
  name: 'Brand Concierge',
  globals: dark,
  render: () => renderGlobalNavigation(`${FEDERAL}/site-redesign/gnav`, {
    metadata: { 'gnav-brand-concierge': 'on' },
    foundation: 'c2',
    html: `
      <div class="brand-concierge-global">
        <div>
          <div>Which apps can help me combine and retouch my photos?</div>
          <div>How can I generate and edit videos for social?</div>
          <div>How can I create and edit PDFs?</div>
          <div>What are Adobe's solutions for businesses?</div>
        </div>
        <div>
          <div>Ask a question</div>
        </div>
      </div>`,
  }),
};
