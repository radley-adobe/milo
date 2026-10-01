# TODO

## Design tokens tab and catalog

Addon: `storybook-design-token`

Why: a browsable catalog of the C2 tokens with swatches and values, as a tab on each story and as Docs pages.

- The addon only reads tokens inside `@tokens` comment blocks. The C2 token files (`libs/c2/styles/deps/tokens.*.css`) are generated without them, but each group has a plain comment such as `/* Color / Blue */` or `/* Border Radius */`.
- Add a script that writes annotated copies of the token files into a gitignored folder in the proxy before `storybook dev` and `storybook build`, mapping each group to a presenter (Color, BorderRadius, Spacing, FontSize and so on). Point the addon's `designTokenGlob` at that folder. `libs/` stays unmodified.
- The theme files (`tokens.semantic.light.css`, `tokens.semantic.dark.css`) and the breakpoint files (`tokens.responsive.sm|md|lg|xl.css`) repeat the same token names with different values. Make each one its own category, for example "Font Size (lg)".
- The tab shows the whole catalog, not the tokens the story's block uses. `parameters.designToken.tabs` can limit it to some categories.
- Catalog pages use `DesignTokenDocBlock` in MDX, which needs addon-docs. Its `usageMap` prop can show which blocks use each token, filled from the CSS scan in `.storybook/cssprops.js`.
- C1 has no token files; its variables are in `libs/styles/styles.css`. Start with C2.

## C1 skin stylesheets

Why: a C1 page with `skin` metadata also loads `libs/styles/skins/<skin>.css`. Stories render without it, so those pages look different in Storybook.

- Milo's own `libs/scripts/scripts.js` (`loadStyles()`) adds the skin stylesheet. Stories don't run that script, and `<page>.plain.html` has no `<head>`, so they never see the `skin` metadata.
- The repo has two skins: `max25.css` (465 lines) and `northstar.css` (286 lines). Both are mostly block and text styles, with a few variables.
- Every rule is nested in `:root:has(meta[name="skin"][content="<skin>"])`, so a story needs the `skin` meta tag as well as the stylesheet
- Find out before building: which sites and pages use each skin, whether consuming sites such as cc and bacom load skins through their own scripts, and which blocks each skin changes
- Possible approach: a `skin` option on the render helpers in `src/milo.js` that adds the meta tag and stylesheet, the way `setFoundation()` adds the `foundation` meta. The CSS scan in `.storybook/cssprops.js` would read the skin file too.
