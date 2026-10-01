import { renderBlock } from '../../src/milo.js';

export default { title: 'C1/Accordion' };

const items = `
  <div><div><h3>How do I compress a PDF without losing quality?</h3></div></div>
  <div><div><p>Drag and drop a PDF into the compression tool and Acrobat reduces its size.</p></div></div>
  <div><div><h3>What size PDFs can I compress?</h3></div></div>
  <div><div><p>Files up to 2GB.</p></div></div>
  <div><div><h3>How do I check my PDF file size?</h3></div></div>
  <div><div><p>Open the file in Acrobat and choose File &gt; Properties.</p></div></div>`;

export const Default = {
  render: () => renderBlock(`<div class="accordion">${items}</div>`),
};

export const ExpandAllButton = {
  render: () => renderBlock(`<div class="accordion expand-all-button">${items}</div>`),
};
