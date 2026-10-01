import { HOMEPAGE_FRAGMENTS, renderPage } from '../../src/milo.js';

export default { title: 'C2/Carousel C2' };

export const HomepageCustomerTestimonials = {
  name: 'adobe.com: Homepage customer testimonials',
  render: () => renderPage(`${HOMEPAGE_FRAGMENTS}/customer-testimonials/customer-testimonials`, { foundation: 'c2' }),
};
