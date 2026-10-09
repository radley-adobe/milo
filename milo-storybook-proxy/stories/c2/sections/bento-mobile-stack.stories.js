import { MEDIA } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';
import { argTypes, bentoStory, description } from './bento.js';

const LEAD = 'Two [Explore Cards](?path=/docs/blocks-explore-card--docs) side by side above a full-width one. Below 768px, the cards stack on top of each other as the page scrolls.';

// An example of how the section works, whose card images follow the Theme menu.
export default {
  title: 'Sections/Bento (Mobile Stack)',
  parameters: { cssprops, docs: { description: { component: description(LEAD) } } },
  argTypes,
};

// From 768px, two explore cards side by side with a full-width card under them. The layout is
// bento and stack-mobile, so below 768px the cards stack as the page scrolls, in browsers with
// CSS scroll-driven animations.
export const Default = {
  ...bentoStory,
  args: {
    cards: [{
      heading: 'Get to a shared understanding.',
      body: 'Create a PDF Space for your team or clients, where everyone can analyze docs on their own, share insights, and iterate together.',
      light: { src: `${MEDIA}/bento/acrobat-shared-understanding.webp`, color: '#f6f6f6' },
      dark: { src: `${MEDIA}/bento/firefly-boards-shoot.webp` },
    }, {
      heading: 'Use an AI that gets it.',
      body: 'Work more effectively with AI that understands your business and has been personalized to your priorities.',
      light: { src: `${MEDIA}/bento/acrobat-personalized-ai.webp`, color: '#f6f6f6' },
      dark: { src: `${MEDIA}/bento/lightroom-edit.webp` },
    }, {
      heading: 'Analyze documents in a single workspace.',
      body: 'Pull multiple documents into a PDF Space, then turn them into audio experiences, interactive visuals, polished presentations, and more.',
      light: { src: `${MEDIA}/bento/acrobat-pdf-space-workspace.webp` },
      dark: { src: `${MEDIA}/bento/photoshop-remix.webp` },
    }],
    style: 'container, fixed',
    layout: 'bento, stack-mobile',
    masonry: 'span 6, span 6\nfull width',
  },
};
