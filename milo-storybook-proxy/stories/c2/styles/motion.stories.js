import { LIBS, renderStyles } from '../../../src/milo.js';
import './demo.css';

// The examples on the Motion Docs page, each tall enough to scroll inside its frame. Hidden from
// the sidebar.
export default {
  title: 'Foundations/Examples/Motion',
  tags: ['!dev', '!autodocs'],
  parameters: { layout: 'fullscreen' },
};

const GAP = '<div class="demo-gap"><p class="demo-tag">Scroll down</p></div>';
const boxes = (count) => Array.from({ length: count }, (_, i) => `<div class="demo-box demo-tall">${i + 1}</div>`).join('');

// A gradient with a grid of lines, so a scaled section background shows its movement.
const BACKGROUND = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" x2="1" y2="1"><stop offset="0" stop-color="#1d3ecf"/><stop offset="1" stop-color="#d73220"/></linearGradient>
    <pattern id="p" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width=".5"/></pattern>
  </defs>
  <rect width="160" height="90" fill="url(#g)"/><rect width="160" height="90" fill="url(#p)"/>
</svg>`)}`;

export const ElementEffects = {
  render: () => renderStyles(`
    <div class="section">
      <div class="container">
        ${GAP}
        ${['parallax-move-up', 'parallax-scale-up', 'parallax-scale-down', 'parallax-blur', 'parallax-opacity',
    'parallax-move-up parallax-opacity'].map((classes) => `
          <p class="demo-tag">${classes}</p>
          <div class="demo-box demo-tall ${classes}"></div>
          <div class="demo-gap"></div>`).join('')}
      </div>
    </div>`),
};

export const Stagger = {
  render: () => renderStyles(`
    <div class="section">
      <div class="container">
        ${GAP}
        ${['parallax-stagger-ltr', 'parallax-stagger-rtl'].map((effect) => `
          <p class="demo-tag">three-up ${effect}</p>
          <div class="three-up ${effect}">${boxes(6)}</div>
          <div class="demo-gap"></div>`).join('')}
      </div>
    </div>`),
};

export const GridScaleDown = {
  render: () => renderStyles(`
    <div class="section"><div class="container">${GAP}</div></div>
    <div class="section">
      <div class="container parallax-scale-down-grid">
        <div class="demo-box demo-tall">container parallax-scale-down-grid</div>
      </div>
    </div>
    <div class="section"><div class="demo-gap"></div></div>`),
};

export const MoveUpFast = {
  render: () => renderStyles(`
    <div class="section dark parallax-move-up-fast demo-screen">
      <div class="container">
        <p class="heading-2">section parallax-move-up-fast</p>
        <p class="demo-tag">Scroll down</p>
      </div>
    </div>
    <div class="section demo-opaque demo-screen"><div class="container"><p class="heading-2">Next section</p></div></div>
    <div class="section demo-opaque demo-screen"></div>`),
};

// The section background is positioned by the section metadata block's CSS, as on a page.
export const GarageDoorReveal = {
  render: () => renderStyles(`
    <link rel="stylesheet" href="${LIBS}/c2/blocks/section-metadata/section-metadata.css">
    <div class="section demo-opaque demo-screen"><div class="container"><p class="demo-tag">Scroll down</p></div></div>
    <div class="section dark parallax-garage-door-reveal demo-screen">
      <div class="section-background"><img alt="" src="${BACKGROUND}"></div>
      <div class="foreground container">
        <p class="heading-2">section parallax-garage-door-reveal</p>
        <p class="body-lg">The section slides down into place as it scrolls in. Its background image scales up and its content rises.</p>
      </div>
    </div>
    <div class="section demo-opaque demo-screen"></div>`),
};

export const DoubleGarageDoor = {
  render: () => renderStyles(`
    <div class="section demo-opaque demo-screen"><div class="container"><p class="demo-tag">Scroll down</p></div></div>
    <div class="section dark parallax-double-garage-door demo-screen">
      <div class="container"><p class="heading-2">section parallax-double-garage-door</p></div>
    </div>
    <div class="section demo-opaque demo-screen"></div>`),
};
