import { expect, waitFor } from 'storybook/test';
import { renderBlock, waitForMilo } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/modal';
import variants from 'virtual:variants/c2/modal';

// Storybook serves fragments/ next to its pages, so this path works on localhost and under a
// hosted subpath. Milo loads a fragment from the page's own site. The fragment holds a Tour
// block with placeholder content, as C2 modal fragments do.
const fragment = new URL('fragments/modal', window.location.href).pathname;

export default {
  title: 'Components/Modal',
  parameters: { cssprops },
  argTypes: { variants },
  // Opens the modal. Milo adds it to the end of the page's body.
  play: async (context) => {
    await waitForMilo(context);
    await expect(context.canvasElement.querySelector('main').dataset.miloStatus).toBe('loaded');
    await context.userEvent.click(context.canvas.getByRole('link', { name: 'Open modal' }));
    await waitFor(() => expect(document.querySelector('.dialog-modal#example .tour')).toBeVisible(), { timeout: 10000 });
  },
};

// A link to a fragment with a hash opens the fragment in a modal, with the hash as its id.
export const Default = {
  render: () => renderBlock(`<p><a href="${fragment}#example">Open modal</a></p>`, { foundation: 'c2' }),
};
