import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/floating-cta';
import variants from 'virtual:variants/c2/floating-cta';

const library = `${LIBRARY}/c2/floating-cta`;

export default { title: 'Blocks/Floating CTA', parameters: { cssprops }, argTypes: { variants } };

export const IconAndLabel = {
  render: () => renderPageBlock(library, 'floating-cta', { foundation: 'c2' }),
};
