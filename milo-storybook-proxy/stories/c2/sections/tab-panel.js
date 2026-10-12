import { section, sectionMetadata } from '../authored.js';

// Authored markup for a Tabs block's section from a story's args: the tab labels in a list, with
// the radio label above it, then a row for each setting that has a value. `activeTab` is the
// tab's number, which the `active tab` row holds when the block has an `id`. Without one, the row
// holds the tab's label. `metadata` gives the section's metadata settings.
export const tabs = ({
  variants: classes = [], tabs: items = [], radioLabel, id, activeTab, pretext,
}, metadata = {}) => {
  const active = items[activeTab - 1] && (id ? activeTab : items[activeTab - 1].label);
  const rows = Object.entries({ 'active tab': active, id, pretext }).filter(([, value]) => value)
    .map(([key, value]) => `  <div><div>${key}</div><div>${value}</div></div>`);
  return section(`
<div class="${['tabs', ...classes].join(' ')}">
  <div>
    <div>
      ${radioLabel ? `<p>${radioLabel}</p>` : ''}
      ${items.length ? `<ol>
        ${items.map(({ label }) => `<li>${label}</li>`).join('\n        ')}
      </ol>` : ''}
    </div>
  </div>
${rows.join('\n')}
</div>`.trim(), sectionMetadata(metadata));
};

// Authored markup for one panel: a section holding a Rich Content block, with a `tab` row that
// names its tab. The block is left out when it has no heading and no body.
export const panel = ({ tab, heading, body, style, background }) => section(
  heading || body ? `
<div class="rich-content heading-5">
  <div>
    <div>
      ${heading ? `<h3>${heading}</h3>` : ''}
      ${body ? `<p>${body}</p>` : ''}
    </div>
  </div>
</div>`.trim() : '',
  sectionMetadata({ tab, style, background }),
);

// The `tab` row that names the tab at `index`: the block's id and the tab's number when the block
// has an `id`, or else the tab's label.
export const tabName = ({ id, tabs: items = [] }, index) => (id ? `${id}, ${index + 1}` : items[index]?.label);

// The Acrobat plans page's tabs, one per audience. Each panel holds the audience's Acrobat Pro
// plan, as its merch card names and describes it.
export const PLANS = {
  tabs: [{
    label: 'Individuals',
    heading: 'Acrobat Pro',
    body: 'Create, edit, and sign PDFs with secure document and e-signature workflows.',
  }, {
    label: 'Business',
    heading: 'Acrobat Pro for teams',
    body: 'Create, edit, and sign PDFs with secure document and e-signature workflows, plus admin features.',
  }, {
    label: 'Students & Teachers',
    heading: 'Acrobat Pro for students and teachers',
    body: 'Create, edit, and sign PDFs with secure PDF and e-signature workflows.',
  }],
  radioLabel: '',
  id: 'compare-plans',
  activeTab: 1,
  pretext: 'Acrobat plans for Individuals, businesses and students & teachers',
};
