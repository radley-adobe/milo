import { mergeConfig } from 'vite';
import cssprops from './cssprops.js';

export default {
  framework: '@storybook/html-vite',
  stories: ['../stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@whitespace/storybook-addon-html',
    '@ljcl/storybook-addon-cssprops',
  ],
  // Milo's libs/ is served as-is, never bundled or modified.
  staticDirs: [{ from: '../../libs', to: '/libs' }],
  viteFinal: (config) => mergeConfig(config, { plugins: [cssprops()] }),
};
