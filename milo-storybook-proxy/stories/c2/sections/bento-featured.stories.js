import { MEDIA } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';
import { argTypes, bentoStory, description } from './bento.js';

const LEAD = 'One [Explore Card](?path=/docs/blocks-explore-card--docs) across the full width.';

// An example of how the section works, whose card images follow the Theme menu.
export default {
  title: 'Sections/Bento (Featured)',
  parameters: { cssprops, docs: { description: { component: description(LEAD) } } },
  argTypes,
};

// One full-width explore card.
export const Default = {
  ...bentoStory,
  args: {
    cards: [{
      heading: 'Analyze documents in a single workspace.',
      body: 'Pull multiple documents into a PDF Space, then turn them into audio experiences, interactive visuals, polished presentations, and more.',
      light: { src: `${MEDIA}/bento/acrobat-pdf-space-workspace.webp` },
      dark: { src: `${MEDIA}/bento/photoshop-comps.webp` },
    }],
    style: 'container, fixed',
    layout: 'bento',
    masonry: 'full width',
  },
};
