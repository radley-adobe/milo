import { HOMEPAGE_FRAGMENTS, LIBRARY, renderPage, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/base-card';
import variants from 'virtual:variants/c2/base-card';

export default { title: 'Base Card', parameters: { cssprops }, argTypes: { variants } };

const library = `${LIBRARY}/c2/base-card`;

export const Featured = {
  render: () => renderPageBlock(library, 'base-card', { foundation: 'c2' }),
};

export const Default = {
  render: () => renderPageBlock(library, 'base-card', { index: 1, foundation: 'c2' }),
};

export const HomepageExploreWhatsNew = {
  name: "adobe.com: Homepage explore what's new",
  render: () => renderPage(`${HOMEPAGE_FRAGMENTS}/explore-whats-new/explore-whats-new`, { foundation: 'c2' }),
};
