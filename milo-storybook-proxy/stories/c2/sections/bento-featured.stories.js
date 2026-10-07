import { ACROBAT, CC_PRO_TEST_FRAGMENTS } from '../../../src/milo.js';
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
    light: { src: `${ACROBAT}/media_1747f3a8b09a282397e15122e6c8708a8db7fd65c.png` },
    dark: { src: `${CC_PRO_TEST_FRAGMENTS}/media_11165b31fa22b7a1326324cad08d01647f0dc626f.png` },
  }], { masonry: 'full width' }),
};
