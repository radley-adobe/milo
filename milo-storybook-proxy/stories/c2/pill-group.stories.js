import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/pill-group';
import variants from 'virtual:variants/c2/pill-group';

const library = `${LIBRARY}/c2/pill-group`;

export default { title: 'Blocks/Pill Group', parameters: { cssprops }, argTypes: { variants } };

export const HeadingWithSixPills = {
  name: 'Heading with six pills',
  render: () => renderPageBlock(library, 'pill-group', { index: 0, metadata: true, foundation: 'c2' }),
};

export const PillsWithoutAHeading = {
  name: 'Pills without a heading',
  render: () => renderPageBlock(library, 'pill-group', { index: 1, metadata: true, foundation: 'c2' }),
};

export const DifferentPillsByDevice = {
  name: 'Different pills by device',
  render: () => renderPageBlock(library, 'pill-group', { index: 2, metadata: true, foundation: 'c2' }),
};
