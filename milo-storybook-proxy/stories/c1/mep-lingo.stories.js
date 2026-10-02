import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import marquee from 'virtual:cssprops/c1/marquee';
import marqueeVariants from 'virtual:variants/c1/marquee';
import text from 'virtual:cssprops/c1/text';
import textVariants from 'virtual:variants/c1/text';

export default { title: 'C1/MEP Lingo' };

const library = `${LIBRARY}/mep-lingo`;

export const Inline = {
  parameters: { cssprops: marquee },
  argTypes: { variants: marqueeVariants },
  render: () => renderPageBlock(library, 'marquee'),
};

export const Block = {
  render: () => renderPageBlock(library, 'mep-lingo'),
};

export const Row = {
  parameters: { cssprops: text },
  argTypes: { variants: textVariants },
  render: () => renderPageBlock(library, 'text'),
};
