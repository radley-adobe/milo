# TODO

## CSS custom properties tab

Addon: `@ljcl/storybook-addon-cssprops`

Why: shows the CSS variables a block uses, with their values, in a tab next to the story. Without it, finding them means inspecting the rendered DOM.

- The tab lists only the variables a story declares in `parameters.cssprops`, each with a value, so the lists need to be generated rather than written by hand. C2 blocks use 10–54 variables each.
- Add a helper that reads the block's CSS (`libs/blocks/<name>/<name>.css` or `libs/c2/blocks/<name>/<name>.css`), collects its `var(--…)` references and the variables it defines, and looks up values in the token files
- The addon applies edited values on the story root. Variables a block defines on its own selectors override that, so editing them has no visible effect. Their names and values still display.
- Do this before the design tokens tab, which can reuse the same CSS scan

## Design tokens tab and catalog

Addon: `storybook-design-token`

Why: a browsable catalog of the C2 tokens with swatches and values, as a tab on each story and as Docs pages.

- The addon only reads tokens inside `@tokens` comment blocks. The C2 token files (`libs/c2/styles/deps/tokens.*.css`) are generated without them, but each group has a plain comment such as `/* Color / Blue */` or `/* Border Radius */`.
- Add a script that writes annotated copies of the token files into a gitignored folder in the proxy before `storybook dev` and `storybook build`, mapping each group to a presenter (Color, BorderRadius, Spacing, FontSize and so on). Point the addon's `designTokenGlob` at that folder. `libs/` stays unmodified.
- The theme files (`tokens.semantic.light.css`, `tokens.semantic.dark.css`) and the breakpoint files (`tokens.responsive.sm|md|lg|xl.css`) repeat the same token names with different values. Make each one its own category, for example "Font Size (lg)".
- The tab shows the whole catalog, not the tokens the story's block uses. `parameters.designToken.tabs` can limit it to some categories.
- Catalog pages use `DesignTokenDocBlock` in MDX, which needs addon-docs. Its `usageMap` prop can show which blocks use each token, filled from the CSS scan above.
- C1 has no token files; its variables are in `libs/styles/styles.css`. Start with C2.
