import { HOMEPAGE, renderPageBlock } from '../../src/milo.js';

export default { title: 'C2/Router Marquee' };

export const Homepage = {
  name: 'adobe.com: Homepage',
  render: () => renderPageBlock(HOMEPAGE, 'router-marquee', { foundation: 'c2' }),
};
