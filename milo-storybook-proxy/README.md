# milo-storybook-proxy

Storybook for Milo's C2 blocks, kept outside Milo's code. Stories pass authored block markup to Milo's own `loadArea()`, which decorates it the same way it does on a live page. Storybook serves this repo's `libs/` folder unbundled at `/libs`. Nothing in `libs/` is modified.

Published site: https://radley-adobe.github.io/milo/

## Run locally

```sh
cd milo-storybook-proxy
npm install
npm run storybook
```

Storybook runs at http://localhost:6006, with this repo's `libs/`. `npm run build` writes the static site to `dist/`, with one build for each Milo branch it follows. See Branches and deployment.

## Write a story

A story names a live page and a block on it. `renderPageBlock()` fetches the page's authored markup from `<page>.plain.html`, takes the block at `index` among blocks with that name, resolves its relative image and link URLs against the page, and decorates it.

```js
import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'Base Card' };

export const Default = {
  render: () => renderPageBlock(`${LIBRARY}/c2/base-card`, 'base-card', { index: 1, foundation: 'c2' }),
};
```

`LIBRARY` is Milo's block library, which has one example page per block. https://milo.adobe.com/docs/library/library.json lists the pages for C2 blocks under `c2-blocks`. Library stories have one story per example on the page, named by the heading above it.

Some library examples hold several blocks or span several sections. `renderLibraryExample(page, index)` renders the example at `index` as Milo's library lists it, using the library's own parser, with each section break as a new section.

`renderPage(url)` renders every section of a page or fragment. Use it when a block depends on the sections around it, such as a C2 carousel whose slides are the sections that follow it.

`renderPageSections(page, name, { index, count })` renders the section holding the block at `index` and the `count - 1` sections after it. C2 tabs use it, because their panels are the sections after them.

C2 sections often set a dark style or a background in their section metadata, and the block's colors depend on it. Pass `{ metadata: true }` to `renderPageBlock()` to keep the block's section metadata.

Milo builds a page's global navigation and footer from the content its `gnav-source` and `footer-source` metadata name. `renderGlobalNavigation(source)` and `renderGlobalFooter(source)` set that metadata and build them before and after the story's empty `main` element, where they are on a page. Pass other page metadata the navigation reads as `{ metadata: { 'gnav-dark-font': 'true' } }`. Without `gnav-dark-font`, the redesigned navigation has light text for a dark page top, so those stories set Storybook's dark background with `globals: { backgrounds: { value: 'dark' } }`.

A link to a fragment with a hash, such as `/federal/footer/fragments/regions#langnav`, opens the fragment in a modal. Milo keeps only the link's path and loads it from the current site, apart from paths under `/federal/`, which load from Federal. So only Federal fragments open in a modal in a story.

Most C2 blocks have no library page. Their stories use pages from the adobe.com redesign:

- `HOMEPAGE` is the redesigned homepage, and `HOMEPAGE_FRAGMENTS` is the folder of fragments it is built from
- `ACROBAT` is the redesigned Acrobat pages
- `ACROBAT_TEST_FRAGMENTS` and `CC_PRO_TEST_FRAGMENTS` are the fragments of the Acrobat and Creative Cloud Pro redesign tests. They hold blocks that no published page uses yet.
- `NALA` is Milo's Nala test pages, one folder per block
- `FEDERAL` is Federal, the site that holds the global navigation and footer content shared by every adobe.com site

Pages from adobe.com sites work through each site's `aem.live` origin, for example `https://main--cc--adobecom.aem.live` or `https://main--bacom--adobecom.aem.live`. Requests to www.adobe.com itself are rejected in headless browsers.

Some sites, such as `da-dc` and `da-cc`, serve their `aem.page` origin only after sign-in. A link whose text is a URL on the page's own site, such as an SVG section background, loads from the origin the story reads the page from.

Milo loads its fonts only for a whole page, so every render helper loads them with Milo's own font loader, `libs/utils/fonts.js`, before it sets `data-milo-status`.

Every story passes `{ foundation: 'c2' }`. This sets the `foundation` metadata so Milo loads the block and its styles from `libs/c2/`.

