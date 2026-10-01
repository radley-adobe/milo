import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import marquee from 'virtual:cssprops/c1/marquee';
import text from 'virtual:cssprops/c1/text';

export default { title: 'C1/MEP Lingo' };

const library = `${LIBRARY}/mep-lingo`;

export const Inline = {
  parameters: { cssprops: marquee },
  render: () => renderPageBlock(library, 'marquee'),
};

export const Block = {
  render: () => renderPageBlock(library, 'mep-lingo'),
};

export const Row = {
  parameters: { cssprops: text },
  render: () => renderPageBlock(library, 'text'),
};
