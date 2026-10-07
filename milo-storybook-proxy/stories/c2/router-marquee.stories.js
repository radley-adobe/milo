import { HOMEPAGE, LIVE, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/router-marquee';
import variants from 'virtual:variants/c2/router-marquee';

export default { title: 'Blocks/Router Marquee', parameters: { cssprops, liveExamples: [LIVE.home] }, argTypes: { variants } };

export const Homepage = {
  name: 'adobe.com: Homepage',
  render: () => renderPageBlock(HOMEPAGE, 'router-marquee', { foundation: 'c2' }),
};
