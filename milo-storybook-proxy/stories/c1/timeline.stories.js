import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Timeline' };

const library = `${LIBRARY}/timeline`;

export const SegmentTimeline84 = {
  name: 'Segment timeline 8-4',
  render: () => renderPageBlock(library, 'timeline'),
};
