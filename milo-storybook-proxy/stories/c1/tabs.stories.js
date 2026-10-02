import { expect } from 'storybook/test';
import { LIBRARY, renderLibraryExample, waitForMilo } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/tabs';
import variants from 'virtual:variants/c1/tabs';

export default {
  title: 'C1/Tabs',
  parameters: { cssprops },
  argTypes: { variants },
  // Selects the second tab. Radio tabs link to their panel with data-control-id.
  play: async (context) => {
    await waitForMilo(context);
    await expect(context.canvasElement.querySelector('main').dataset.miloStatus).toBe('loaded');
    const tab = context.canvasElement.querySelectorAll('[role="tab"], [role="radio"]')[1];
    const selected = tab.getAttribute('role') === 'radio' ? 'aria-checked' : 'aria-selected';
    await context.userEvent.click(tab);
    await expect(tab).toHaveAttribute(selected, 'true');
    const panel = document.getElementById(tab.getAttribute('aria-controls') ?? tab.dataset.controlId);
    await expect(panel).toBeVisible();
  },
};

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
