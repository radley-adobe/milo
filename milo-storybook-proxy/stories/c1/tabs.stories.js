import { LIBRARY, renderLibraryExample } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/tabs';

export default { title: 'C1/Tabs', parameters: { cssprops } };

const library = `${LIBRARY}/tabs`;

export const Default = {
  render: () => renderLibraryExample(library, 0),
};

export const Quiet = {
  render: () => renderLibraryExample(library, 1),
};

export const MWebSegmentedControl = {
  name: 'mWeb segmented control',
  render: () => renderLibraryExample(library, 2),
};

export const QuietWNoBottomBorder = {
  name: 'Quiet, w/ no-bottom-border',
  render: () => renderLibraryExample(library, 3),
};

export const QuietWNoBorderXlSpacing = {
  name: 'Quiet w/ no-border, xl-spacing',
  render: () => renderLibraryExample(library, 4),
};

export const SameWidthButton = {
  name: 'Same-width button',
  render: () => renderLibraryExample(library, 5),
};

export const RadioCenter = {
  name: 'Radio, center',
  render: () => renderLibraryExample(library, 6),
};

export const Badge = {
  render: () => renderLibraryExample(library, 7),
};
