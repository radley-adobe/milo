// Checks the stories against current Milo and its block library, and prints what needs
// updating: library blocks with no story, stories for blocks the library no longer lists,
// library pages whose examples changed, and stories that don't render. Reads the built site in
// dist/, so run `npm run build` first. Exits with 1 when it finds anything.
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

// Library blocks with no story. README › Known limits says why.
const NO_STORY = ['Section Metadata', 'Block Group', 'Card Metadata', 'Graybox Review',
  'Mobile App Banner', 'Form', 'SUSI Light Login'];

// Stories that never finish rendering in a headless browser, so the check skips them. README ›
// Known limits says why.
const NO_RENDER = ['C1/Merch Offers'];

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
async function pool(browser, items, size, fn) {
  const results = [];
  let next = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    const page = await browser.newPage();
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

async function renderStory(page, base, id) {
  await page.goto(`${base}/iframe.html?id=${id}&viewMode=story`);
  try {
    const main = await page.waitForSelector('main[data-milo-status]', { timeout: 30000 });
    if (await main.getAttribute('data-milo-status') === 'loaded') return null;
    return (await main.textContent()).trim();
  } catch {
    const error = await page.evaluate(() => document.getElementById('error-message')?.textContent.trim());
    return error || 'Milo did not finish decorating within 30 seconds';
  }
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
const libraryTitles = ['c1', 'c2'].flatMap((c) => library[`${c}-blocks`].data
  .filter(({ name }) => !NO_STORY.includes(name))
  .map(({ name }) => `${c.toUpperCase()}/${name}`));
const storyTitles = new Set(stories.map((s) => s.title));

const server = await serve();
const base = `http://localhost:${server.address().port}`;
const browser = await chromium.launch();
let found = 0;

try {
  found += report(
    'Library blocks with no story',
    libraryTitles.filter((t) => !storyTitles.has(t)),
  );
  found += report(
    'Stories for blocks the library no longer lists',
    storyFiles.filter((f) => !libraryTitles.includes(f.title)).map((f) => `${f.title} (${f.file})`),
  );

  const withPage = storyFiles.filter((f) => f.page).sort((a, b) => a.title.localeCompare(b.title));
  const page = await browser.newPage();
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

  const rendered = stories.filter((s) => !NO_RENDER.includes(s.title));
  const errors = await pool(browser, rendered, WORKERS, (p, s) => renderStory(p, base, s.id));
  found += report(
    `Stories that don't render (${errors.filter(Boolean).length} of ${rendered.length})`,
    rendered.map((s, i) => errors[i] && `${s.title} › ${s.name} (${s.id}): ${errors[i]}`).filter(Boolean),
  );
} finally {
  await browser.close();
  server.close();
}

if (!found) console.log('All stories match Milo and render.');
process.exitCode = found ? 1 : 0;
