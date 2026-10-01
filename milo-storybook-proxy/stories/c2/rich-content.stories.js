import { HOMEPAGE, HOMEPAGE_FRAGMENTS, renderPageBlock } from '../../src/milo.js';

export default { title: 'C2/Rich Content' };

export const HomepageHero = {
  name: 'adobe.com: Homepage hero',
  render: () => renderPageBlock(HOMEPAGE, 'rich-content', { foundation: 'c2' }),
};

export const HomepageEverythingYouNeed = {
  name: 'adobe.com: Homepage everything you need',
  render: () => renderPageBlock(`${HOMEPAGE_FRAGMENTS}/everything-you-need/everything-you-need`, 'rich-content', { foundation: 'c2' }),
};
