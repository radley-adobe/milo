// Resolves next to iframe.html, so it works on localhost and under a hosted subpath.
const LIBS = new URL('libs', window.location.href).pathname;

// Milo's block library: one example page per block, the source authors copy blocks from.
export const LIBRARY = 'https://main--milo--adobecom.aem.page/docs/library/blocks';

// The redesigned adobe.com homepage, built from C2 blocks. Most of its sections are fragments.
export const HOMEPAGE = 'https://main--upp--adobecom.aem.live/homepage/index-loggedout';
export const HOMEPAGE_FRAGMENTS = 'https://main--upp--adobecom.aem.live/homepage/fragments/loggedout/redesign/default';

// The redesigned Acrobat pages, built from C2 blocks.
export const ACROBAT = 'https://main--da-dc--adobecom.aem.live/acrobat';

// Fragments of the Acrobat and Creative Cloud Pro redesign tests. They hold C2 blocks that no
// published page uses yet.
export const ACROBAT_TEST_FRAGMENTS = 'https://main--da-dc--adobecom.aem.live/dc-shared/fragments/tests/2026/q2/ace1205/fragments';
export const CC_PRO_TEST_FRAGMENTS = 'https://main--da-cc--adobecom.aem.live/cc-shared/fragments/tests/2026/q3/ace1209/fragments';

// Milo's Nala test pages, one folder per block.
export const NALA = 'https://main--milo--adobecom.aem.page/drafts/nala/blocks';

// Federal, the site that holds the content of the global navigation and footer shared by every
// adobe.com site.
export const FEDERAL = 'https://main--federal--adobecom.aem.page/federal';

let utils;

// The story being rendered, set by the beforeEach hook in .storybook/preview.js. The render
// helpers read its Variants arg and argType from it.
let story;

// The story's main element, the variants its block shows once the block is fetched, and whether
// it was rendered with the authored variants.
let current;

export function setStory(context) {
  story = context;
}

// The variants the current story's block shows, or undefined when it has no Variants control.
export function shownVariants() {
  return current?.shown;
}

// Milo decorates a story after Storybook renders it. Waits until the story's main element has a
// data-milo-status, or 30 seconds pass.
export async function waitForMilo({ canvasElement }) {
  const main = canvasElement.querySelector('main');
  const end = Date.now() + 30000;
  while (main && !main.dataset.miloStatus && Date.now() < end) {
    await new Promise((resolve) => { setTimeout(resolve, 100); });
  }
}

async function getUtils() {
  if (!utils) {
    utils = await import(/* @vite-ignore */ `${LIBS}/utils/utils.js`);
    utils.setConfig({ codeRoot: LIBS });
    // setConfig prefixes contentRoot with this page's origin, so the live Milo site is set
    // afterwards. Placeholders and other site content resolve against it.
    utils.getConfig().locale.contentRoot = 'https://milo.adobe.com';
  }
  return utils;
}

function setFoundation(foundation) {
  let meta = document.head.querySelector('meta[name="foundation"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'foundation';
    document.head.append(meta);
  }
  meta.content = foundation;

  let link = document.getElementById('milo-styles');
  if (!link) {
    link = document.createElement('link');
    link.id = 'milo-styles';
    link.rel = 'stylesheet';
    document.head.append(link);
  }
  link.href = `${LIBS}${foundation === 'c2' ? '/c2' : ''}/styles/styles.css`;
}

// The page metadata the last story set, removed before the next story renders.
let pageMetadata = [];

function setPageMetadata(metadata) {
  pageMetadata.forEach((meta) => meta.remove());
  pageMetadata = Object.entries(metadata).map(([name, content]) => {
    const meta = document.createElement('meta');
    meta.name = name;
    meta.content = content;
    document.head.append(meta);
    return meta;
  });
}

