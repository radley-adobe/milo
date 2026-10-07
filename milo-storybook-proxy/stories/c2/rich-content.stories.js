import { HOMEPAGE, HOMEPAGE_FRAGMENTS, LIVE, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/rich-content';
import variants from 'virtual:variants/c2/rich-content';

export default { title: 'Blocks/Rich Content', parameters: { cssprops, liveExamples: [LIVE.home, LIVE.acrobat, LIVE.pdfEssentials] }, argTypes: { variants } };

export const HomepageHero = {
  name: 'adobe.com: Homepage hero',
  render: () => renderPageBlock(HOMEPAGE, 'rich-content', { foundation: 'c2' }),
};

export const HomepageEverythingYouNeed = {
  name: 'adobe.com: Homepage everything you need',
  render: () => renderPageBlock(`${HOMEPAGE_FRAGMENTS}/everything-you-need/everything-you-need`, 'rich-content', { foundation: 'c2' }),
};
