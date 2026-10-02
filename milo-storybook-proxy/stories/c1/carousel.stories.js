import { expect, waitFor } from 'storybook/test';
import { LIBRARY, renderLibraryExample, waitForMilo } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/carousel';
import variants from 'virtual:variants/c1/carousel';

// Moves to the next slide.
async function moveToNextSlide(context) {
  await waitForMilo(context);
  await expect(context.canvasElement.querySelector('main').dataset.miloStatus).toBe('loaded');
  const active = () => context.canvasElement.querySelector('.carousel-slide.active');
  const first = active();
  await context.userEvent.click(context.canvas.getAllByRole('button', { name: 'Next slide' })[0]);
  await waitFor(() => expect(active()).not.toBe(first));
}

export default {
  title: 'C1/Carousel',
  parameters: { cssprops },
  argTypes: { variants },
  play: moveToNextSlide,
};

const library = `${LIBRARY}/carousel`;

export const MWeb = {
  name: 'mWeb',
  render: () => renderLibraryExample(library, 0),
  // Above mobile width this carousel shows every slide side by side and hides its buttons, so it
  // moves to the next slide only in a canvas narrow enough to show them.
  play: async (context) => {
    await waitForMilo(context);
    if (context.canvas.queryAllByRole('button', { name: 'Next slide' }).length) await moveToNextSlide(context);
  },
};

export const Container = {
  render: () => renderLibraryExample(library, 1),
};

export const WithLightbox = {
  name: 'With lightbox',
  render: () => renderLibraryExample(library, 2),
};

export const HintingCenterMobileShow3AlignHeight = {
  name: 'Hinting center mobile + show 3 + align height',
  render: () => renderLibraryExample(library, 3),
};

export const HintingMobileTallVideo = {
  name: 'Hinting mobile + Tall video',
  render: () => renderLibraryExample(library, 4),
};

export const Show4Container = {
  name: 'Show-4, container',
  render: () => renderLibraryExample(library, 5),
};
