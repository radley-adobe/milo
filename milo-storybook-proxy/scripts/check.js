// Checks the stories against current Milo and its block library, and prints what needs
// updating: C2 library blocks and C2 blocks with no story, stories for blocks the library no longer lists,
// library pages whose examples changed, and stories that don't render or whose play function
// fails, on each Milo branch's build. Reads the built site in dist/, so run `npm run build` first. Exits with 1 when it finds
// anything.
//
// Library examples are compared with stories/library-examples.json, the examples each library
// page had when its stories were last updated. `npm run check -- --update` rewrites that file.
import { createServer } from 'node:http';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { chromium } from 'playwright';

const ROOT = new URL('../', import.meta.url);
const DIST = new URL('dist/', ROOT);
const EXAMPLES = new URL('stories/library-examples.json', ROOT);
const LIBRARY_JSON = 'https://milo.adobe.com/docs/library/library.json';
const WORKERS = 6;

// Each Milo branch's build, by its folder in dist/. scripts/build.js writes both.
const BUILDS = { stage: '', main: 'main/' };

// C2 library blocks with no story. README › Known limits says why.
const NO_STORY = ['Section Metadata'];

// Folders in libs/c2/blocks/ with no story. README › Known limits says why.
const NO_C2_STORY = ['card-metadata', 'email-collection-c2', 'firefly-globe', 'floating-cta',
  'martech-metadata', 'modal-metadata', 'pill-group', 'section-metadata', 'visually-hidden'];

// Stories that never finish rendering in a headless browser, so the check skips them. README ›
// Known limits says why.
const NO_RENDER = ['Blocks/Tabs'];

// Folders of stories that show something other than one block: Milo's global styles, such as
// Button and the Foundations examples, and sections of blocks.
const NOT_BLOCK_STORIES = ['stories/c2/styles/', 'stories/c2/sections/'];

// A title without its sidebar group, such as Base Card for Blocks/Base Card. The library names
// blocks this way.
const blockName = (title) => title.split('/').pop();

const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};

