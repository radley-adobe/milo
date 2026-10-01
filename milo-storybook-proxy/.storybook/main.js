import { mergeConfig } from 'vite';
import cssprops from './cssprops.js';
import designTokens from './tokens.js';

export default {
  framework: '@storybook/html-vite',
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@whitespace/storybook-addon-html',
    '@ljcl/storybook-addon-cssprops',
    // Reads the annotated token files that tokens.js writes. The path is relative to the folder
    // Storybook runs from.
    { name: 'storybook-design-token', options: { designTokenGlob: 'generated/tokens/*.css' } },
  ],
  // Milo's libs/ is served as-is, never bundled or modified.
  staticDirs: [{ from: '../../libs', to: '/libs' }],
  viteFinal: (config) => mergeConfig(config, { plugins: [cssprops(), designTokens()] }),
};
