import { ACROBAT, LIVE, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/pdf-space';
import variants from 'virtual:variants/c2/pdf-space';

export default { title: 'Blocks/PDF Space', parameters: { cssprops, liveExamples: [LIVE.pdfEssentials] }, argTypes: { variants } };

export const PdfAndDocumentEssentials = {
  name: 'adobe.com: PDF and document essentials',
  render: () => renderPageBlock(`${ACROBAT}/pdf-and-document-essentials`, 'pdf-space', { metadata: true, foundation: 'c2' }),
};
