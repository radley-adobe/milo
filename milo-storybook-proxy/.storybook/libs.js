import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// The Milo libs/ folder that Storybook serves and reads, ending in a slash: this repo's libs/,
// or the copy MILO_LIBS names, such as the one scripts/build.js takes from Milo's main branch.
export default process.env.MILO_LIBS
  ? `${resolve(process.env.MILO_LIBS)}/`
  : fileURLToPath(new URL('../../libs/', import.meta.url));
