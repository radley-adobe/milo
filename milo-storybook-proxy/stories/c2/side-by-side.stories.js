import { ACROBAT, CC_PRO_TEST_FRAGMENTS, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/side-by-side';
import variants from 'virtual:variants/c2/side-by-side';

export default { title: 'Side by Side', parameters: { cssprops }, argTypes: { variants } };

const product = `${CC_PRO_TEST_FRAGMENTS}/cpro-product`;

export const PdfAndDocumentEssentials = {
  name: 'adobe.com: PDF and document essentials',
  render: () => renderPageBlock(`${ACROBAT}/pdf-and-document-essentials`, 'side-by-side', { metadata: true, foundation: 'c2' }),
};

export const CreativeCloudProProductEqual = {
  name: 'adobe.com: Creative Cloud Pro product, equal',
  render: () => renderPageBlock(product, 'side-by-side', { index: 1, metadata: true, foundation: 'c2' }),
};

export const CreativeCloudProProductFeatured = {
  name: 'adobe.com: Creative Cloud Pro product, featured',
  render: () => renderPageBlock(product, 'side-by-side', { index: 3, metadata: true, foundation: 'c2' }),
};
