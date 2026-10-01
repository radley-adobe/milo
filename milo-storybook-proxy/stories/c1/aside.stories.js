import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/aside';

export default { title: 'C1/Aside', parameters: { cssprops } };

const library = `${LIBRARY}/aside`;

export const Small = {
  render: () => renderPageBlock(library, 'aside'),
};

export const Medium = {
  render: () => renderPageBlock(library, 'aside', { index: 1 }),
};

export const Large = {
  render: () => renderPageBlock(library, 'aside', { index: 2 }),
};

export const LargeWMWeb = {
  name: 'Large w/ mWeb',
  render: () => renderPageBlock(library, 'aside', { index: 3 }),
};

export const SmallSplitOneThird = {
  name: 'Small split one-third',
  render: () => renderPageBlock(library, 'aside', { index: 4 }),
};

export const SmallSplit = {
  name: 'Small split',
  render: () => renderPageBlock(library, 'aside', { index: 5 }),
};

export const MediumSplitOneThird = {
  name: 'Medium split one-third',
  render: () => renderPageBlock(library, 'aside', { index: 6 }),
};

export const MediumSplit = {
  name: 'Medium split',
  render: () => renderPageBlock(library, 'aside', { index: 7 }),
};

export const LargeSplitOneThird = {
  name: 'Large split one-third',
  render: () => renderPageBlock(library, 'aside', { index: 8 }),
};

export const LargeSplit = {
  name: 'Large split',
  render: () => renderPageBlock(library, 'aside', { index: 9 }),
};

export const MediumSplitWithBio = {
  name: 'Medium split with bio',
  render: () => renderPageBlock(library, 'aside', { index: 10 }),
};

export const Inline = {
  render: () => renderPageBlock(library, 'aside', { index: 11 }),
};

export const SmallCenter = {
  name: 'Small center',
  render: () => renderPageBlock(library, 'aside', { index: 12 }),
};

export const MediumCenter = {
  name: 'Medium center',
  render: () => renderPageBlock(library, 'aside', { index: 13 }),
};

export const LargeCenter = {
  name: 'Large center',
  render: () => renderPageBlock(library, 'aside', { index: 14 }),
};