// Fetches a live page's authored markup, with relative URLs resolved against the page so
// images and fragments load from its site.
//
// Links authored as URLs on the page's own site, such as an SVG background, move to the host the
// page was read from. Some sites only serve their aem.page host after sign-in.
async function fetchPage(pageUrl) {
  const resp = await fetch(`${pageUrl}.plain.html`);
  if (!resp.ok) throw new Error(`${resp.status} for ${pageUrl}.plain.html`);
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html');
  doc.querySelectorAll('[src], [srcset], [href]').forEach((el) => {
    ['src', 'srcset', 'href'].forEach((attr) => {
      const value = el.getAttribute(attr);
      if (value) el.setAttribute(attr, new URL(value, pageUrl).href);
    });
  });
  const { host, hostname } = new URL(pageUrl);
  const siteHosts = new RegExp(`//${hostname.split('.')[0]}\\.(aem|hlx)\\.(page|live)/`, 'g');
  doc.querySelectorAll('a').forEach((a) => {
    if (a.children.length) return;
    const text = a.textContent.replace(siteHosts, `//${host}/`);
    if (text !== a.textContent) a.textContent = text;
  });
  return doc;
}

// Milo turns SVG links on .aem. and .hlx. hosts into same-origin paths, which only resolve on
// the site itself. Decorates them first with Milo's own decorateSVG, keeping the authored host.
// .hlx. hosts no longer serve files, so they move to the matching .aem. host.
function decorateSvgLinks(main, decorateSVG) {
  main.querySelectorAll('a').forEach((a) => {
    const [text] = a.textContent.split('|');
    let url;
    try {
      url = new URL(text.trim());
    } catch {
      return;
    }
    if (!/\.(aem|hlx)\./.test(url.hostname) || !url.pathname.endsWith('.svg')) return;
    const img = decorateSVG(a).querySelector('img');
    url.hostname = url.hostname.replace('.hlx.', '.aem.');
    if (img) img.src = url.href;
  });
}

function section(...children) {
  const div = document.createElement('div');
  div.append(...children);
  return div;
}

const sameClasses = (a, b) => Array.isArray(a) && Array.isArray(b)
  && a.length === b.length && a.every((name) => b.includes(name));

// Sets the classes a story's Variants control selects on the first block of its type: the
// block's name, the authored classes the control doesn't list, then the selected ones. With
// nothing selected yet, keeps the authored classes and returns the listed ones among them.
function applyVariants(main, { block, options }, variants) {
  const el = [...main.querySelectorAll(':scope > div > div')].find((div) => div.classList[0] === block);
  if (!el) return undefined;
  const [name, ...authored] = el.classList;
  if (!variants) return authored.filter((c) => options.includes(c));
  el.className = [name, ...authored.filter((c) => !options.includes(c)), ...variants].join(' ');
  return variants;
}

// Renders sections the way a Milo page would: filled with authored markup, then decorated by
// loadArea, or by `load` when given. `metadata` sets page metadata. Errors are shown in place of
// the story.
//
// After a story renders with its authored variants, .storybook/preview.js sets its Variants
// control to them, and Storybook renders it again. That render returns the same main element,
// which Storybook's renderer leaves in place.
function render(getSections, foundation, { metadata = {}, load = (milo, main) => milo.loadArea(main) } = {}) {
  const { id, args = {}, argTypes = {} } = story ?? {};
  if (current?.id === id && current.authored && sameClasses(args.variants, current.shown)) {
    current.authored = false;
    return current.main;
  }
  const main = document.createElement('main');
  const entry = { id, main, authored: !args.variants };
  current = entry;
  // Milo closes an open modal, which sits outside the story, when the hash changes.
  if (window.location.hash) window.location.hash = '';
  requestAnimationFrame(async () => {
    try {
      setFoundation(foundation);
      setPageMetadata(metadata);
      main.append(...await getSections());
      if (argTypes.variants?.options.length) {
        entry.shown = applyVariants(main, argTypes.variants, args.variants);
      }
      const milo = await getUtils();
      decorateSvgLinks(main, milo.decorateSVG);
      await load(milo, main);
      main.dataset.miloStatus = 'loaded';
    } catch (e) {
      main.textContent = e.message;
      main.dataset.miloStatus = 'error';
    }
  });
  return main;
}