For a block with no usable live page, `renderBlock(html)` decorates inline authored markup instead: a `div` whose first class is the block name, one `div` per row and one `div` per cell. Milo's test mocks in `test/blocks/<name>/mocks/` show this markup for most blocks.

`renderStyles(html)` renders markup as it is, with Milo's C2 styles and fonts, and decorates nothing. Stories of global classes, such as `heading-1` or `con-button`, use it. Milo hides a section until it decorates it, so each top-level `div` in the markup needs the `section` class. `html` can also be a function that returns the markup or a promise of it.

To fill the CSS Custom Properties and Controls tabs, import the block's variables from `virtual:cssprops/c2/<block>` and its variants from `virtual:variants/c2/<block>`, and set them as the `cssprops` parameter and the `variants` argType:

```js
import cssprops from 'virtual:cssprops/c2/base-card';
import variants from 'virtual:variants/c2/base-card';

export default { title: 'Base Card', parameters: { cssprops }, argTypes: { variants } };
```

Storybook merges a file's parameters and argTypes into each of its stories, so in a file whose stories render different blocks, set `cssprops` and `variants` on each story instead.

A play function runs after Storybook renders the story, before Milo has decorated it. Start it with `await waitForMilo(context)` from `src/milo.js`.

Placeholders and other site content Milo looks up resolve against https://milo.adobe.com.

On a live site, Milo loads SVG icons authored as `.aem.` or `.hlx.` links from the site's own origin. Stories load them from the host in the link instead, with `.hlx.` hosts changed to `.aem.`, because `.hlx.` hosts no longer serve files.

When decoration finishes, the story's `main` element gets `data-milo-status="loaded"`. If the page or block can't be fetched, the story shows the error instead and `main` gets `data-milo-status="error"`.

## Foundations and Button

The Foundations Docs pages show the global classes in Milo's `libs/c2/styles/styles.css`:

- Typography: Headings, Body and Misc, one entry per text class
- Layout: the `--grid-` variables, containers and column grids
- Section Spacing: the `spacing-` classes
- Motion: the `parallax-` scroll animations
- Utilities: helper classes such as `hide-block` and `sr-only`

Their tables come from `.storybook/foundations.js`, which reads `styles.css` when Storybook starts and resolves each value at every breakpoint where the variables on `:root` change. Each value also shows the variable it points to, one step down. A table has a column for the base value and one for each breakpoint where one of its values changes. `import { ... } from 'virtual:foundations'` gives the data, and `stories/c2/styles/foundations.jsx` draws the tables. A class missing from a build's `styles.css` shows as missing.

The pages are MDX files in `stories/c2/styles/`. Their examples are stories in the same folder, tagged `!dev` so the sidebar hides them. The Typography pages show one example story per class, named after the class in PascalCase, such as `Heading1` for `heading-1`. To add a text class, add its story to `typography.stories.js` and its name to the page. The examples use classes from `demo.css` to outline boxes and shade padding. Those names avoid text that Milo's attribute selectors match, such as `up` in `[class*="up"]`.

The Button story in the same folder shows `con-button` and its variants, with controls, and the promo CTA link.

## Addons

