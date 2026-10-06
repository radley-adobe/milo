---
name: block-stories
description: >
  Upgrades the Storybook stories of one Milo C2 block in milo-storybook-proxy to the pattern Base
  Card uses: a Docs description taken from the block's code, stories that render the block from
  args with controls and Show code, blocks sized the way Milo lays them out, and Section stories
  that render a live page. Compares the block with its S2A Design System counterpart. Works on one
  block per run and stops for review.
disable-model-invocation: true
---

# Block stories

Upgrades the stories in `milo-storybook-proxy/stories/c2/<block>.stories.js` for one C2 block.
Read `milo-storybook-proxy/README.md` first: it explains the render helpers, the addons and the
checks. `milo-storybook-proxy/stories/c2/base-card.stories.js` is the reference: follow its
structure and match its code.

## Rules

- Work on one block per run, on a branch from `dev`
- Never edit files under `libs/`
- Keep the block's existing story names. Ask before adding, removing or renaming a story, apart
  from the changes step 4 describes
- Don't push or open a pull request until asked
- Use the `/browse` skill to look at pages

## 1. Check that the block fits

The pattern fits a block that is one authored table of text, links and media, such as a card or
a quote. It doesn't fit a block whose content comes from elsewhere:

- Global Navigation and Global Footer, which Milo builds from page metadata
- Tabs and the carousels, whose content is the sections after the block
- Modal, which opens from a link

For a block that doesn't fit, change nothing and say why.

## 2. Read the block

- `libs/c2/blocks/<block>/<block>.js` and `.css`: the authored rows and cells and what each cell
  can hold, the classes the CSS styles together with the block's class (the block's variants),
  the viewport rows if it calls `decorateViewportContent`, the classes it adds to its section,
  and the breakpoints where its layout changes
- The test mocks in `test/blocks/<block>/mocks/` or `test/c2/blocks/<block>/mocks/`
- The pages its current stories render. `curl -s <page>.plain.html` gives the authored markup.
  Library pages are listed in https://milo.adobe.com/docs/library/library.json under `c2-blocks`.

## 3. Compare with S2A

The S2A Design System Storybook (https://adobecom.github.io/consonant/) has components that match
some C2 blocks. List its story files with

```sh
gh api "repos/adobecom/consonant/git/trees/HEAD?recursive=1" --jq '.tree[].path' | grep 'stories/.*\.stories\.js$'
```

and read the counterpart's file with `gh api repos/adobecom/consonant/contents/<path> --jq .content | base64 -d`.
Match its features: controls on each story, a component sized to fit its frame, Show code with
markup, a Docs description, boolean toggles such as `showIcon`. Don't copy its story names,
examples or content. List the features you add and the ones that don't fit Milo.

## 4. Write the stories

**Description.** Set `parameters.docs.description.component` on the default export: one sentence
on what the block is and how it's authored, then bullets. State only facts from the block's code:
what each cell holds, what each variant changes and from which width, viewport rows, what the
block does to its section, and how its section lays out several of them. A bullet of one sentence
has no period.

**Template.** Write `authored(args, style)`, which returns the block's authored markup from a
story's args, followed by a `section-metadata` block when `style` is set. Follow the structure the
library page and mocks use. Leave out an element when its arg is empty. Pass attribute values
through `attr()`.

**Args.** On the default export, set `argTypes` to `variants` from `virtual:variants/c2/<block>`
and one arg per piece of content, each with a `control` and a `description` that says what an
empty value does. Add a boolean where the S2A counterpart toggles a part, such as `showIcon`.

**Single-block stories.** Each renders the block from its args with
`renderBlock(authored(args, style), { foundation: 'c2' })`, and sets
`parameters.docs.source` to `{ language: 'html', transform: (code, { args }) => authored(args, style) }`
so Show code gives the markup. `cardStory(style)` in the reference does both.

- Set `style` to the section style Milo gives the block on a page, so the story shows it at that
  size and it fits its frame: one column of `three-up, container` for a card shown in grids,
  `container` for a wide block. The `-up` and container classes are in
  `libs/c2/styles/styles.css`.
- Take the args from the page the story rendered before, usually the library page. When that
  page's image is a small thumbnail, use a larger image of the same content from an adobe.com
  page, such as the homepage fragments in `src/milo.js`, and say so in a comment.
- Put the plain block first, as Default with `variants: []`. Then one story per variant, with its
  class in `variants`, such as Featured with `variants: ['featured']`.

**Section stories.** These go in the sidebar's Sections group, not the block's file. Give each
its own file, `stories/c2/sections/<block>-<name>.stories.js`, titled `Sections/<Block> (<name>)`,
with one story of the same name so the sidebar shows it as one entry.
`stories/c2/sections/base-card-3-up.stories.js` is the reference. Each renders a live section:
`renderPageSections(page, name, { index })` for blocks that the section lays out together, or
`renderPageBlock(page, name, { metadata: true })` for one block with its section's metadata. Tag
the file `!autodocs` and set `parameters: { cssprops, controls: { disable: true } }`: it renders
published content, and the Variants control would change only the first block.

**Remove** stories that render a whole page or fragment without showing anything the other
stories don't.

Story frames on Docs pages grow to fit their story, so don't set `iframeHeight` unless a menu or
modal opens over the story.

## 5. Check

- Restart Storybook yourself: find the server with `lsof -nP -iTCP:6006 -sTCP:LISTEN`, stop it
  and its `npm` parent, and start it from `milo-storybook-proxy/` with
  `nohup npm run storybook -- --ci > <log> 2>&1 & disown`. The dev server can drop an edited
  story file from its index, so check that `curl -s localhost:6006/index.json` lists every story.
- Open each story at `/iframe.html?viewMode=story&id=<id>`. Its `main` has
  `data-milo-status="loaded"`, the block has the expected classes, and a single-block story fits a
  1280 × 720 window.
- On the Docs page (`/iframe.html?viewMode=docs&id=blocks-<block>--docs`): the description shows, the
  Controls table belongs to the first story, editing a control there updates that story, each
  frame fits its story, and Show code gives the authored markup.
- Run `npm run build`, then `npm run check`, which renders every story in the stage and main
  builds. Report the result for both.

## 6. Finish

- Update `milo-storybook-proxy/README.md` if the stories need a convention it doesn't describe
- If the block's single-block stories no longer read its library page, say so in the library
  pages step of `.claude/skills/rewrite/SKILL.md`, as it does for Base Card
- Commit on the branch. Report what changed, what you left out and why, and the check results,
  then stop for review

When asked to push and open a pull request, open it against `dev` on `radley-adobe/milo`:

```sh
git push -u origin HEAD
gh pr create --repo radley-adobe/milo --base dev --title "<title>" --body-file <file>
```

In a local session, run `gh auth switch --user radley-adobe` before `gh pr create` and
`gh auth switch --user radley` after it.
