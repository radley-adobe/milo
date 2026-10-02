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

To fill the CSS Custom Properties tab, import the block's variables from `virtual:cssprops/<c1|c2>/<block>` and set them as the `cssprops` parameter:

```js
import cssprops from 'virtual:cssprops/c1/accordion';

export default { title: 'C1/Accordion', parameters: { cssprops } };
```

Storybook merges a file's parameters into each of its stories, so in a file whose stories render different blocks, set `cssprops` on each story instead.

Placeholders and other site content Milo looks up resolve against https://milo.adobe.com.

On a live site, Milo loads SVG icons authored as `.aem.` or `.hlx.` links from the site's own origin. Stories load them from the host in the link instead, with `.hlx.` hosts changed to `.aem.`, because `.hlx.` hosts no longer serve files.

When decoration finishes, the story's `main` element gets `data-milo-status="loaded"`. If the page or block can't be fetched, the story shows the error instead and `main` gets `data-milo-status="error"`.

## Addons

- Every block has a Docs page that shows all of its stories. Each story renders in its own 600px-high iframe, so Milo's styles don't apply to the Docs page itself. A story can set its own height with `parameters.docs.story.iframeHeight`.
- The Accessibility tab runs axe-core checks on each story. Milo decorates a story after Storybook renders it, so an `afterEach` hook in `.storybook/preview.js` waits for `data-milo-status` (up to 30 seconds) before the checks run.
- The HTML tab shows each story's markup after Milo has decorated it, formatted with Prettier. The addon reads the markup before Milo runs, so the same `afterEach` hook sends the decorated markup to the tab once `data-milo-status` is set.
- The CSS Custom Properties tab lists every variable the story's block sets or reads. `.storybook/cssprops.js` reads the block's CSS and Milo's global `styles.css`, and groups the variables as Block (set in the block's CSS), Global (set in `styles.css`) and Other (set in neither, for example by JavaScript). A row's value is the first value the CSS gives it, at the smallest viewport. Its description lists where the variable is set and its value at each breakpoint.
- Editing a value in that tab applies it to the story's `body`, so it has no visible effect on a variable the block sets on its own elements. The addon writes every listed value onto the `body` when the tab opens and saves them in localStorage. `.storybook/preview.js` removes the values that haven't been edited, and drops a story's saved values once Milo's CSS changes.
- The Design Tokens tab and the C2 › Design Tokens Docs page list every token in Milo's `libs/c2/styles/deps/tokens.*.css`, one category per group in those files. Semantic colors have a light and a dark category, and responsive tokens one per breakpoint. The addon reads only tokens inside `@tokens` comment blocks, so `.storybook/tokens.js` writes an annotated copy to `generated/tokens/tokens.css` when Storybook starts, with each value resolved and the value Milo declares as its description. On the Docs page, right-clicking a token lists the C2 blocks whose CSS reads it.
- The Design Tokens tab also writes each token it shows onto the story's `html` element, and `.storybook/preview.js` removes those values until they're edited

## Keep stories current

Milo's code and its library pages change independently of this folder. `npm run check` reads the built site in `dist/`, so run `npm run build` first. It reports:

- Library blocks in https://milo.adobe.com/docs/library/library.json with no story, apart from the pages listed in Known limits
- Story files for blocks the library no longer lists
- Library pages whose examples changed since `stories/library-examples.json` was written. `npm run check -- --update` rewrites that file once the stories match the pages again.
- Stories whose `main` element doesn't reach `data-milo-status="loaded"` within 30 seconds. Merch Offers stories never finish loading in a headless browser, so the check skips them.

It installs no browser. Run `npx playwright install chromium --only-shell` once.

The `/rewrite` Claude Code skill (`.claude/skills/rewrite/` at the repo root) merges upstream Milo, runs the check, updates the stories it flags, and opens a pull request against `dev`.

## Branches and deployment

- `dev` is the default branch: Milo's `stage` plus this folder, `.github/workflows/milo-storybook-proxy.yml` and `.claude/skills/rewrite/`
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
