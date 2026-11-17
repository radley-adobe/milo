import { MEDIA, renderBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/aside-c2';
import variants from 'virtual:variants/c2/aside-c2';
import { attr } from './authored.js';

const description = `
A text column beside an image. It's authored as one row with two cells: the text, then the media.

- The text cell can hold a lockup (an icon and a product label), an eyebrow, a heading, body copy, buttons and a text link
- \`lockup\` and \`svg-lockup\` style the first paragraph as a product lockup
- \`mirrored\` swaps the text and the media, and \`media-first\` puts the media first when the columns stack
- A first row with a color value, followed by a second row with the content, sets the block's background
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the block different content at each viewport. An empty cell keeps the content of the viewport below it.
`;

const picture = `<picture><img src="${attr(`${MEDIA}/hover-list/e-signatures-1.webp`)}" width="960" height="720" alt=""></picture>`;

// Authored markup from the block's mocks in Milo's tests, with a real image in its media cell.
const authored = (classes = []) => `<div class="aside-c2 ${classes.join(' ')}">
  <div>
    <div>
      <p>Eyebrow dolor sit</p>
      <h2 id="heading-lorem">Heading lorem ipsum dolor sit.</h2>
      <p>Body lorem ipsum dolor sit amet.</p>
      <p><em><a href="https://www.adobe.com#_button-fill">Label</a></em> <em><a href="https://www.adobe.com">Label</a></em></p>
      <p><a href="https://www.adobe.com/link">Text link</a></p>
    </div>
    <div>${picture}</div>
  </div>
</div>`.replace('class="aside-c2 "', 'class="aside-c2"');

const asideStory = (classes) => ({
  render: (args) => renderBlock(authored([...classes, ...(args.variants ?? [])]), { foundation: 'c2' }),
  args: { variants: [] },
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored([...classes, ...(args.variants ?? [])]) } } },
});

export default {
  title: 'Blocks/Aside C2',
  parameters: { cssprops, docs: { description: { component: description } } },
  argTypes: { variants },
};

export const Default = asideStory([]);

export const Mirrored = asideStory(['mirrored']);

export const MediaFirst = asideStory(['media-first']);
