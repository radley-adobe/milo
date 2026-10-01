// Resolves next to iframe.html, so it works on localhost and under a hosted subpath.
const LIBS = new URL('libs', window.location.href).pathname;

let utils;

async function getUtils() {
  if (!utils) {
    utils = await import(/* @vite-ignore */ `${LIBS}/utils/utils.js`);
    utils.setConfig({ codeRoot: LIBS });
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

async function decorate(main, foundation) {
  setFoundation(foundation);
  const { loadArea } = await getUtils();
  await loadArea(main);
  main.dataset.miloStatus = 'loaded';
}

// Renders authored block markup the way a Milo page would: one section, decorated by loadArea.
export function renderBlock(html, { foundation = 'c1' } = {}) {
  const main = document.createElement('main');
  main.innerHTML = `<div>${html}</div>`;
  requestAnimationFrame(() => decorate(main, foundation));
  return main;
}
