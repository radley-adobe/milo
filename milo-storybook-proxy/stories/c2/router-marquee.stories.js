import { HOMEPAGE, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/router-marquee';

export default { title: 'C2/Router Marquee', parameters: { cssprops } };

export const Homepage = {
  name: 'adobe.com: Homepage',
  render: () => renderPageBlock(HOMEPAGE, 'router-marquee', { foundation: 'c2' }),
};
