import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/pill-group';
import variants from 'virtual:variants/c2/pill-group';

export default { title: 'Blocks/Pill Group', parameters: { cssprops }, argTypes: { variants } };

const library = `${LIBRARY}/c2/pill-group`;

export const HeadingWithSixPills = {
  render: () => renderPageBlock(library, 'pill-group', { index: 0, foundation: 'c2' }),
};

export const PillsWithoutAHeading = {
  render: () => renderPageBlock(library, 'pill-group', { index: 1, foundation: 'c2' }),
};

export const DifferentPillsByDevice = {
  render: () => renderPageBlock(library, 'pill-group', { index: 2, foundation: 'c2' }),
};
