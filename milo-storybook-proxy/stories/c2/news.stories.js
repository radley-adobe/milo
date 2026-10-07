import { HOMEPAGE_FRAGMENTS, renderPage } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/news';
import variants from 'virtual:variants/c2/news';

export default { title: 'Blocks/News', parameters: { cssprops }, argTypes: { variants } };

export const HomepageNews = {
  name: 'adobe.com: Homepage news',
  render: () => renderPage(`${HOMEPAGE_FRAGMENTS}/news/news`, { foundation: 'c2' }),
};
