import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import { resolve } from './cssprops.js';

// Vite plugin for the design token addon. The addon reads only tokens inside `@tokens` comment
// blocks, and Milo's C2 token files have plain group comments such as `/* Color / Blue */`, so
// this writes an annotated copy of them to generated/tokens/tokens.css, which the addon's
// designTokenGlob points at. It's one file because the addon orders categories by the order it
// finds files in. The copy gives each token's value fully resolved, with the value Milo declares
// as its description.
//
// `import { categories, usageMap, values } from 'virtual:design-tokens'` gives the category names
// in order, the C2 blocks whose CSS reads each token, and every value each token has across the
// files.

const ID = 'virtual:design-tokens';
const LIBS = fileURLToPath(new URL('../../libs/', import.meta.url));
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
  [/^(Spacing|Layout|Viewport & Section Padding)$/, 'Spacing'],
  [/^Font Family$/, 'FontFamily'],
  [/Font Size$/, 'FontSize'],
  [/^Font Weight$/, 'FontWeight'],
  [/Line Height$/, 'LineHeight'],
  [/Letter Spacing$/, 'LetterSpacing'],
];

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
  return list.filter((group) => group.tokens.length);
}

function scan() {
  const parsed = Object.fromEntries(FILES.map(({ name }) => {
    const css = readFileSync(`${DEPS}tokens.${name}.css`, 'utf8');
    const width = css.match(/^@media \(min-width: (\d+px)\)/)?.[1];
    return [name, { groups: groups(css), width }];
  }));

  const categories = [];
  const values = {};
  const blocks = FILES.flatMap(({ name, prefix, suffix, scope }) => {
    const { width } = parsed[name];
    const scopeMap = new Map([...scope, name].flatMap((n) => parsed[n].groups.flatMap((g) => g.tokens))
      .map((t) => [t.name, t.value]));
    const label = suffix && `${suffix}${width ? `, ${width} and up` : ''}`;
    return parsed[name].groups.map((group) => {
      const category = [prefix, group.name].join(' / ') + (label ? ` (${label})` : '');
      const tokens = group.tokens.map((t) => ({ ...t, resolved: resolve(t.value, scopeMap) }));
      const type = presenter(group.name, tokens.map((t) => t.resolved));
      categories.push(category);
      tokens.forEach((t) => { values[t.name] = [...new Set([...(values[t.name] ?? []), t.resolved])]; });
      const lines = tokens.map((t) => {
        const description = [t.resolved === t.value ? '' : t.value, t.note].filter(Boolean).join(' · ');
        return `  ${t.name}: ${t.resolved};${description && ` /* ${description} */`}`;
      });
      return `  /**\n   * @tokens ${category}\n${type ? `   * @presenter ${type}\n` : ''}   */\n${lines.join('\n')}`;
    });
  });
  const css = `:root {\n${blocks.join('\n\n')}\n}\n`;

  const usageMap = {};
  readdirSync(BLOCKS).sort().forEach((block) => {
    readdirSync(`${BLOCKS}${block}`).filter((f) => f.endsWith('.css')).forEach((file) => {
      const css = readFileSync(`${BLOCKS}${block}/${file}`, 'utf8');
      new Set([...css.matchAll(/var\(\s*(--s2a-[\w-]+)/g)].map(([, name]) => name)).forEach((name) => {
        usageMap[name] = [...new Set([...(usageMap[name] ?? []), block])];
      });
    });
  });

  return { css, categories, usageMap, values };
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
      const { categories, usageMap, values } = scan();
      return `export const categories = ${JSON.stringify(categories)};
export const usageMap = ${JSON.stringify(usageMap)};
export const values = ${JSON.stringify(values)};`;
    },
  };
}
