import { mergeConfig } from 'vite';
import cssprops from './cssprops.js';
import foundations from './foundations.js';
import LIBS from './libs.js';
import designTokens from './tokens.js';
import variants from './variants.js';

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
    'storybook-branch-switcher',
  ],
  // Milo's libs/ is served as-is, never bundled or modified. fragments/ holds example fragments
  // that stories open, which Milo loads from the story's own site.
  staticDirs: [{ from: LIBS, to: '/libs' }, { from: '../fragments', to: '/fragments' }],
  viteFinal: (config) => mergeConfig(config, { plugins: [cssprops(), variants(), designTokens(), foundations()] }),
};
