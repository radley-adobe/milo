import { expect } from 'storybook/test';
import { LIBRARY, renderPageBlock, waitForMilo } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/accordion';
import variants from 'virtual:variants/c1/accordion';

export default {
  title: 'C1/Accordion',
  parameters: { cssprops },
  argTypes: { variants },
  // Opens the first closed item.
  play: async (context) => {
    await waitForMilo(context);
    await expect(context.canvasElement.querySelector('main').dataset.miloStatus).toBe('loaded');
    const trigger = context.canvasElement.querySelector('.accordion-trigger[aria-expanded="false"]');
    await context.userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(document.getElementById(trigger.getAttribute('aria-controls'))).toBeVisible();
  },
};

const library = `${LIBRARY}/accordion`;

export const Default = {
  render: () => renderPageBlock(library, 'accordion'),
};

export const Seo = {
  name: 'SEO',
  render: () => renderPageBlock(library, 'accordion', { index: 1 }),
};

export const ExpandAll = {
  name: '12 col with expand/collapse all',
  render: () => renderPageBlock(library, 'accordion', { index: 2 }),
};

export const RichMedia = {
  name: 'Rich media',
  render: () => renderPageBlock(library, 'accordion', { index: 3 }),
};

export const PhotoshopFaq = {
  name: 'adobe.com: Photoshop FAQ',
  render: () => renderPageBlock('https://main--cc--adobecom.aem.live/cc-shared/fragments/products/photoshop/photoshop-faq', 'accordion'),
};
