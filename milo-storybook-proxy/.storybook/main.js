export default {
  framework: '@storybook/html-vite',
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  // Milo's libs/ is served as-is, never bundled or modified.
  staticDirs: [{ from: '../../libs', to: '/libs' }],
};
