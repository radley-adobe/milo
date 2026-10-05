import { sectionSpacing } from 'virtual:foundations';
import { renderStyles } from '../../../src/milo.js';
import './demo.css';

// The examples on the Section Spacing Docs page: one section per size in Milo's
// libs/c2/styles/styles.css, with its padding shaded. Hidden from the sidebar.
export default {
  title: 'Foundations/Examples/Section Spacing',
  tags: ['!dev', '!autodocs'],
  parameters: { layout: 'fullscreen', docs: { story: { iframeHeight: '600px' } } },
};

const sections = (kind, suffix) => sectionSpacing.filter((s) => s[kind]).map(({ size }) => `
  <div class="section spacing-${size}${suffix} demo-pad">
    <div class="container"><div class="demo-box">spacing-${size}${suffix}</div></div>
  </div>`).join('');

export const Scaled = { render: () => renderStyles(sections('scaled', '')) };

export const Static = { render: () => renderStyles(sections('static', '-static')) };
