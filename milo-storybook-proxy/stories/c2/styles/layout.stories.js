import { renderStyles } from '../../../src/milo.js';
import './demo.css';

// The examples on the Layout Docs page. Hidden from the sidebar.
export default {
  title: 'Foundations/Examples/Layout',
  tags: ['!dev', '!autodocs'],
  parameters: { layout: 'fullscreen' },
};

const boxes = (count) => Array.from({ length: count }, (_, i) => `<div class="demo-box">${i + 1}</div>`).join('');

export const Containers = {
  render: () => renderStyles(['container', 'container fluid', 'container fixed'].map((classes) => `
    <div class="section">
      <div class="${classes}">
        <p class="demo-tag">.${classes.replace(' ', '.')}</p>
        <div class="demo-box">Content</div>
      </div>
    </div>`).join('')),
  parameters: { docs: { story: { iframeHeight: '320px' } } },
};

export const ColumnGrids = {
  render: () => renderStyles(`
    <div class="section">
      <div class="container">
        ${[['two-up', 2], ['three-up', 3], ['four-up', 4], ['six-up', 6], ['two-up fill-last-row', 3]].map(([classes, count]) => `
          <p class="demo-tag">.${classes.replace(' ', '.')}</p>
          <div class="${classes}">${boxes(count)}</div>`).join('')}
      </div>
    </div>`),
  parameters: { docs: { story: { iframeHeight: '600px' } } },
};
