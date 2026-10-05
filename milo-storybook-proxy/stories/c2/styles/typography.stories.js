import { renderStyles } from '../../../src/milo.js';

// The samples on the Typography Docs pages, one per text class in Milo's
// libs/c2/styles/styles.css, named after the class in PascalCase. Hidden from the sidebar.
export default { title: 'Foundations/Examples/Typography', tags: ['!dev', '!autodocs'] };

const SHORT = 'The quick brown fox';
const LONG = 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. '
  + 'How vexingly quick daft zebras jump. Sphinx of black quartz, judge my vow.';

// `className` on a `tag` element, in a frame `height` pixels high on the Docs page.
const sample = (className, tag, text, height) => ({
  name: className,
  render: () => renderStyles(`<div class="section"><${tag} class="${className}">${text}</${tag}></div>`),
  parameters: { docs: { story: { iframeHeight: `${height}px` } } },
});

export const HeadingSuper = sample('heading-super', 'h1', SHORT, 160);
export const Heading1 = sample('heading-1', 'h1', SHORT, 140);
export const Heading2 = sample('heading-2', 'h2', SHORT, 120);
export const Heading3 = sample('heading-3', 'h3', SHORT, 100);
export const Heading4 = sample('heading-4', 'h4', SHORT, 80);
export const Heading5 = sample('heading-5', 'h5', SHORT, 80);
export const Heading6 = sample('heading-6', 'h6', SHORT, 80);
export const BodyLg = sample('body-lg', 'p', LONG, 140);
export const BodyMd = sample('body-md', 'p', LONG, 120);
export const BodySm = sample('body-sm', 'p', LONG, 120);
export const Eyebrow = sample('eyebrow', 'p', SHORT, 64);
export const Label = sample('label', 'p', SHORT, 64);
export const Caption = sample('caption', 'p', SHORT, 64);
