// Authored markup for a FAQ block, and the questions on the Acrobat page.

// The sizes the block gives its questions and answers when no class on the block sets them.
const QUESTION_SIZE = 'heading-5';
const ANSWER_SIZE = 'body-md';

// An answer's lines, indented to sit in its cell.
const indent = (html) => html.replace(/\n/g, '\n      ');

// Authored markup for a FAQ block: one row per item, with the question as an `h3` and the answer
// after it in the same cell. `seo` adds its class, and `questionSize` and `answerSize` add theirs
// when they differ from the block's own sizes.
export const faq = ({
  variants: classes = [], seo, questionSize = QUESTION_SIZE, answerSize = ANSWER_SIZE, items = [],
}) => {
  const sizes = [questionSize, answerSize].filter((size) => size && ![QUESTION_SIZE, ANSWER_SIZE].includes(size));
  return `
<div class="${['faq', ...(seo ? ['seo'] : []), ...sizes, ...classes].join(' ')}">
${items.map(({ question, answer }) => `  <div>
    <div>
      ${question ? `<h3>${question}</h3>` : ''}
      ${answer ? indent(answer) : ''}
    </div>
  </div>`).join('\n')}
</div>`.trim();
};

// The first five questions on the Acrobat page, with its relative link made absolute.
export const ACROBAT_QUESTIONS = [{
  question: 'What is Adobe Acrobat?',
  answer: '<p>Acrobat is a productivity and collaboration platform that brings together powerful PDF tools, AI features, content creation, and seamless sharing to help you get your best work done. With an Acrobat desktop subscription, you get access to Acrobat desktop software, Acrobat online tools, the Acrobat Reader mobile app, and the Adobe Scan app — all so you can work more securely and efficiently from almost anywhere, on any device.</p>',
}, {
  question: 'What’s the difference between Acrobat Standard, Acrobat Pro, and Acrobat Studio?',
  answer: `<p><strong>Acrobat Standard</strong> includes basic PDF features, allowing you to:</p>
<ul>
  <li>Edit and organize PDFs.</li>
  <li>Convert documents to and from PDF.</li>
  <li>Fill out forms, sign documents, and request e-signatures.</li>
  <li>Password-protect files.</li>
</ul>
<p><strong>Acrobat Pro</strong> includes everything in Acrobat Standard, plus enhanced PDF tools and e-signature capabilities. With these advanced features, you can:</p>
<ul>
  <li>Turn scanned documents into editable, searchable PDFs.</li>
  <li>Compare PDFs to review differences.</li>
  <li>Redact sensitive information from PDFs.</li>
  <li>Brand your agreements by adding a logo and custom URL.</li>
  <li>Create web forms and reusable e-sign templates.</li>
  <li>Receive and track multiple e-signatures by sending in bulk.</li>
</ul>
<p><strong>Acrobat Studio</strong> includes everything in Acrobat Pro, plus PDF Spaces, AI Assistant for Acrobat, and Adobe Express Premium. Additional features include:</p>
<ul>
  <li>Chat with your documents and get fast answers.</li>
  <li>Summarize documents with one click.</li>
  <li>Ask questions using voice prompts on your mobile device.</li>
  <li>Unlock insights across PDFs, Microsoft 365 files, and web links with PDF Spaces.</li>
  <li>Easily remix docs into presentations with AI, create content from over 500,000 professional templates, and generate custom images — all powered by Adobe Express.</li>
  <li>Use AI-powered PDF Actions to complete top tasks in no time.</li>
  <li>Share a PDF Space with a prebuilt or personalized AI Assistant.</li>
</ul>
<p>You can see how <a href="https://www.adobe.com/acrobat/pricing/compare-versions.html">the Acrobat offerings</a> compare.</p>`,
}, {
  question: 'What’s included in my Acrobat desktop subscription?',
  answer: `<p>Your subscription to Acrobat includes desktop software, online access, and mobile apps, letting you effortlessly sync files across computers and devices.</p>
<ul>
  <li><strong>Acrobat desktop software</strong>: Use Acrobat on your desktop, with tools to edit, convert, protect, and sign documents. You can also integrate Acrobat with other productivity tools.</li>
  <li><strong>Acrobat online</strong>: Use PDF and e-signature tools in any web browser. Our prebuilt integrations for Microsoft OneDrive, Google Drive, and more make it easy to store and share files online. You can even send documents for e-signature and track responses in real time.</li>
  <li><strong>Acrobat Reader mobile app</strong>: The world’s most trusted PDF reader and editor with more than 635 million installs. View, share, annotate, add comments, and sign documents – all in one app.</li>
  <li><strong>Acrobat Scan mobile app</strong>: Turn your mobile device into a powerful scanner that recognizes text automatically (OCR) and allows you to create, save, and organize your paper documents as digital files.</li>
</ul>`,
}, {
  question: 'How does a subscription work?',
  answer: '<p>When you subscribe to Acrobat Studio, Acrobat Pro, or Acrobat Standard, you pay a monthly or annual fee based on the plan you choose. Regular updates will ensure you have the latest features available in Acrobat. You will not need to upgrade your product as long as your subscription is active.</p>',
}, {
  question: 'Is there a perpetual version of Acrobat available?',
  answer: '<p>No. Adobe discontinued selling perpetual versions of Acrobat after Acrobat 2020. However, if you would like a non-subscription version of Acrobat, <a href="https://www.adobe.com/products/catalog.html#category=pdf">Acrobat Pro 2024 desktop software</a> is a one-time, upfront purchase that provides three years of access to Acrobat desktop. It includes quarterly security updates but <a href="https://helpx.adobe.com/acrobat/faq-acrobat-pro-2024.html#_blank">does not include Acrobat feature enhancements</a> or access to Acrobat online services via your web browser and mobile devices.</p>',
}];
