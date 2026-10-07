import { ACROBAT, CC_PRO_TEST_FRAGMENTS } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';
import { bentoStory } from './bento.js';

// An example of how the section works, whose card images follow the Theme menu. It has no
// controls or Docs page.
export default {
  title: 'Sections/Bento (Mobile Stack)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// From 768px, two explore cards side by side with a full-width card under them. The layout is
// bento and stack-mobile, so below 768px the cards stack as the page scrolls, in browsers with
// CSS scroll-driven animations.
export const BentoMobileStack = {
  name: 'Bento (Mobile Stack)',
  ...bentoStory([{
    heading: 'Get to a shared understanding.',
    body: 'Create a PDF Space for your team or clients, where everyone can analyze docs on their own, share insights, and iterate together.',
    light: { src: `${ACROBAT}/media_16634711a835523086f054067bfe05a0e49a02ce6.png`, color: '#f6f6f6' },
    dark: { src: `${CC_PRO_TEST_FRAGMENTS}/media_18a2ceeffbafb54b3480cbfd63fa705a30beb3e7e.png` },
  }, {
    heading: 'Use an AI that gets it.',
    body: 'Work more effectively with AI that understands your business and has been personalized to your priorities.',
    light: { src: `${ACROBAT}/media_184dc44ceb6c96fc3723c5d1af605f4b6b6a94c11.png`, color: '#f6f6f6' },
    dark: { src: `${CC_PRO_TEST_FRAGMENTS}/media_1469200f49f03204438b17807ef9af4538ba56af9.png` },
  }, {
    heading: 'Analyze documents in a single workspace.',
    body: 'Pull multiple documents into a PDF Space, then turn them into audio experiences, interactive visuals, polished presentations, and more.',
    light: { src: `${ACROBAT}/media_1747f3a8b09a282397e15122e6c8708a8db7fd65c.png` },
    dark: { src: `${CC_PRO_TEST_FRAGMENTS}/media_1ddc7d2c700f488e21230419e9d223b37eb6fd73b.jpg` },
  }], { masonry: 'span 6, span 6\nfull width', layout: 'bento, stack-mobile' }),
};
