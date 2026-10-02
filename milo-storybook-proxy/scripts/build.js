// Builds Storybook once for each adobecom/milo branch it follows: stage at the root of dist/,
// from this repo's libs/, and main in dist/main/, from libs/ on Milo's main branch. The branch
// switcher in the toolbar moves between them.
import { execFileSync, execSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = fileURLToPath(new URL('../../', import.meta.url));
const MILO = 'https://github.com/adobecom/milo.git';
const BRANCHES = ['stage', 'main'];

function build(branch, out, env = {}) {
  const state = { list: BRANCHES, currentBranch: branch, defaultBranch: BRANCHES[0] };
  execFileSync('npx', ['storybook', 'build', '-o', out], {
    stdio: 'inherit',
    env: { ...process.env, ...env, STORYBOOK_BRANCH_SWITCHER_STATE: JSON.stringify(state) },
  });
}

build('stage', 'dist');

const main = mkdtempSync(join(tmpdir(), 'milo-main-'));
try {
  // git archive run from a subfolder archives only that folder, so these run at the repo root.
  execFileSync('git', ['fetch', '--quiet', MILO, 'main'], { cwd: REPO, stdio: 'inherit' });
  execSync(`git archive FETCH_HEAD libs | tar -x -C '${main}'`, { cwd: REPO, stdio: 'inherit' });
  build('main', 'dist/main', { MILO_LIBS: join(main, 'libs') });
} finally {
  rmSync(main, { recursive: true, force: true });
}
