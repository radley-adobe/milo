---
name: rewrite
description: >
  Brings milo-storybook-proxy up to date with upstream Milo. Merges adobecom/milo stage, runs
  the story check, updates the stories that it flags, and opens a pull request against dev.
  Runs unattended, so it can be scheduled daily.
disable-model-invocation: true
---

# Rewrite

Updates the Storybook stories in `milo-storybook-proxy/` after upstream Milo changes. Read
`milo-storybook-proxy/README.md` first: it defines how stories are written, and its Known limits
list what is expected to be missing or broken.

The run is unattended. Don't stop to ask questions. Anything that needs a person goes in the
pull request body, or in the final message when there is no pull request.

## Rules

- Never edit files under `libs/` or anywhere else outside `milo-storybook-proxy/`. Milo's code
  comes only from the upstream merge
- Never push to `dev` directly. Changes go through a pull request that a person merges
- Follow the README's story conventions and match the existing story files

## 1. Get upstream Milo

```sh
git status --porcelain            # stop if the working tree isn't clean
git fetch origin dev
git fetch https://github.com/adobecom/milo.git stage:refs/remotes/upstream/stage
git switch -c claude/rewrite-$(date +%F) origin/dev   # scheduled cloud runs may only push claude/ branches
git log --oneline HEAD..upstream/stage
```

If the log is empty, `dev` already has the latest Milo. The GitHub workflow merges it every day.
Otherwise, run `git merge --no-edit upstream/stage`. On a merge conflict, run `git merge --abort`, stop
and report the conflicting files. Upstream never touches this folder, so a conflict needs a
person.

List the upstream commits from the last two days that touch block code. The report uses them to
explain story changes:

```sh
git log --since='2 days ago' --oneline upstream/stage -- libs/blocks libs/c2/blocks libs/utils libs/styles libs/c2/styles
```

## 2. Build and check

```sh
cd milo-storybook-proxy
npm ci
npx playwright install chromium --only-shell
npm run build
npm run check
```

If the build fails, the cause is usually a story importing `virtual:cssprops/<c1|c2>/<block>` for
a block whose CSS was renamed or removed, or a change to a Milo function that `src/milo.js` or
`.storybook/` calls. Find the upstream commit with `git log -p upstream/stage -- <path>`, fix the
story or helper, and rebuild.

`npm run check` prints one section per kind of finding and exits with 1 if it finds anything. Its
output ending in "All stories match Milo and render." means there is nothing to update. Skip to
step 4.

## 3. Update the stories

Handle each section of the check output:

- **Library blocks with no story.** Add `stories/<c1|c2>/<block>.stories.js`. The title is
  `C1/` or `C2/` plus the block's name in `library.json`. Write one story per example on the
  library page. Use `renderPageBlock` for an example that is one block and `renderLibraryExample`
  for one that has several blocks or sections. Name each story after its example's heading,
  shortened the way the existing stories are. Import the block's cssprops when the block has a
  CSS file. A C2 block with no library page renders from `HOMEPAGE_FRAGMENTS`. If it isn't on the
  homepage, it renders from `renderBlock` with markup from `test/blocks/<block>/mocks/`.
- **Stories for blocks the library no longer lists.** If the block folder is gone from `libs/`,
  delete the story file. If the library only renamed the block, change the story title.
- **Library pages whose examples changed.** The output gives the page's current example list.
  Add a story for each added example and remove the story for each removed one. Fix the `index`
  of every story after the change. In `renderPageBlock`, `index` counts blocks with that name on
  the page. In `renderLibraryExample`, it counts examples. Keep the story order the same as the
  example order.
- **Stories that don't render.** Open the story's page with `curl -s <page>.plain.html` to see if
  it moved, lost the block, or has fewer blocks than `index`. Then check the upstream log for a
  change to the block or to a function the helpers call. Fix the story or `src/milo.js`. If the
  live page is broken and nothing in this folder can fix it, leave the story alone and report it.
  If a story can never render in a headless browser, add its title to `NO_RENDER` in
  `scripts/check.js` and its reason to README › Known limits.

Then rebuild and check again, writing the new examples snapshot:

```sh
npm run build
npm run check -- --update
```

Repeat until the only findings left are ones you are reporting for a person. Use `--update` only
once the stories match the library pages, because it records the current examples as handled.

## 4. Report

If `git status` and `git log origin/dev..HEAD -- milo-storybook-proxy` show no changes in this
folder, there's nothing to open. Run `git switch dev` and `git branch -D claude/rewrite-<date>`. Report
that the stories are current, with the number of upstream commits checked.

Otherwise, commit the changes in this folder:

```
Update stories for Milo <YYYY-MM-DD>

<one line per change: which stories changed and the upstream commit or library page change that caused it>
```

Push the branch and open a pull request against `dev` on `radley-adobe/milo`, never against
adobecom/milo. In a scheduled cloud run, open it with the GitHub access the session has. In a
local session, `gh` targets the fork's upstream unless the repo and base are set, and the pull
request is opened as radley-adobe:

```sh
git push -u origin HEAD
gh auth switch --user radley-adobe
gh pr create --repo radley-adobe/milo --base dev --title "Update stories for Milo <YYYY-MM-DD>" --body-file <file>
gh auth switch --user radley
```

The pull request body lists:

- The stories added, removed and changed, each with its cause
- Findings left for a person, with what was tried
- The upstream commits from step 1 that touch block code

End with the pull request URL.
