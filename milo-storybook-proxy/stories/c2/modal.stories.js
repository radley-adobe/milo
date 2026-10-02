import { expect, waitFor } from 'storybook/test';
import { FEDERAL, renderBlock, waitForMilo } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/modal';
import variants from 'virtual:variants/c2/modal';

export default {
  title: 'Modal',
  parameters: { cssprops },
  argTypes: { variants },
  // Opens the modal. Milo adds it to the end of the page's body.
  play: async (context) => {
    await waitForMilo(context);
    await expect(context.canvasElement.querySelector('main').dataset.miloStatus).toBe('loaded');
    await context.userEvent.click(context.canvas.getByRole('link', { name: 'Change region' }));
    await waitFor(() => expect(document.querySelector('.dialog-modal .region-nav')).toBeVisible(), { timeout: 10000 });
  },
};

// A link to a fragment with a hash opens the fragment in a modal. The global footer's Change
// region link opens the region list.
export const ChangeRegion = {
  name: 'adobe.com: Change region',
  render: () => renderBlock(`<p><a href="${FEDERAL}/footer/fragments/regions#langnav">Change region</a></p>`, { foundation: 'c2' }),
};
