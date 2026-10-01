import { HOMEPAGE_FRAGMENTS, renderPageBlock } from '../../src/milo.js';

export default { title: 'C2/Elastic Carousel' };

export const HomepageEverythingYouNeed = {
  name: 'adobe.com: Homepage everything you need',
  render: () => renderPageBlock(`${HOMEPAGE_FRAGMENTS}/everything-you-need/everything-you-need`, 'elastic-carousel', { foundation: 'c2' }),
};
