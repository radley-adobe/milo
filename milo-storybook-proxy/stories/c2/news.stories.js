import { HOMEPAGE_FRAGMENTS, renderPage } from '../../src/milo.js';

export default { title: 'C2/News' };

export const HomepageNews = {
  name: 'adobe.com: Homepage news',
  render: () => renderPage(`${HOMEPAGE_FRAGMENTS}/news/news`, { foundation: 'c2' }),
};
