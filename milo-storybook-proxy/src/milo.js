// Resolves next to iframe.html, so it works on localhost and under a hosted subpath.
const LIBS = new URL('libs', window.location.href).pathname;

// Milo's block library: one example page per block, the source authors copy blocks from.
export const LIBRARY = 'https://main--milo--adobecom.aem.page/docs/library/blocks';

let utils;

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

// Fetches a live page's authored markup and returns one block, with relative URLs resolved
// against the page so images and fragments load from its site.
async function fetchBlock(pageUrl, name, index) {
  const resp = await fetch(`${pageUrl}.plain.html`);
  if (!resp.ok) throw new Error(`${resp.status} for ${pageUrl}.plain.html`);
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html');
  doc.querySelectorAll('[src], [srcset], [href]').forEach((el) => {
    ['src', 'srcset', 'href'].forEach((attr) => {
      const value = el.getAttribute(attr);
      if (value) el.setAttribute(attr, new URL(value, pageUrl).href);
    });
  });
  const block = doc.querySelectorAll(`div.${name}`)[index];
  if (!block) throw new Error(`No .${name} block at index ${index} on ${pageUrl}`);
  return block;
}

// Renders one section the way a Milo page would: filled with block markup, then decorated by
// loadArea. Errors are shown in place of the story.
function render(fill, foundation) {
  const main = document.createElement('main');
  const section = document.createElement('div');
  main.append(section);
  requestAnimationFrame(async () => {
    try {
      await fill(section);
      setFoundation(foundation);
      const { loadArea } = await getUtils();
      await loadArea(main);
      main.dataset.miloStatus = 'loaded';
    } catch (e) {
      main.textContent = e.message;
    }
  });
  return main;
}

// Renders the block at `index` among blocks named `name` on a live page.
export function renderPageBlock(pageUrl, name, { index = 0, foundation = 'c1' } = {}) {
  return render(async (section) => section.append(await fetchBlock(pageUrl, name, index)), foundation);
}

// Renders inline authored block markup, for blocks with no usable live page.
export function renderBlock(html, { foundation = 'c1' } = {}) {
  return render((section) => { section.innerHTML = html; }, foundation);
}
