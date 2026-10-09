import { MEDIA } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';
import { argTypes, bentoStory, description } from './bento.js';

const LEAD = 'Three [Explore Cards](?path=/docs/blocks-explore-card--docs) side by side from 768px, each spanning 4 of the 12 columns.';

// An example of how the section works, whose card images follow the Theme menu.
export default {
  title: 'Sections/Bento (3 Up)',
  parameters: { cssprops, docs: { description: { component: description(LEAD) } } },
  argTypes,
};

// Three explore cards side by side from 768px. Below 768px each takes the full width.
export const Default = {
  ...bentoStory,
  args: {
    cards: [{
      heading: 'Speed up signature workflows.',
      body: 'Request e-signatures, track status, and set reminders to keep work flowing.',
      light: { src: `${MEDIA}/bento/acrobat-signatures.webp`, color: '#f6f6f6' },
      dark: { src: `${MEDIA}/bento/firefly-boards-storyboard.webp` },
    }, {
      heading: 'Go from print to digital.',
      body: 'Easily turn scanned paper docs into fully searchable and editable PDFs.',
      light: { src: `${MEDIA}/bento/acrobat-scan.webp`, color: '#f6f6f6' },
      dark: { src: `${MEDIA}/bento/premiere-edit.webp` },
    }, {
      heading: 'Protect sensitive info.',
      body: 'Add passwords and permissions, and permanently redact data in PDFs as needed.',
      light: { src: `${MEDIA}/bento/acrobat-protect.webp`, color: '#f6f6f6' },
      dark: { src: `${MEDIA}/bento/after-effects-motion.webp` },
    }],
    style: 'container, fixed',
    layout: 'bento',
    masonry: 'span 4, span 4, span 4',
  },
};
