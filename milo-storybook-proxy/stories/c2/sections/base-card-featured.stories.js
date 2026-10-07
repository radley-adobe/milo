import { LIBRARY, renderPageBlock } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/base-card';

const library = `${LIBRARY}/c2/base-card`;

// Renders the library page as published, so it has no controls or Docs page.
export default {
  title: 'Sections/Base Card (Featured)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// The featured card with its section's metadata, which sets the section's container width,
// spacing, background and parallax.
export const BaseCardFeatured = {
  name: 'Base Card (Featured)',
  render: () => renderPageBlock(library, 'base-card', { metadata: true, foundation: 'c2' }),
};
