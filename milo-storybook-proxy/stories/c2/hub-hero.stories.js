import { ACROBAT, CC_PRO_TEST_FRAGMENTS, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/hub-hero';
import variants from 'virtual:variants/c2/hub-hero';

export default { title: 'C2/Hub Hero', parameters: { cssprops }, argTypes: { variants } };

export const PdfAndDocumentEssentials = {
  name: 'adobe.com: PDF and document essentials',
  render: () => renderPageBlock(`${ACROBAT}/pdf-and-document-essentials`, 'hub-hero', { metadata: true, foundation: 'c2' }),
};

export const CreativeCloudProHub = {
  name: 'adobe.com: Creative Cloud Pro hub',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-hub`, 'hub-hero', { metadata: true, foundation: 'c2' }),
};
