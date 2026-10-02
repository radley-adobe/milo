---
name: rewrite
description: >
  Brings milo-storybook-proxy up to date with upstream Milo. Merges adobecom/milo stage, runs
  the story check, updates the stories that it flags, and merges them into dev through a pull
  request when the check passes. A failed run pushes a report branch, and GitHub emails the
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
git fetch https://github.com/adobecom/milo.git stage:refs/remotes/upstream/stage
git switch -c claude/rewrite-$(date +%F) origin/dev   # scheduled cloud runs may only push claude/ branches
git log --oneline HEAD..upstream/stage
```

If the log is empty, `dev` already has the latest Milo. The GitHub workflow merges it every day.
Otherwise, run `git merge --no-edit upstream/stage`. On a merge conflict, run `git merge --abort` and
finish as a failed run (step 4), listing the conflicting files. Upstream never touches this
folder, so a conflict needs a person.

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

If the check can't fetch `library.json` or library pages, or more than a quarter of the stories
don't render, the cause is the network, not the stories. Don't change any story. Finish as a
failed run (step 4), listing the failing hosts found with `curl -sI https://milo.adobe.com/docs/library/library.json` and
`curl -sI <page>.plain.html`.

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
  live page is broken and nothing in this folder can fix it, leave the story alone. The run then
fails with that finding.
  If a story can never render in a headless browser, add its title to `NO_RENDER` in
  `scripts/check.js` and its reason to README › Known limits.

Then rebuild and check again, writing the new examples snapshot:

```sh
npm run build
npm run check -- --update
```

Repeat until nothing is left, or only findings that need a person. Use `--update` only
once the stories match the library pages, because it records the current examples as handled.

## 4. Finish

The run passed if the build succeeds and `npm run check` ends with "All stories match Milo and
render." Anything else is a failed run: a merge conflict, a network failure, findings left for a
person, or a pull request that can't be opened or merged.

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
