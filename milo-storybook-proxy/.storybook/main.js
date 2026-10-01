export default {
  framework: '@storybook/html-vite',
  stories: ['../stories/**/*.stories.js'],
  // Milo's libs/ is served as-is, never bundled or modified.
  staticDirs: [{ from: '../../libs', to: '/libs' }],
};
