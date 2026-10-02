import { expect, waitFor } from 'storybook/test';
import { HOMEPAGE_FRAGMENTS, renderPage, waitForMilo } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/carousel-c2';
import variants from 'virtual:variants/c2/carousel-c2';

export default {
  title: 'C2/Carousel C2',
  parameters: { cssprops },
  argTypes: { variants },
  // Moves to the next slide. The carousel clones slides at each end, so this follows the slide
  // indicators instead.
  play: async (context) => {
    await waitForMilo(context);
    await expect(context.canvasElement.querySelector('main').dataset.miloStatus).toBe('loaded');
    const active = () => context.canvasElement.querySelector('.slide-indicator.active');
    const first = active();
    await context.userEvent.click(context.canvas.getByRole('button', { name: 'Next slide' }));
    await waitFor(() => expect(active()).not.toBe(first));
  },
};

export const HomepageCustomerTestimonials = {
  name: 'adobe.com: Homepage customer testimonials',
  render: () => renderPage(`${HOMEPAGE_FRAGMENTS}/customer-testimonials/customer-testimonials`, { foundation: 'c2' }),
};
