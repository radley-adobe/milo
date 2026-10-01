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

`LIBRARY` is Milo's block library, which has one example page per block. https://milo.adobe.com/docs/library/library.json lists the pages for C1 blocks (`c1-blocks`) and C2 blocks (`c2-blocks`).

Pages from adobe.com sites work through each site's `aem.live` origin, for example `https://main--cc--adobecom.aem.live` or `https://main--bacom--adobecom.aem.live`. Requests to www.adobe.com itself are rejected in headless browsers.

For C2 blocks, pass `{ foundation: 'c2' }`. This sets the `foundation` metadata so Milo loads the block and its styles from `libs/c2/`.

For a block with no usable live page, `renderBlock(html)` decorates inline authored markup instead: a `div` whose first class is the block name, one `div` per row and one `div` per cell. Milo's test mocks in `test/blocks/<name>/mocks/` show this markup for most blocks.

Placeholders and other site content Milo looks up resolve against https://milo.adobe.com.

When decoration finishes, the story's `main` element gets `data-milo-status="loaded"`. If the page or block can't be fetched, the story shows the error instead.

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