// Renders the block at `index` among blocks named `name` on a live page. With `metadata`, the
// block keeps its section's metadata, such as a background the block's colors depend on.
export function renderPageBlock(pageUrl, name, { index = 0, metadata = false, foundation = 'c1' } = {}) {
  return render(async () => {
    const block = (await fetchPage(pageUrl)).querySelectorAll(`div.${name}`)[index];
    if (!block) throw new Error(`No .${name} block at index ${index} on ${pageUrl}`);
    const sectionMetadata = metadata && block.parentElement.querySelector(':scope > .section-metadata');
    return [sectionMetadata ? section(block, sectionMetadata) : section(block)];
  }, foundation);
}

// Renders the section holding the block at `index` among blocks named `name` on a live page,
// and the `count - 1` sections after it. Use it for a block that reads the sections after it,
// such as C2 tabs, whose panels are those sections.
export function renderPageSections(pageUrl, name, { index = 0, count = 1, foundation = 'c1' } = {}) {
  return render(async () => {
    const doc = await fetchPage(pageUrl);
    const block = doc.querySelectorAll(`div.${name}`)[index];
    if (!block) throw new Error(`No .${name} block at index ${index} on ${pageUrl}`);
    const sections = [...doc.body.children];
    const start = sections.indexOf(block.parentElement);
    return sections.slice(start, start + count);
  }, foundation);
}

// Renders every section of a live page or fragment.
export function renderPage(pageUrl, { foundation = 'c1' } = {}) {
  return render(async () => [...(await fetchPage(pageUrl)).body.children], foundation);
}

// Renders the example at `index` on a block library page, as Milo's library lists it. An
// example can hold several blocks and span several sections.
export function renderLibraryExample(pageUrl, index, { foundation = 'c1' } = {}) {
  return render(async () => {
    const doc = await fetchPage(pageUrl);
    const { getContainers } = await import(/* @vite-ignore */ `${LIBS}/blocks/library-config/lists/blocks.js`);
    const example = getContainers(doc)[index];
    if (!example) throw new Error(`No example at index ${index} on ${pageUrl}`);
    // The library marks each section break inside an example with a "---" paragraph.
    const sections = [section()];
    example.elements.forEach((el) => {
      if (el.textContent === '---') sections.push(section());
      else sections.at(-1).append(el);
    });
    return sections;
  }, foundation);
}

// Renders Milo's global navigation from the gnav content at `source`, the way Milo builds a page's
// header from its `gnav-source` metadata. `metadata` sets other page metadata the navigation
// reads, such as `universal-nav`. The header goes before the story's empty main element, where
// it is on a page.
export function renderGlobalNavigation(source, { metadata = {}, foundation = 'c1' } = {}) {
  return render(async () => [], foundation, {
    metadata: { 'gnav-source': source, ...metadata },
    load: async ({ getConfig, isLocalNav, loadBlock }, main) => {
      const header = document.createElement('header');
      header.className = 'global-navigation';
      main.before(header);
      // A local navigation mounts in an element Milo adds after the header.
      if (isLocalNav()) {
        const localNav = document.createElement('div');
        localNav.className = 'feds-localnav';
        header.after(localNav);
      }
      await loadBlock(header);
      await getConfig().federal?.fedsGlobalNavigation;
    },
  });
}

// Renders Milo's global footer from the footer content at `source`, the way Milo builds a page's
// footer from its `footer-source` metadata. The footer goes after the story's empty main element,
// where it is on a page.
export function renderGlobalFooter(source, { metadata = {}, foundation = 'c1' } = {}) {
  return render(async () => [], foundation, {
    metadata: { 'footer-source': source, ...metadata },
    // The footer fetches its content after it loads, and calls onFooterReady or onFooterError.
    load: ({ getConfig, loadBlock }, main) => new Promise((resolve, reject) => {
      const footer = document.createElement('footer');
      footer.className = 'global-footer';
      main.after(footer);
      Object.assign(getConfig(), { onFooterReady: resolve, onFooterError: reject });
      loadBlock(footer);
    }),
  });
}

// Renders inline authored block markup, for blocks with no usable live page.
export function renderBlock(html, { foundation = 'c1' } = {}) {
  return render(() => {
    const div = section();
    div.innerHTML = html;
    return [div];
  }, foundation);
}
