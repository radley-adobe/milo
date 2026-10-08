import { MEDIA } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';
import { argTypes, bentoStory, description } from './bento.js';

const LEAD = 'Two [Explore Cards](?path=/docs/blocks-explore-card--docs) side by side from 768px, each spanning 6 of the 12 columns.';

// An example of how the section works, whose card images follow the Theme menu.
export default {
  title: 'Sections/Bento (2 Up)',
  parameters: { cssprops, docs: { description: { component: description(LEAD) } } },
  argTypes,
};

// Two explore cards side by side from 768px. Below 768px each takes the full width.
export const Default = {
  ...bentoStory,
  args: {
    cards: [{
      heading: 'Partner with AI to understand your PDFs better.',
      body: 'Use an AI Assistant to analyze your documents, giving you reliable answers and summaries with verifiable citations, all within Acrobat.',
      light: { src: `${MEDIA}/bento/acrobat-ai-assistant.webp`, color: '#f6f6f6' },
      dark: { src: `${MEDIA}/bento/indesign-layouts.webp` },
    }, {
      heading: 'Rely on trusted technology.',
      body: 'Work with confidence in the trusted and secure Acrobat platform, with its responsible AI practices and accountability.',
      light: { src: `${MEDIA}/bento/acrobat-trusted-technology.webp`, color: '#f6f6f6' },
      dark: { src: `${MEDIA}/bento/express-brand-assets.webp` },
    }],
    style: 'container, fixed',
    layout: 'bento',
    masonry: 'span 6, span 6',
  },
};
