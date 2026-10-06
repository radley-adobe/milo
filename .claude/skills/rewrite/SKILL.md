---
name: rewrite
description: >
  Brings milo-storybook-proxy up to date with upstream Milo's stage and main branches. Merges
  adobecom/milo stage, builds Storybook for stage and main, runs the story check on both builds,
  updates the C2 stories that it flags, and merges them into dev through a pull request when the
  check passes. A failed run pushes a report branch, and GitHub emails the
  report. Runs unattended, so it can be scheduled daily.
disable-model-invocation: true
---

# Rewrite

Updates the Storybook stories in `milo-storybook-proxy/` after upstream Milo changes. Read
`milo-storybook-proxy/README.md` first: it defines how stories are written, and its Known limits
list what is expected to be missing or broken.

The run is unattended. Don't stop to ask questions. Anything that needs a person makes the run
fail, and goes in the failure report (step 4).

## Rules

- Never edit files under `libs/` or anywhere else outside `milo-storybook-proxy/`. Milo's code
  comes only from the upstream merge
- Never push to `dev` directly. Story changes reach `dev` through a pull request, which the run
  merges only when it passed (step 4)
- Follow the README's story conventions and match the existing story files

## 1. Get upstream Milo

```sh
git status --porcelain            # stop if the working tree isn't clean
git fetch origin dev
git fetch https://github.com/adobecom/milo.git stage:refs/remotes/upstream/stage main:refs/remotes/upstream/main
git switch -c claude/rewrite-$(date +%F) origin/dev   # scheduled cloud runs may only push claude/ branches
git log --oneline HEAD..upstream/stage
```

The site follows two Milo branches. `stage` is merged into `dev`, and the stories follow it.
`main` is never merged: `npm run build` takes `main`'s `libs/` from adobecom/milo on every build.

If the log is empty, `dev` already has the latest `stage`. The GitHub workflow merges it every day.
Otherwise, run `git merge --no-edit upstream/stage`. On a merge conflict, run `git merge --abort` and
finish as a failed run (step 4), listing the conflicting files. Upstream never touches this
folder, so a conflict needs a person.

List the upstream commits from the last two days that touch block code, on each branch. The
report uses them to explain story changes:

```sh
git log --since='2 days ago' --oneline upstream/stage -- libs/c2 libs/utils
git log --since='2 days ago' --oneline upstream/main -- libs/c2 libs/utils
```

## 2. Build and check

```sh
cd milo-storybook-proxy
npm ci
npx playwright install chromium --only-shell
npm run build
npm run check
```

`npm run build` builds Storybook twice: for Milo's `stage` at the root of `dist/`, and for Milo's
`main` in `dist/main/`. Both builds use the same stories. `npm run check` renders every story in
both builds, runs its play function, and reports the stories that fail on each branch: Milo
doesn't finish decorating them, or their play function fails. It runs them at 1280 × 720.

If the build fails, the cause is usually a story importing `virtual:cssprops/c2/<block>` or
`virtual:variants/c2/<block>` for a block whose CSS was renamed or removed, or a change to a Milo
function that `src/milo.js` or `.storybook/` calls. Find the upstream commit with `git log -p
upstream/stage -- <path>`, or `upstream/main` when only the `main` build fails, fix the story or
helper, and rebuild.

`npm run check` prints one section per kind of finding and exits with 1 if it finds anything. Its
output ending in "All stories match Milo and render." means there is nothing to update. Skip to
step 4.

If the check can't fetch `library.json` or library pages, or more than a quarter of the stories
fail on both branches, the cause is the network, not the stories. Don't change any story. Finish
as a failed run (step 4), listing the failing hosts found with
`curl -sI https://milo.adobe.com/docs/library/library.json` and `curl -sI <page>.plain.html`.

## 3. Update the stories

Handle each section of the check output. A new story file goes in
`stories/c2/<block>.stories.js`, named after the block's folder in `libs/c2/blocks/`. When the
block has a CSS file, it imports the block's `virtual:cssprops` and `virtual:variants` and sets
`parameters: { cssprops }` and `argTypes: { variants }` on the default export. Leave out the
Variants control when its classes are ones Milo sets itself, as Global Navigation does. If the
block has an interaction like the ones with play functions (a slide to move to, a modal to open),
add a play function to the default export, modeled on Carousel C2 or Modal.

- **Library blocks with no story.** Title the file with the block's name in `library.json`. A new
  block usually also shows under C2 blocks with no story, and one file covers both. If a story
  file for the block's folder already exists, the library renamed the block: change that file's
  title to the new name. If `library.json` gives the block a library page, write one story per
  example on it, with `{ foundation: 'c2' }`. Use `renderPageBlock` for an example that is one
  block and `renderLibraryExample` for one that has several blocks or sections. Name each story
  after its example's heading, shortened the way the existing stories are. With no library page,
  write its stories as for a C2 block with no story. If the block can't have a story, add its name
  to `NO_STORY` in `scripts/check.js` and the reason to README › Known limits.