- Every block has a Docs page that shows all of its stories. Each story renders in its own 600px-high iframe, so Milo's styles don't apply to the Docs page itself. A story can set its own height with `parameters.docs.story.iframeHeight`. Every Docs page has a table of contents of its h3 headings.
- Storybook's own interface and the Docs pages are light or dark, as the browser or operating system prefers. Each story iframe on a Docs page follows the toolbar's Preview background and Theme, the way a story page does. `followDocsGlobals()` in `.storybook/preview.js` copies them from the Docs page into each iframe, because Storybook only gives them to the Docs page.
- The Theme menu in the toolbar switches every story between Milo's light and dark themes. Dark puts Milo's `dark` class on the story's `body`, which sets the dark color tokens, the way a section with the `dark` style does.
- The Accessibility tab runs axe-core checks on each story. Milo decorates a story after Storybook renders it, so an `afterEach` hook in `.storybook/preview.js` waits for `data-milo-status` (up to 30 seconds) before the checks run.
- The HTML tab shows each story's markup after Milo has decorated it, formatted with Prettier. The addon reads the markup before Milo runs, so the same `afterEach` hook sends the decorated markup to the tab once `data-milo-status` is set.
- The CSS Custom Properties tab lists every variable the story's block sets or reads. `.storybook/cssprops.js` reads the block's CSS and Milo's global `styles.css`, and groups the variables as Block (set in the block's CSS), Tokens (C2 design tokens, the `--s2a-` variables), Global (other variables set in `styles.css`) and Other (set in neither, for example by JavaScript). A row's value is the first value the CSS gives it, at the smallest viewport. Its description lists where the variable is set and its value at each breakpoint.
- Editing a value in that tab applies it to the story's `body`, so it has no visible effect on a variable the block sets on its own elements. The addon writes every listed value onto the `body` when the tab opens and saves them in localStorage. `.storybook/preview.js` removes the values that haven't been edited, and drops a story's saved values once Milo's CSS changes.
- The Design Tokens Docs pages list every token in Milo's `libs/c2/styles/deps/tokens.*.css`, one category per group in those files. The Docs pages split each tier by content: Primitive and Semantic into Color, Font, Spacing, Border and Effects, plus Color - Button and Color - Icon Button for Semantic, and Responsive into Typography (Font Size, Letter Spacing and Line Height) and Spacing (Viewport & Section Padding, Layout and Other). `PAGES` in `.storybook/tokens.js` assigns each group to a page, and Storybook stops with an error if a group has no page. `SPLITS` there moves some tokens out of a long group into groups of their own: the button and icon button colors from Other, one group per style, which Semantic Color - Button and Color - Icon Button show. Semantic colors have a light and a dark category, and responsive tokens one per breakpoint. The addon reads only tokens inside `@tokens` comment blocks, so `.storybook/tokens.js` writes an annotated copy to `generated/tokens/tokens.css` when Storybook starts, with each value resolved and the value Milo declares as its description. On the Docs pages, color categories show as cards and the rest as tables, and right-clicking a token lists the C2 blocks whose CSS reads it. Font previews use Milo's body font, Adobe Clean, and Font Family previews use the token's family. The Design Tokens pages load Milo's Adobe Fonts kit, so they show these fonts where Adobe Clean isn't installed. Font Size, Line Height and Letter Spacing tables show every row at the height its preview needs, with half the table's width for the preview.
- The design token addon's own Design Tokens tab lists every token rather than the story's, so `.storybook/preview.js` hides it with `designToken: { disable: true }`. When shown, the tab writes each token it lists onto the story's `html` element, and `.storybook/preview.js` removes those values until they're edited
- The Controls tab lists the story block's variants as checkboxes: the classes the block's CSS combines with the block's own class, such as `dark` from `.tour.dark`. `.storybook/variants.js` reads them. Once Milo has decorated the story, `.storybook/preview.js` checks the ones the block was authored with. Changing a checkbox renders the story again with the new classes, and authored classes that aren't listed stay. Reset controls returns to the authored classes.
- Variants that only a block's JavaScript reads aren't listed, and about half the C2 blocks have none listed. The list can include classes that Milo adds itself, such as `scroll-driven-ready` on Offer Hero or `event` on the global footer.
- The Actions tab logs each click on a link or button, with its text, `href` and `daa-ll` analytics label, and the `milo:tab:changed`, `milo:modal:loaded` and `milo:modal:closed` events. Links don't navigate away from the story, apart from Milo's modal links and links to a `#` on the same page.
- The Interactions tab shows the steps of a story's play function. Carousel C2 stories move to the next slide and check the result. The Modal story opens its modal. The Accessibility checks run after the play function, so on these stories they check the state it leaves.

## Keep stories current

Milo's code and its library pages change independently of this folder. `npm run check` reads both builds in `dist/`, so run `npm run build` first. It reports:

