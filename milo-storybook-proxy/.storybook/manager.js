import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

addons.setConfig({
  // Shows the site's name in place of the Storybook logo, in the light or dark theme the browser
  // prefers.
  theme: { ...themes.normal, brandTitle: 'Milo - C2' },
  // Shows Design Tokens as a folder. As a section heading, the sidebar would list it below every
  // block, whatever the story order.
  sidebar: { showRoots: false },
});
