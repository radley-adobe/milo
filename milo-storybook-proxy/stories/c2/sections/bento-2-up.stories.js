import { ACROBAT, CC_PRO_TEST_FRAGMENTS } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';
import { bentoStory } from './bento.js';

// An example of how the section works, whose card images follow the Theme menu. It has no
// controls or Docs page.
export default {
  title: 'Sections/Bento (2 Up)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// Two explore cards side by side from 768px. Below 768px each takes the full width.
export const Bento2Up = {
  name: 'Bento (2 Up)',
  ...bentoStory([{
    heading: 'Partner with AI to understand your PDFs better.',
    body: 'Use an AI Assistant to analyze your documents, giving you reliable answers and summaries with verifiable citations, all within Acrobat.',
    light: { src: `${ACROBAT}/media_1ea05225076304f2337a1a9e5fa7088661ddbbb4a.png`, color: '#f6f6f6' },
    dark: { src: `${CC_PRO_TEST_FRAGMENTS}/media_16b14f19c4155e82a47519d75eb6fda4a6414ac0f.jpg` },
  }, {
    heading: 'Rely on trusted technology.',
    body: 'Work with confidence in the trusted and secure Acrobat platform, with its responsible AI practices and accountability.',
    light: { src: `${ACROBAT}/media_1d0a484dbdd56eaea38ae5ce93a0845ee61d1486e.png`, color: '#f6f6f6' },
    dark: { src: `${CC_PRO_TEST_FRAGMENTS}/media_1700c7de83af64b4072f3288bb62c7c2851bb2f3e.png` },
  }], { masonry: 'span 6, span 6' }),
};
