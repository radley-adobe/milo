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

A story passes a block's authored markup to `renderBlock()`. The markup matches what AEM delivers for a block: a `div` whose first class is the block name, one `div` per row and one `div` per cell. Variants are extra classes after the block name. Milo's test mocks in `test/blocks/<name>/mocks/` show this markup for most blocks.

```js
import { renderBlock } from '../../src/milo.js';

export default { title: 'C1/Accordion' };

export const Default = {
  render: () => renderBlock(`
    <div class="accordion">
      <div><div><h3>Question</h3></div></div>
      <div><div><p>Answer</p></div></div>
    </div>`),
};
```

For C2 blocks, pass `{ foundation: 'c2' }` as the second argument. This sets the `foundation` metadata so Milo loads the block and its styles from `libs/c2/`.

When decoration finishes, `renderBlock()` sets `data-milo-status="loaded"` on its `main` element.

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

Some blocks fetch content from the site root, such as `/placeholders.json`, fragments and media. The Storybook build does not include that content. The accordion `expand-all-button` variant, for example, falls back to the placeholder keys "expand all" and "collapse all".