function serve() {
  const server = createServer(async (req, res) => {
    let { pathname } = new URL(req.url, 'http://localhost');
    if (pathname.endsWith('/')) pathname += 'index.html';
    try {
      const body = await readFile(new URL(`.${decodeURIComponent(pathname)}`, DIST));
      res.writeHead(200, { 'content-type': TYPES[extname(pathname)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((resolve) => { server.listen(0, () => resolve(server)); });
}

// Runs fn on each item, `size` at a time, each worker with its own browser page.
async function pool(context, items, size, fn) {
  const results = [];
  let next = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    const page = await context.newPage();
    while (next < items.length) {
      const i = next;
      next += 1;
      results[i] = await fn(page, items[i]);
    }
    await page.close();
  }));
  return results;
}

// Each story file's title and the library page it renders from, if any.
async function readStoryFiles() {
  const milo = await readFile(new URL('src/milo.js', ROOT), 'utf8');
  const library = milo.match(/export const LIBRARY = '([^']+)'/)[1];
  const dir = new URL('stories/', ROOT);
  const files = (await readdir(dir, { recursive: true })).filter((f) => f.endsWith('.stories.js'));
  return Promise.all(files.map(async (file) => {
    const source = await readFile(new URL(file, dir), 'utf8');
    const path = source.match(/const library = `\$\{LIBRARY\}([^`]*)`/)?.[1];
    return {
      file: `stories/${file}`,
      title: source.match(/title: '([^']+)'/)[1],
      page: path && `${library}${path}`,
    };
  }));
}

// The examples on each library page, named the way Milo's library names them: by the heading
// above the example, or else by its first block's name.
function readExamples(page, base, urls) {
  return page.evaluate(async ([libs, pages]) => {
    const { getContainers } = await import(`${libs}/blocks/library-config/lists/blocks.js`);
    const exampleName = ({ elements }) => {
      const [first] = elements;
      let previous = first.previousElementSibling;
      if (previous?.classList.contains('library-container-start')) previous = previous.previousElementSibling;
      if (['H2', 'H3'].includes(previous?.nodeName)) return previous.textContent.trim();
      const [name, ...variants] = first.className.split(' ');
      return variants.length ? `${name} (${variants.join(', ')})` : name;
    };
    return Promise.all(pages.map(async (url) => {
      const resp = await fetch(`${url}.plain.html`);
      if (!resp.ok) return { error: `${resp.status} for ${url}.plain.html` };
      const doc = new DOMParser().parseFromString(await resp.text(), 'text/html');
      return { examples: getContainers(doc).map(exampleName) };
    }));
  }, [`${base}/libs`, urls]);
}

// Lines describing how a page's examples changed since the snapshot.
function exampleChanges(title, saved = [], current = []) {
  const added = current.filter((e) => !saved.includes(e));
  const removed = saved.filter((e) => !current.includes(e));
  const lines = [
    ...added.map((e) => `${title}: example "${e}" added at position ${current.indexOf(e)}`),
    ...removed.map((e) => `${title}: example "${e}" removed`),
  ];
  const kept = current.filter((e) => saved.includes(e));
  if (!lines.length && kept.join('\n') !== saved.join('\n')) lines.push(`${title}: examples reordered`);
  if (lines.length) lines.push(`${title}: examples now ${JSON.stringify(current)}`);
  return lines;
}

// Behind a TLS-intercepting proxy, such as a Claude Code cloud sandbox's, Node trusts the
// proxy's certificate and Chromium doesn't. Sends the browser's external requests through
// Node's fetch instead.
async function fetchThroughNode(route) {
  const request = route.request();
  try {
    const headers = request.headers();
    ['host', 'connection', 'content-length', 'accept-encoding'].forEach((h) => delete headers[h]);
    const resp = await fetch(request.url(), {
      method: request.method(),
      headers,
      body: request.postDataBuffer() ?? undefined,
      signal: AbortSignal.timeout(15000),
    });
    // Node's fetch has already decompressed the body.
    const responseHeaders = Object.fromEntries(resp.headers);
    delete responseHeaders['content-encoding'];
    delete responseHeaders['content-length'];
    await route.fulfill({
      status: resp.status,
      headers: responseHeaders,
      body: Buffer.from(await resp.arrayBuffer()),
    });
  } catch {
    await route.abort('failed');
  }
}

// Storybook reports a failed play function only on its channel, and still marks the story as
// passed. Records each failure's message from the moment the preview creates the channel.
function recordPlayErrors() {
  window.playErrors = [];
  let channel;
  Object.defineProperty(window, '__STORYBOOK_ADDONS_CHANNEL__', {
    configurable: true,
    get: () => channel,
    set: (value) => {
      channel = value;
      const emit = value.emit.bind(value);
      value.emit = (type, ...args) => {
        if (type === 'playFunctionThrewException') window.playErrors.push(args[0]?.message ?? 'no message');
        return emit(type, ...args);
      };
    },
  });
}

async function renderStory(page, build, id) {
  await page.goto(`${build}iframe.html?id=${id}&viewMode=story`, { waitUntil: 'domcontentloaded' });
  try {
    // Some stories show nothing at the default viewport, such as mobile-only blocks, so this
    // waits for the attribute, not for main to be visible.
    const main = await page.waitForSelector('main[data-milo-status]', { state: 'attached', timeout: 30000 });
    if (await main.getAttribute('data-milo-status') !== 'loaded') return (await main.textContent()).trim();
  } catch {
    const error = await page.evaluate(() => document.getElementById('error-message')?.textContent.trim());
    return error || 'Milo did not finish decorating within 30 seconds';
  }
  // The play function and the afterEach hooks run after Milo has decorated the story.
  const finished = await page.waitForFunction(
    () => window.__STORYBOOK_PREVIEW__?.currentRender?.phase === 'finished',
    null,
    { timeout: 30000 },
  ).then(() => true, () => false);
  const [playError] = await page.evaluate(() => window.playErrors);
  if (playError) return `play function failed: ${playError.split('\n').find(Boolean)}`;
  return finished ? null : 'the play function or checks did not finish within 30 seconds';
}

function report(heading, lines) {
  if (!lines.length) return 0;
  console.log(`\n## ${heading}\n`);
  lines.forEach((line) => console.log(`- ${line}`));
  return lines.length;
}

const index = JSON.parse(await readFile(new URL('index.json', DIST), 'utf8'));
const stories = Object.values(index.entries).filter((e) => e.type === 'story');
const storyFiles = await readStoryFiles();
const savedExamples = JSON.parse(await readFile(EXAMPLES, 'utf8').catch(() => '{}'));
const library = await (await fetch(LIBRARY_JSON)).json();
const libraryTitles = library['c2-blocks'].data
  .filter(({ name }) => !NO_STORY.includes(name))
  .map(({ name }) => name);
const storyTitles = new Set(stories.map((s) => blockName(s.title)));
// C2 stories are named after their block's folder: stories/c2/<block>.stories.js.
const c2Blocks = (await readdir(new URL('libs/c2/blocks/', DIST), { withFileTypes: true }))
  .filter((d) => d.isDirectory()).map((d) => d.name);
const c2Story = (block) => `stories/c2/${block}.stories.js`;

const server = await serve();
const base = `http://localhost:${server.address().port}`;
const proxy = process.env.HTTPS_PROXY;
const browser = await chromium.launch(proxy ? { proxy: { server: proxy, bypass: 'localhost' } } : {});
const context = await browser.newContext();
await context.addInitScript(recordPlayErrors);
if (proxy) await context.route((url) => url.hostname !== 'localhost', fetchThroughNode);
let found = 0;

try {
  found += report(
    'Library blocks with no story',
    libraryTitles.filter((t) => !storyTitles.has(t)),
  );
  found += report(
    'C2 blocks with no story',
    c2Blocks.filter((b) => !NO_C2_STORY.includes(b) && !storyFiles.some((f) => f.file === c2Story(b))),
  );
  // A C2 story for a block in libs/c2/blocks/ stays, whether or not the library lists the block.
  found += report(
    'Stories for blocks the library no longer lists',
    storyFiles.filter((f) => !libraryTitles.includes(blockName(f.title))
      && !c2Blocks.some((b) => f.file === c2Story(b))
      && !NOT_BLOCK_STORIES.some((dir) => f.file.startsWith(dir)))
      .map((f) => `${f.title} (${f.file})`),
  );

  const withPage = storyFiles.filter((f) => f.page).sort((a, b) => a.title.localeCompare(b.title));
  const page = await context.newPage();
  await page.goto(`${base}/iframe.html`);
  const pages = await readExamples(page, base, withPage.map((f) => f.page));
  await page.close();
  // A page that can't be fetched keeps its saved examples.
  const currentExamples = Object.fromEntries(withPage.map((f, i) => (
    [f.title, pages[i].examples ?? savedExamples[f.title]])));
  if (process.argv.includes('--update')) {
    await writeFile(EXAMPLES, `${JSON.stringify(currentExamples, null, 2)}\n`);
    Object.assign(savedExamples, currentExamples);
  }
  found += report('Library pages whose examples changed', withPage.flatMap((f, i) => (
    pages[i].error
      ? [`${f.title} (${f.file}): ${pages[i].error}`]
      : exampleChanges(f.title, savedExamples[f.title], pages[i].examples)
  )));

  const renders = (await Promise.all(Object.entries(BUILDS).map(async ([branch, folder]) => {
    const { entries } = JSON.parse(await readFile(new URL(`${folder}index.json`, DIST), 'utf8'));
    return Object.values(entries)
      .filter((e) => e.type === 'story' && !NO_RENDER.includes(e.title))
      .map((story) => ({ branch, folder, story }));
  }))).flat();
  const errors = await pool(context, renders, WORKERS, (p, r) => renderStory(p, `${base}/${r.folder}`, r.story.id));
  Object.keys(BUILDS).forEach((branch) => {
    const total = renders.filter((r) => r.branch === branch).length;
    const lines = renders
      .map(({ branch: b, story: s }, i) => b === branch && errors[i] && `${s.title} › ${s.name} (${s.id}): ${errors[i]}`)
      .filter(Boolean);
    found += report(`Stories that fail on ${branch} (${lines.length} of ${total})`, lines);
  });
} finally {
  await browser.close();
  server.close();
}

if (!found) console.log('All stories match Milo and render.');
process.exitCode = found ? 1 : 0;
