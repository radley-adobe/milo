import { ACROBAT_TEST_FRAGMENTS, CC_PRO_TEST_FRAGMENTS } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';
import { bentoStory } from './bento.js';

// An example of how the section works, whose card images follow the Theme menu. It has no
// controls or Docs page.
export default {
  title: 'Sections/Bento (3 Up)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// Three explore cards side by side from 768px. Below 768px each takes the full width.
export const Bento3Up = {
  name: 'Bento (3 Up)',
  ...bentoStory([{
    heading: 'Speed up signature workflows.',
    body: 'Request e-signatures, track status, and set reminders to keep work flowing.',
    light: { src: `${ACROBAT_TEST_FRAGMENTS}/media_1c10ab721db2cd13b6b7ab86c5da3c8472c5886d2.png`, color: '#f6f6f6' },
    dark: { src: `${CC_PRO_TEST_FRAGMENTS}/media_1f67275fabb72d428930519f9e31848567d883c06.png` },
  }, {
    heading: 'Go from print to digital.',
    body: 'Easily turn scanned paper docs into fully searchable and editable PDFs.',
    light: { src: `${ACROBAT_TEST_FRAGMENTS}/media_1bc5f1d1f9e52caeb22a791d3fa46810201114374.png`, color: '#f6f6f6' },
    dark: { src: `${CC_PRO_TEST_FRAGMENTS}/media_15f2197568bc442ec583d7b8f57fd059762e286df.png` },
  }, {
    heading: 'Protect sensitive info.',
    body: 'Add passwords and permissions, and permanently redact data in PDFs as needed.',
    light: { src: `${ACROBAT_TEST_FRAGMENTS}/media_1b455168c16c4295b05bba97c9e52f762158fd840.png`, color: '#f6f6f6' },
    dark: { src: `${CC_PRO_TEST_FRAGMENTS}/media_1eb08f946485c0035972a5a9e9c0f5a0b657dfb85.png` },
  }], { masonry: 'span 4, span 4, span 4' }),
};
