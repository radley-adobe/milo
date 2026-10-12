import { attr } from '../authored.js';

// A value cell: a checkmark for `true`, the text of a string, or nothing, which shows a dash.
const value = (v) => {
  if (v === true) return '<span class="icon icon-checkmark"></span>';
  return v || '';
};

// A plan's column in the header row. Paragraphs holding only `-` split it into three parts: the
// label and name, the price and its terms, and the link, authored in bold as a filled button.
const plan = ({
  label, title, price, priceNote, ctaLabel, ctaHref,
}) => `
    <div>
      ${label ? `<p>${label}</p>` : ''}
      ${title ? `<h3>${title}</h3>` : ''}
      <p>-</p>
      ${price ? `<p><strong>${price}</strong></p>` : ''}
      ${priceNote ? `<p>${priceNote}</p>` : ''}
      <p>-</p>
      ${ctaLabel ? `<p><strong><a href="${attr(ctaHref)}">${ctaLabel}</a></strong></p>` : ''}
    </div>`;

// One table: its heading row, then a row per feature. The first table's heading row marks the
// `primary` plan, as on the Acrobat plans page.
const table = ({ heading, rows = [] }, index, plans, primary) => {
  const marks = index === 0 ? plans.map((_, i) => `<div>${i + 1 === Number(primary) ? 'primary' : ''}</div>`) : [];
  return [
    `  <div>\n    <div>${heading ?? ''}</div>${marks.map((m) => `\n    ${m}`).join('')}\n  </div>`,
    ...rows.map(({ feature, values = [] }) => `  <div>\n    <div>${feature ?? ''}</div>${plans.map((_, i) => `\n    <div>${value(values[i])}</div>`).join('')}\n  </div>`),
  ].join('\n');
};

// Authored markup for a Comparison Table C2 block: a header row with the heading and one column
// per plan, then the tables, separated by `+++` rows.
export const comparisonTable = ({
  variants: classes = [], staticHeader, heading, body, plans = [], primary, tables = [],
}) => `
<div class="${['comparison-table-c2', ...(staticHeader ? ['static-header'] : []), ...classes].join(' ')}">
  <div>
    <div>
      ${heading ? `<h2>${heading}</h2>` : ''}
      ${body ? `<p>${body}</p>` : ''}
    </div>${plans.map(plan).join('')}
  </div>
${tables.map((t, i) => table(t, i, plans, primary)).join('\n  <div>\n    <div>+++</div>\n  </div>\n')}
</div>`.trim().replace(/^\s*\n/gm, '');

// The Acrobat plans page's plans for individuals, annual, billed monthly, with US prices. The
// page loads its prices and buttons from Merch at Scale, which open checkout. These link to
// each plan's product page instead.
export const ACROBAT_PLANS = [{
  label: 'Standard PDF toolset',
  title: 'Acrobat Standard',
  price: 'US$14.99/mo',
  priceNote: 'Annual, billed monthly',
  ctaLabel: 'Buy now',
  ctaHref: 'https://www.adobe.com/acrobat/acrobat-standard.html',
}, {
  label: 'Full PDF toolset',
  title: 'Acrobat Pro',
  price: 'US$19.99/mo',
  priceNote: 'Annual, billed monthly',
  ctaLabel: 'Free trial',
  ctaHref: 'https://www.adobe.com/acrobat/acrobat-pro.html',
}, {
  label: 'All-in-one solution',
  title: 'Acrobat Studio',
  price: 'US$24.99/mo',
  priceNote: 'Annual, billed monthly',
  ctaLabel: 'Free trial',
  ctaHref: 'https://www.adobe.com/acrobat/acrobat-studio.html',
}];

// Some of the Acrobat plans page's features for individuals, in its three tables.
export const ACROBAT_TABLES = [{
  heading: 'Trusted PDF tools',
  rows: [
    { feature: 'View, print, and share PDFs', values: [true, true, true] },
    { feature: 'Edit text and images in PDFs and automatically adjust formatting', values: [true, true, true] },
    { feature: 'Compare versions of a PDF', values: ['', true, true] },
    { feature: 'Redact sensitive information', values: ['', true, true] },
  ],
}, {
  heading: 'AI-powered tools',
  rows: [
    { feature: 'Get summaries, insights, and answers with AI', values: ['', '', true] },
    { feature: 'Turn static PDFs into interactive knowledge hubs with <u>PDF Spaces | right | Aggregate multiple files to ask questions, generate insights, and collaborate</u>', values: ['', '', true] },
  ],
}, {
  heading: 'Quick creation tools',
  rows: [
    { feature: 'Create presentations, flyers, and social content', values: ['', '', true] },
    { feature: 'Redesign resumes, reports, and invoices with professionally designed templates in <u>Adobe Express | right | The quick and easy app for design, video, photo, and more</u>', values: ['', '', true] },
  ],
}];
