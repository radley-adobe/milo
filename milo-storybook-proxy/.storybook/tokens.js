import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import { resolve } from './cssprops.js';
import LIBS from './libs.js';

// Vite plugin for the design token addon. The addon reads only tokens inside `@tokens` comment
// blocks, and Milo's C2 token files have plain group comments such as `/* Color / Blue */`, so
// this writes an annotated copy of them to generated/tokens/tokens.css, which the addon's
// designTokenGlob points at. It's one file because the addon orders categories by the order it
// finds files in. The copy gives each token's value fully resolved, with the value Milo declares
// as its description.
//
// `import { pages, usageMap, values } from 'virtual:design-tokens'` gives the categories on each
// Design Tokens Docs page, the C2 blocks whose CSS reads each token, and every value each token
// has across the files.

const ID = 'virtual:design-tokens';
const DEPS = `${LIBS}c2/styles/deps/`;
const BLOCKS = `${LIBS}c2/blocks/`;
const OUT = fileURLToPath(new URL('../generated/tokens/', import.meta.url));

// Each file with the files whose tokens it can read. tokens.primitives.light.css repeats the
// colors in tokens.primitives.css, so it isn't listed.
const FILES = [
  { name: 'primitives', prefix: 'Primitive', scope: [] },
  { name: 'semantic', prefix: 'Semantic', scope: ['primitives'] },
  { name: 'semantic.light', prefix: 'Semantic', suffix: 'light', scope: ['primitives', 'semantic'] },
  { name: 'semantic.dark', prefix: 'Semantic', suffix: 'dark', scope: ['primitives', 'semantic'] },
  ...['sm', 'md', 'lg', 'xl'].map((size, i, sizes) => ({
    name: `responsive.${size}`,
    prefix: 'Responsive',
    suffix: size,
    scope: ['primitives', 'semantic', 'semantic.light', ...sizes.slice(0, i).map((s) => `responsive.${s}`)],
  })),
];

const PRESENTERS = [
  [/^Color\b/, 'Color'],
  [/^Border Radius$/, 'BorderRadius'],
  [/^Opacity$/, 'Opacity'],
  [/^(Spacing|Layout|Viewport & Section Padding|Section Spacing|Viewport Vertical Padding)$/, 'Spacing'],
  [/^Font Family$/, 'FontFamily'],
  [/Font Size$/, 'FontSize'],
  [/^Font Weight$/, 'FontWeight'],
  [/Line Height$/, 'LineHeight'],
  [/Letter Spacing$/, 'LetterSpacing'],
];

