# TODO

## C1 skin stylesheets

Why: a C1 page with `skin` metadata also loads `libs/styles/skins/<skin>.css`. Stories render without it, so those pages look different in Storybook.

- Milo's own `libs/scripts/scripts.js` (`loadStyles()`) adds the skin stylesheet. Stories don't run that script, and `<page>.plain.html` has no `<head>`, so they never see the `skin` metadata.
- The repo has two skins: `max25.css` (465 lines) and `northstar.css` (286 lines). Both are mostly block and text styles, with a few variables.
- Every rule is nested in `:root:has(meta[name="skin"][content="<skin>"])`, so a story needs the `skin` meta tag as well as the stylesheet
- Find out before building: which sites and pages use each skin, whether consuming sites such as cc and bacom load skins through their own scripts, and which blocks each skin changes
- Possible approach: a `skin` option on the render helpers in `src/milo.js` that adds the meta tag and stylesheet, the way `setFoundation()` adds the `foundation` meta. The CSS scan in `.storybook/cssprops.js` would read the skin file too.
