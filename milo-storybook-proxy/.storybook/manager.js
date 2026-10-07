import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

addons.setConfig({
  // Shows the site's name in place of the Storybook logo, in the light or dark theme the browser
  // prefers.
  theme: { ...themes.normal, brandTitle: 'Milo - C2' },
});
