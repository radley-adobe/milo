# milo-storybook-proxy

Storybook for Milo blocks, kept outside Milo's code. Stories pass authored block markup to Milo's own `loadArea()`, which decorates it the same way it does on a live page. Storybook serves this repo's `libs/` folder unbundled at `/libs`. Nothing in `libs/` is modified.

Published site: https://radley-adobe.github.io/milo/

## Run locally

```sh
cd milo-storybook-proxy
npm install
npm run storybook
```

Storybook runs at http://localhost:6006. `npm run build` writes the static site to `dist/`.

## Write a story

A story names a live page and a block on it. `renderPageBlock()` fetches the page's authored markup from `<page>.plain.html`, takes the block at `index` among blocks with that name, resolves its relative image and link URLs against the page, and decorates it.

```js
import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Accordion' };

export const Seo = {
  name: 'SEO',
  render: () => renderPageBlock(`${LIBRARY}/accordion`, 'accordion', { index: 1 }),
};
```

`LIBRARY` is Milo's block library, which has one example page per block. https://milo.adobe.com/docs/library/library.json lists the pages for C1 blocks (`c1-blocks`) and C2 blocks (`c2-blocks`). Library stories have one story per example on the page, named by the heading above it.

Some library examples hold several blocks or span several sections, such as tabs, carousels and layout patterns. `renderLibraryExample(page, index)` renders the example at `index` as Milo's library lists it, using the library's own parser, with each section break as a new section.

`renderPage(url)` renders every section of a page or fragment. Use it when a block depends on the sections around it, such as a C2 carousel whose slides are the sections that follow it.

Most C2 blocks have no library page. Their stories use the redesigned adobe.com homepage: `HOMEPAGE` is the page, and `HOMEPAGE_FRAGMENTS` is the folder of fragments it is built from.

Pages from adobe.com sites work through each site's `aem.live` origin, for example `https://main--cc--adobecom.aem.live` or `https://main--bacom--adobecom.aem.live`. Requests to www.adobe.com itself are rejected in headless browsers.

For C2 blocks, pass `{ foundation: 'c2' }`. This sets the `foundation` metadata so Milo loads the block and its styles from `libs/c2/`.

For a block with no usable live page, `renderBlock(html)` decorates inline authored markup instead: a `div` whose first class is the block name, one `div` per row and one `div` per cell. Milo's test mocks in `test/blocks/<name>/mocks/` show this markup for most blocks.

Placeholders and other site content Milo looks up resolve against https://milo.adobe.com.

On a live site, Milo loads SVG icons authored as `.aem.` or `.hlx.` links from the site's own origin. Stories load them from the host in the link instead, with `.hlx.` hosts changed to `.aem.`, because `.hlx.` hosts no longer serve files.

When decoration finishes, the story's `main` element gets `data-milo-status="loaded"`. If the page or block can't be fetched, the story shows the error instead and `main` gets `data-milo-status="error"`.

## Docs and accessibility

- Every block has a Docs page that shows all of its stories. Each story renders in its own 600px-high iframe, so Milo's styles don't apply to the Docs page itself. A story can set its own height with `parameters.docs.story.iframeHeight`.
- The Accessibility tab runs axe-core checks on each story. Milo decorates a story after Storybook renders it, so an `afterEach` hook in `.storybook/preview.js` waits for `data-milo-status` (up to 30 seconds) before the checks run.

## Branches and deployment

- `dev` is the default branch: Milo's `stage` plus this folder and `.github/workflows/milo-storybook-proxy.yml`
- The workflow runs on every push to `dev`, builds Storybook and deploys it to GitHub Pages
- A daily scheduled run first merges `adobecom/milo` `stage` into `dev`, so the site tracks current Milo

To merge upstream Milo locally:

```sh
git fetch upstream
git merge upstream/stage
```

## Known limits

- Stories render live content, so they change when the source page changes and break if it moves or the block is removed
- Acrobat pages (`main--dc--adobecom`) send an invalid `Access-Control-Allow-Origin` header, so browsers block them
- Merch cards, merch offers and the router marquee's product cards load prices and content from www.adobe.com, so they stay hidden or show a load error in headless browsers
- Some library pages have no story because the block shows nothing outside its site: Section Metadata and Block Group (layout only), Card Metadata (CaaS data), Graybox Review (graybox environments only), Mobile App Banner (mobile app setup), Form (loads its JSON from the current site) and SUSI Light Login (needs IMS)
- Marquee anchors load their arrow and external-link icons from `libs/img/ui/`, which is site content and not in this repo, so those icons are missing
