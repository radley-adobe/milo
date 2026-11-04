import { renderBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/split-hero';
import variants from 'virtual:variants/c2/split-hero';

const description = `
Copy and an optional offer on one side, framed media on the other, over an optional background. It's authored as three rows of two cells: copy and media, then the offer and the background, then supporting text.

- The copy cell holds an eyebrow, a heading and body copy. The block moves the heading in front of the eyebrow in the DOM and keeps the eyebrow visually on top.
- The media cell holds an image or a video poster, shown in a frame
- The second row's second cell is an optional background: an image, a video, or a color or gradient as text
- \`parallax-reveal\` in the first section, followed by a section with \`rounded-corners-top\`, holds the hero while the frame shrinks and pans up on desktop
`;

const markup = `
<div class="split-hero">
  <div>
    <div>
      <p>Photoshop</p>
      <h1>Make something amazing.</h1>
      <p>Create and explore with powerful tools built for your ideas.</p>
    </div>
    <div>
      <p><picture><img src="" alt="" width="1400" height="520"></picture></p>
    </div>
  </div>
  <div>
    <div>
      <p>Your creative toolkit</p>
      <p>US$24.98/mo</p>
      <p>Annual, billed monthly</p>
      <p><strong><a href="https://www.adobe.com/free-trial">Free trial</a></strong> <em><a href="https://www.adobe.com/plans">See plans</a></em></p>
    </div>
    <div></div>
  </div>
  <div>
    <div>Not a student or teacher? Explore options for <a href="https://www.adobe.com/creativecloud/plans.html">individuals</a>.</div>
    <div></div>
  </div>
</div>`;

export default {
  title: 'Blocks/Split Hero',
  parameters: { cssprops, docs: { description: { component: description } } },
  argTypes: { variants },
};

export const Default = {
  name: 'Copy, offer and media',
  render: () => renderBlock(markup, { foundation: 'c2' }),
};
