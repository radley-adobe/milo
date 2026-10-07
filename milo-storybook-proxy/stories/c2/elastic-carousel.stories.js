import { HOMEPAGE_FRAGMENTS, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/elastic-carousel';
import variants from 'virtual:variants/c2/elastic-carousel';

export default { title: 'Blocks/Elastic Carousel', parameters: { cssprops }, argTypes: { variants } };

export const HomepageEverythingYouNeed = {
  name: 'adobe.com: Homepage everything you need',
  render: () => renderPageBlock(`${HOMEPAGE_FRAGMENTS}/everything-you-need/everything-you-need`, 'elastic-carousel', { foundation: 'c2' }),
};
