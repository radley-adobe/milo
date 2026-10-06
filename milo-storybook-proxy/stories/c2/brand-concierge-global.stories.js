import { renderBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/brand-concierge-global';
import variants from 'virtual:variants/c2/brand-concierge-global';

export default { title: 'Brand Concierge Global', parameters: { cssprops }, argTypes: { variants } };

export const Default = {
  render: () => renderBlock(`
    <div class="brand-concierge-global">
      <div>
        <div><p>Prompt one</p></div>
        <div><p>Prompt two</p></div>
        <div><p>Prompt three</p></div>
      </div>
      <div><p>Ask Adobe anything</p></div>
    </div>
  `, { foundation: 'c2' }),
};
