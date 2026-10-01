import { HOMEPAGE_FRAGMENTS, renderPage } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/carousel-c2';

export default { title: 'C2/Carousel C2', parameters: { cssprops } };

export const HomepageCustomerTestimonials = {
  name: 'adobe.com: Homepage customer testimonials',
  render: () => renderPage(`${HOMEPAGE_FRAGMENTS}/customer-testimonials/customer-testimonials`, { foundation: 'c2' }),
};
