import { ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/logo-ticker';
import variants from 'virtual:variants/c2/logo-ticker';

export default { title: 'Blocks/Logo Ticker', parameters: { cssprops, liveExamples: [LIVE.pdfEssentials] }, argTypes: { variants } };

export const PdfAndDocumentEssentials = {
  name: 'adobe.com: PDF and document essentials',
  render: () => renderPageBlock(`${ACROBAT}/pdf-and-document-essentials`, 'logo-ticker', { metadata: true, foundation: 'c2' }),
};

export const CreativeCloudProHub = {
  name: 'adobe.com: Creative Cloud Pro hub',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-hub`, 'logo-ticker', { metadata: true, foundation: 'c2' }),
};