- C2 library blocks in https://milo.adobe.com/docs/library/library.json with no story, apart from the blocks listed in Known limits
- C2 blocks in `libs/c2/blocks/` with no `stories/c2/<block>.stories.js`, apart from the blocks listed in Known limits
- Story files for blocks the library no longer lists. A C2 story file stays while its block's folder is in `libs/c2/blocks/`. Story files in `stories/c2/styles/` show global styles, not blocks, so this skips them.
- Library pages whose examples changed since `stories/library-examples.json` was written. `npm run check -- --update` rewrites that file once the stories match the pages again.
- Stories that fail, for the `stage` and `main` builds separately: their `main` element doesn't reach `data-milo-status="loaded"` within 30 seconds, or their play function fails. Storybook reports a failed play function only on its event channel, so the check listens there. The check runs at 1280 × 720, where some mobile-only controls are hidden. C2 Tabs stories never finish loading in a headless browser, so the check skips them.

It installs no browser. Run `npx playwright install chromium --only-shell` once. When `HTTPS_PROXY` is set, as in a Claude Code cloud session, the check sends the browser's requests through Node's `fetch`, because Chromium doesn't trust the proxy's certificate.

The `/rewrite` Claude Code skill (`.claude/skills/rewrite/` at the repo root) merges upstream Milo `stage`, builds both branches, runs the check and updates the stories it flags. A story that fails only on `main` because `stage` changed its block and Milo hasn't released that change yet doesn't fail the run. When the check passes, it merges the changes into `dev` through a pull request. When it fails, it pushes a `claude/rewrite-failed-<date>` branch whose last commit is its report. `.github/workflows/milo-storybook-rewrite-failed.yml` fails on that push, so GitHub emails the report to the account that pushed it. A claude.ai routine runs `/rewrite` every weekday at 11:00 UTC.

## Branches and deployment

- `dev` is the default branch: Milo's `stage` plus this folder, `.claude/skills/rewrite/` and two workflows, `.github/workflows/milo-storybook-proxy.yml` and `.github/workflows/milo-storybook-rewrite-failed.yml`
- The workflow runs on every push to `dev`, builds Storybook and deploys it to GitHub Pages
- A daily scheduled run first merges `adobecom/milo` `stage` into `dev`, so the site tracks current Milo

The site has one build for each `adobecom/milo` branch it follows. The branch menu in the toolbar (`storybook-branch-switcher`) moves between them and keeps the open story.

- `stage`, at the site's root, serves this repo's `libs/`
- `main`, Milo's production branch, is in `main/`. `scripts/build.js` fetches `main` from adobecom/milo on every build and serves its `libs/`, so the `main` build is as current as the last deploy.

Both builds use the same stories, which follow `stage`. Milo releases `stage` to `main` about once a day, so a block can have a story before it reaches `main`. In the `main` build, that story's CSS Custom Properties tab is empty. `npm run check` renders the stories in both builds.

`MILO_LIBS=<path> npm run storybook` runs Storybook with another copy of Milo's `libs/`, such as one from `main`.

To merge upstream Milo locally:

```sh
git fetch upstream
git merge upstream/stage
```

## Known limits

- Stories render live content, so they change when the source page changes and break if it moves or the block is removed
- Acrobat pages on `main--dc--adobecom` send an invalid `Access-Control-Allow-Origin` header, so browsers block them. The redesigned Acrobat pages on `main--da-dc--adobecom` don't.
- The router marquee's product cards and the prices in C2 blocks such as Offer Hero, Product Marquee Grid, FAQ and Tabs load from www.adobe.com, so they stay hidden or show a load error in headless browsers. C2 Tabs panels hold merch cards, which also load from there, so those stories never finish loading.
- Milo loads a video authored as a `media_*.mp4` link from `libs/` on the current site, which only serves it on the site itself, so those videos are missing
- Globe Gallery fetches its card fragment itself and loads the card images from the current site, so the cards show without images
- The global navigation's universal navigation, such as sign-in and the app switcher, loads from a CDN that only allows adobe.com origins, so the Global Navigation stories leave it out
- Some C2 blocks have no story:
  - Card Metadata, Martech Metadata, Modal Metadata, Section Metadata and Visually Hidden show nothing of their own
  - Floating CTA shows only once the page scrolls past an earlier section
  - Email Collection C2, Firefly Globe and Pill Group are on no public page
