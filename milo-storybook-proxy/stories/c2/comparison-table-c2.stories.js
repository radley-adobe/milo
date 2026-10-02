import { renderBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/comparison-table-c2';
import variants from 'virtual:variants/c2/comparison-table-c2';

export default { title: 'C2/Comparison Table C2', parameters: { cssprops }, argTypes: { variants } };

// No published page uses this block yet. The markup is Milo's test mock,
// test/blocks/comparison-table-c2/mocks/default.html.
export const Default = {
  render: () => renderBlock(`
    <div class="comparison-table-c2">
      <div>
        <div><h2>Compare plans</h2><p>Pick the best plan for you.</p></div>
        <div>
          <h3>Free</h3>
          <p><strong>$0</strong></p>
          <p>-</p>
          <p>Basic features included</p>
          <p>-</p>
          <p><em><a href="#free">Choose Free</a></em></p>
        </div>
        <div>
          <h3>Pro</h3>
          <p><strong>$9.99</strong></p>
          <p>-</p>
          <p>All features included</p>
          <p>-</p>
          <p><em><a href="#pro">Choose Pro</a></em></p>
        </div>
      </div>
      <div>
        <div><h4>Features</h4></div>
        <div></div>
        <div>primary</div>
      </div>
      <div>
        <div>Storage <u>info|right|How much storage you get</u></div>
        <div>5 GB</div>
        <div>1 TB</div>
      </div>
      <div>
        <div>Support <u>note</u></div>
        <div>-</div>
        <div>24/7</div>
      </div>
    </div>`, { foundation: 'c2' }),
};
