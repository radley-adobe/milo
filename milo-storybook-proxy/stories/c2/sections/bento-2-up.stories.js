import { MEDIA } from '../../../src/milo.js';
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
    light: { src: `${MEDIA}/bento/acrobat-ai-assistant.webp`, color: '#f6f6f6' },
    dark: { src: `${MEDIA}/bento/indesign-layouts.webp` },
  }, {
    heading: 'Rely on trusted technology.',
    body: 'Work with confidence in the trusted and secure Acrobat platform, with its responsible AI practices and accountability.',
    light: { src: `${MEDIA}/bento/acrobat-trusted-technology.webp`, color: '#f6f6f6' },
    dark: { src: `${MEDIA}/bento/express-brand-assets.webp` },
  }], { masonry: 'span 6, span 6' }),
};