// The Docs page each group is on, by the file's prefix and the group's name. Each page is named
// `<prefix> / <page>`, such as `Primitive / Color` or `Responsive / Typography / Font Size`.
const PAGES = {
  Primitive: [
    ['Color', /^Color\b/],
    ['Font', /^Font\b/],
    ['Spacing', /^Spacing$/],
    ['Border', /^Border\b/],
    ['Effects', /^(Opacity|Shadow|Blur)$/],
  ],
  Semantic: [
    ['Color - Button', /^Color \/ Button \//],
    ['Color - Icon Button', /^Color \/ Icon Button \//],
    ['Color', /^(Color\b|Other$)/],
    ['Font', /^Font\b/],
    ['Spacing', /^(Spacing|Layout)$/],
    ['Border', /^Border\b/],
    ['Effects', /^(Opacity|Blur)$/],
  ],
  Responsive: [
    ['Typography / Font Size', /^Typography \/ Font Size$/],
    ['Typography / Letter Spacing', /^Typography \/ Letter Spacing$/],
    ['Typography / Line Height', /^Typography \/ Line Height$/],
    ['Spacing / Section Spacing', /^Section Spacing$/],
    ['Spacing / Viewport Vertical Padding', /^Viewport Vertical Padding$/],
    ['Spacing / Layout', /^Layout$/],
    // Tokens Milo adds to Viewport & Section Padding that neither split takes.
    ['Spacing / Misc', /^(Other|Viewport & Section Padding)$/],
  ],
};

// The addon's presenter for a group, or none. A group named Other gets one only when all its
// values are colors or all are lengths.
function presenter(group, values) {
  const match = PRESENTERS.find(([pattern]) => pattern.test(group));
  if (match) return match[1];
  if (group !== 'Other') return null;
  if (values.every((v) => /^(#|rgba?\(|hsla?\()/.test(v))) return 'Color';
  if (values.every((v) => /^-?[\d.]+px$/.test(v))) return 'Spacing';
  return null;
}

// The button styles in the button color token names, such as `primary-outlined`, by heading.
const BUTTON_STYLES = [
  ['Accent', 'accent'],
  ['Primary (Solid)', 'primary-solid'],
  ['Outline', 'primary-outlined'],
  ['Transparent', 'primary-transparent'],
];

// Groups that are too long to read as one or that mix kinds of tokens, by name, and the groups
// their tokens move to by name. The tokens left over stay in the group, after the new ones.
const SPLITS = {
  // Section spacing and viewport vertical padding.
  'Viewport & Section Padding': [
    ['Section Spacing', /^--s2a-section-spacing-/],
    ['Viewport Vertical Padding', /^--s2a-viewport-vertical-padding-/],
  ],
  // Button and icon button colors, by style, such as Color / Icon Button / Accent.
  Other: [['Button', 'button'], ['Icon Button', 'iconbutton']].flatMap(([kind, prefix]) => BUTTON_STYLES
    .map(([style, key]) => [`Color / ${kind} / ${style}`, new RegExp(`^--s2a-color-${prefix}-\\w+-${key}-`)])),
};

// Where a size name such as `3xs`, `md` or `2xl` falls from smallest to largest, with `none`
// first and `round` last. NaN for other names.
function sizeRank(size) {
  if (size === 'none') return -1000;
  if (size === 'round') return 1000;
  const [, n, end] = size.match(/^(\d*)x([sl])$/) ?? [];
  if (end) return (end === 's' ? -1 : 1) * (Number(n || 1) + 1);
  return { sm: -1, md: 0, lg: 1 }[size] ?? NaN;
}

// Milo lists some sizes out of order, such as `--s2a-spacing-3xs` after `--s2a-spacing-4xl`, or
// from largest to smallest. In a group whose token names all end in a size name, tokens with the
// same name before the size stay together and go from smallest to largest.
function bySize(tokens) {
  const parts = tokens.map(({ name }) => name.match(/^(.*)-([^-]+)$/));
  if (!parts.every((m) => m && !Number.isNaN(sizeRank(m[2])))) return tokens;
  const stems = [...new Set(parts.map(([, stem]) => stem))];
  return tokens
    .map((token, i) => ({ token, stem: stems.indexOf(parts[i][1]), rank: sizeRank(parts[i][2]) }))
    .sort((a, b) => a.stem - b.stem || a.rank - b.rank)
    .map(({ token }) => token);
}

// The text styles in the responsive typography token names, such as `heading-2` in
// `--s2a-typography-font-size-heading-2`, from smallest to largest. Styles not listed go last.
const TYPE_SCALE = ['caption', 'label', 'eyebrow', 'body-xs', 'body-sm', 'body-md', 'body-lg',
  'heading-6', 'heading-5', 'heading-4', 'heading-3', 'heading-2', 'heading-1', 'super'];

// Milo lists the responsive typography tokens from largest to smallest, starting with `super`.
// Every breakpoint and property uses the same order, so the rows line up across the tables.
function byTypeScale(tokens) {
  const rank = ({ name }) => {
    const i = TYPE_SCALE.findIndex((style) => name.endsWith(`-${style}`));
    return i < 0 ? TYPE_SCALE.length : i;
  };
  return [...tokens].sort((a, b) => rank(a) - rank(b));
}

// The groups in a token file: each group comment on its own line, with the declarations after
// it. A comment after a declaration on the same line is a note on that token.
function groups(css) {
  const list = [];
  postcss.parse(css).walk((node) => {
    if (node.type === 'decl' && node.prop.startsWith('--')) {
      list.at(-1)?.tokens.push({ name: node.prop, value: node.value });
    } else if (node.type === 'comment' && node.parent.type === 'rule') {
      if (node.raws.before.includes('\n')) list.push({ name: node.text, tokens: [] });
      else if (node.prev()?.type === 'decl') list.at(-1).tokens.at(-1).note = node.text.replace(/^\*\s*/, '');
    }
  });
  return list.flatMap((group) => {
    const splits = (SPLITS[group.name] ?? []).map(([name, pattern]) => (
      { name, tokens: group.tokens.filter((t) => pattern.test(t.name)) }));
    const rest = group.tokens.filter((t) => !splits.some((s) => s.tokens.includes(t)));
    return [...splits, { name: group.name, tokens: rest }];
  }).filter((group) => group.tokens.length);
}

function scan() {
  const parsed = Object.fromEntries(FILES.map(({ name }) => {
    const css = readFileSync(`${DEPS}tokens.${name}.css`, 'utf8');
    const width = css.match(/^@media \(min-width: (\d+px)\)/)?.[1];
    return [name, { groups: groups(css), width }];
  }));

  const pages = {};
  const values = {};
  const blocks = FILES.flatMap(({ name, prefix, suffix, scope }) => {
    const { width } = parsed[name];
    const scopeMap = new Map([...scope, name].flatMap((n) => parsed[n].groups.flatMap((g) => g.tokens))
      .map((t) => [t.name, t.value]));
    const label = suffix ? ` (${suffix}${width ? `, ${width} and up` : ''})` : '';
    return parsed[name].groups.map((group) => {
      const category = `${prefix} / ${group.name}${label}`;
      const ordered = /^Typography \//.test(group.name) ? byTypeScale(group.tokens) : bySize(group.tokens);
      const tokens = ordered.map((t) => ({ ...t, resolved: resolve(t.value, scopeMap) }));
      const type = presenter(group.name, tokens.map((t) => t.resolved));
      const page = PAGES[prefix].find(([, pattern]) => pattern.test(group.name))?.[0];
      if (!page) throw new Error(`No Design Tokens page for ${category}. Add its group to PAGES in .storybook/tokens.js.`);
      // The Responsive Spacing Misc page heads Milo's Other group as Misc.
      const shown = page === 'Spacing / Misc' && group.name === 'Other' ? 'Misc' : group.name.split(' / ').at(-1);
      const heading = `${shown}${label}`;
      (pages[`${prefix} / ${page}`] ??= []).push({ category, heading, presenter: type });
      tokens.forEach((t) => { values[t.name] = [...new Set([...(values[t.name] ?? []), t.resolved])]; });
      const lines = tokens.map((t) => {
        const description = [t.resolved === t.value ? '' : t.value, t.note].filter(Boolean).join(' · ');
        return `  ${t.name}: ${t.resolved};${description && ` /* ${description} */`}`;
      });
      return `  /**\n   * @tokens ${category}\n${type ? `   * @presenter ${type}\n` : ''}   */\n${lines.join('\n')}`;
    });
  });
  const css = `:root {\n${blocks.join('\n\n')}\n}\n`;

  // Brand colors lead the Primitive color page.
  pages['Primitive / Color']?.sort((a, b) => (b.heading === 'Brand') - (a.heading === 'Brand'));

  const usageMap = {};
  readdirSync(BLOCKS).sort().forEach((block) => {
    readdirSync(`${BLOCKS}${block}`).filter((f) => f.endsWith('.css')).forEach((file) => {
      const css = readFileSync(`${BLOCKS}${block}/${file}`, 'utf8');
      new Set([...css.matchAll(/var\(\s*(--s2a-[\w-]+)/g)].map(([, name]) => name)).forEach((name) => {
        usageMap[name] = [...new Set([...(usageMap[name] ?? []), block])];
      });
    });
  });

  return { css, pages, usageMap, values };
}

export default function designTokens() {
  return {
    name: 'milo-design-tokens',
    buildStart() {
      mkdirSync(OUT, { recursive: true });
      writeFileSync(`${OUT}tokens.css`, scan().css);
    },
    resolveId: (id) => (id === ID ? `\0${ID}` : null),
    load(id) {
      if (id !== `\0${ID}`) return null;
      const { pages, usageMap, values } = scan();
      return `export const pages = ${JSON.stringify(pages)};
export const usageMap = ${JSON.stringify(usageMap)};
export const values = ${JSON.stringify(values)};`;
    },
  };
}
