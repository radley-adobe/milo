import { LIBS, renderStyles } from '../../../src/milo.js';
import './demo.css';

const VARIANTS = ['outline', 'blue', 'fill', 'transparent'];
const SIZES = ['default', 'button-xs'];

export default {
  title: 'Components/Button',
  parameters: {
    docs: {
      description: {
        component: `The button classes in Milo's \`libs/c2/styles/styles.css\`. Milo adds \`con-button\` to an authored link in bold or italics: bold makes a \`blue\` button and italics an \`outline\` one. \`#_button-<class>\` at the end of the link's URL adds that class, such as \`#_button-fill\` or \`#_button-button-xs\`. The paragraph that holds the buttons gets \`action-area\`, which sets them in a row.`,
      },
      story: { iframeHeight: '120px' },
    },
  },
  argTypes: {
    variant: { control: 'select', options: VARIANTS, description: 'The class next to `con-button`' },
    size: { control: 'inline-radio', options: SIZES, description: '`button-xs` is the smaller size' },
    disabled: { control: 'boolean', description: 'Sets `aria-disabled="true"`. The `disabled` class and attribute look the same' },
    label: { control: 'text' },
  },
  args: { label: 'Learn more', variant: 'outline', size: 'default', disabled: false },
};

const button = ({ label, variant, size, disabled }) => {
  const classes = ['con-button', variant, size !== 'default' && size].filter(Boolean).join(' ');
  return `<a class="${classes}" href="#"${disabled ? ' aria-disabled="true"' : ''}>${label}</a>`;
};

export const Default = {
  render: (args) => renderStyles(`<div class="section"><p class="action-area">${button(args)}</p></div>`),
};

export const AllVariants = {
  render: () => renderStyles(`
    <div class="section">
      ${VARIANTS.map((variant) => `
        <p class="demo-tag">${variant}</p>
        <p class="action-area">
          ${SIZES.map((size) => button({ label: 'Learn more', variant, size })).join('')}
          ${button({ label: 'Disabled', variant, size: 'default', disabled: true })}
        </p>`).join('')}
    </div>`),
  parameters: { controls: { disable: true }, docs: { story: { iframeHeight: '400px' } } },
};

// Hub Hero, Tour and Floating CTA build this link. On a page it can start with an image.
export const PromoCta = {
  name: 'Promo CTA',
  render: () => renderStyles(async () => {
    const { default: icons } = await import(/* @vite-ignore */ `${LIBS}/c2/assets/icons.js`);
    return `
      <div class="section">
        <a class="promo-cta" href="#">Learn more<span class="icon-button" aria-hidden="true">${icons.arrowRightWhite}</span></a>
      </div>`;
  }),
  parameters: { controls: { disable: true } },
};