- **C2 blocks with no story.** Title the file with the block's name in title case. Find public
  pages that use the block: the `HOMEPAGE`, `HOMEPAGE_FRAGMENTS`, `ACROBAT`,
  `ACROBAT_TEST_FRAGMENTS`, `CC_PRO_TEST_FRAGMENTS` and `NALA` pages in `src/milo.js`, and the
  test URLs in the descriptions of the upstream pull requests that changed the block. Write one
  story per page, with `{ metadata: true, foundation: 'c2' }`. With no public page, use
  `renderBlock` with markup from `test/blocks/<block>/mocks/` or `test/c2/blocks/<block>/mocks/`.
  With neither, add the folder name to `NO_C2_STORY` in `scripts/check.js` and the reason to
  README › Known limits.
- **Stories for blocks the library no longer lists.** The check lists a story only when its
  block's folder is also gone from `libs/c2/blocks/`. If Milo renamed the block, its new folder
  shows under C2 blocks with no story: rename the story file and update its title, imports and
  block names. Otherwise, delete the story file.
- **Library pages whose examples changed.** The output gives the page's current example list.
  Add a story for each added example and remove the story for each removed one. Fix the `index`
  of every story after the change. In `renderPageBlock`, `index` counts blocks with that name on
  the page. In `renderLibraryExample`, it counts examples. Keep the story order the same as the
  example order. Base Card's Featured and Default stories render the library's cards from args,
  not from the page, so only its Section stories read the page.
- **Stories that fail because Milo doesn't finish decorating them.** Open the story's page with
  `curl -s <page>.plain.html` to see if it moved, lost the block, or has fewer blocks than
  `index`. Then check the upstream log for a
  change to the block or to a function the helpers call. Fix the story or `src/milo.js`. If the
  live page is broken and nothing in this folder can fix it, leave the story alone. The run then
  fails with that finding.
  If a story can never render in a headless browser, add its title to `NO_RENDER` in
  `scripts/check.js` and its reason to README › Known limits.
- **Stories whose play function fails.** A play function sits on its file's default export, so
  every story in the file runs it, and it assumes the example has something to interact with. If a
  library example changed so its story no longer does, give that story its own `play`. If the
  block's markup changed, fix the shared play function. Never change a play function so that it
  passes without checking anything.
- **Stories that pass on `stage` but fail on `main`.** The stories follow `stage`, and Milo
  releases `stage` to `main` about once a day. Compare the branches for the story's block and the
  Milo code the helpers call: `git log --oneline upstream/main..upstream/stage -- libs/c2/blocks/<block> libs/c2/styles libs/utils`.
  If `stage` has changes there that `main` doesn't, `main` catches up at Milo's next release.
  Don't change the story, and list it as waiting for a Milo release. Otherwise, treat it like any
  other failing story.

Then rebuild and check again, writing the new examples snapshot:

```sh
npm run build
npm run check -- --update
```

Repeat until nothing is left, or only findings that need a person. Use `--update` only
once the stories match the library pages, because it records the current examples as handled.

## 4. Finish

The run passed if the build succeeds and `npm run check` ends with "All stories match Milo and
render.", or its only findings are `main` stories waiting for a Milo release (step 3). List those
in the final message and, when there is one, the pull request body. Anything else is a failed
run: a merge conflict, a network failure, findings left for a person, or a pull request that
can't be opened or merged.

### Passed

If `git status` shows no changes in this folder, there's nothing to merge. Run `git switch dev`
and `git branch -D claude/rewrite-<date>`. Report that the stories are current, with the number
of upstream commits checked.

Otherwise, commit the changes in this folder:

```
Update stories for Milo <YYYY-MM-DD>

<one line per change: which stories changed and the upstream commit or library page change that caused it>
```

Push the branch, open a pull request against `dev` on `radley-adobe/milo`, never against
adobecom/milo, and merge it. The merge triggers the workflow that deploys the site.

```sh
git push -u origin HEAD
gh pr create --repo radley-adobe/milo --base dev --head claude/rewrite-<date> --title "Update stories for Milo <YYYY-MM-DD>" --body-file <file>
gh pr merge <url> --repo radley-adobe/milo --merge --delete-branch
```

`gh` is already signed in on a scheduled cloud run. In a local session, run
`gh auth switch --user radley-adobe` before these commands and `gh auth switch --user radley`
after them.

The pull request body lists:

- The stories added, removed and changed, each with its cause
- The upstream commits from step 1 that touch block code

End with the pull request URL. If the merge fails, the run failed: report it as below.

### Failed

Don't open a pull request. Commit any story changes made so far, add the report as an empty
commit, and push the branch under a failure name. A push to a `claude/rewrite-failed-*` branch
runs `.github/workflows/milo-storybook-rewrite-failed.yml`, which fails on purpose so that GitHub
emails the report to the account that pushed.

```sh
git add milo-storybook-proxy && git commit -m "Story changes from a failed /rewrite run"   # only if there are changes
git commit --allow-empty -F <report file>
git branch -m claude/rewrite-failed-$(date -u +%F-%H%M)
git push -u origin HEAD
```

The report's first line is `/rewrite failed: <cause in a few words>`. The rest lists what
failed with the output that shows it, what was tried, and the story changes already committed on
the branch.

End with the branch name and the report.
