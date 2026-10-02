import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/timeline';
import variants from 'virtual:variants/c1/timeline';

export default { title: 'C1/Timeline', parameters: { cssprops }, argTypes: { variants } };

const library = `${LIBRARY}/timeline`;

export const SegmentTimeline84 = {
  name: 'Segment timeline 8-4',
  render: () => renderPageBlock(library, 'timeline'),
};
