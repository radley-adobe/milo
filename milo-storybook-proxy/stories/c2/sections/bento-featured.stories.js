import { MEDIA } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';
import { bentoStory } from './bento.js';

// An example of how the section works, whose card images follow the Theme menu. It has no
// controls or Docs page.
export default {
  title: 'Sections/Bento (Featured)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// One full-width explore card.
export const BentoFeatured = {
  name: 'Bento (Featured)',
  ...bentoStory([{
    heading: 'Analyze documents in a single workspace.',
    body: 'Pull multiple documents into a PDF Space, then turn them into audio experiences, interactive visuals, polished presentations, and more.',
    light: { src: `${MEDIA}/bento/acrobat-pdf-space-workspace.webp` },
    dark: { src: `${MEDIA}/bento/photoshop-comps.webp` },
  }], { masonry: 'full width' }),
};
