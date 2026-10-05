import { parse, resolve, rootScopes } from './cssprops.js';

// Vite plugin for the Foundations Docs pages. `import { ... } from 'virtual:foundations'` gives
// the global classes in Milo's libs/c2/styles/styles.css with their values resolved at each
// breakpoint:
//
// - `breakpoints`: the viewport widths where the variables on :root change, smallest first
// - `textStyles`: for each text class, such as `heading-1`, the elements its rules also style and
//   one row per typography property
// - `sectionSpacing`: one row per `spacing-<size>` class, scaled and static
// - `grid`: one row per `--grid-` variable on :root
// - `upGrids`: the column count of each `-up` class
// - `rules`: every rule's selectors, with nesting resolved, and its declarations
//
// A row's `cells` has one entry per breakpoint. A cell has the resolved `value`, and `via`, the
// variable the declared one points to, when it points to one.

const ID = 'virtual:foundations';
const STYLES = 'c2/styles/styles.css';
const TYPE_PROPS = ['font-family', 'font-weight', 'font-size', 'line-height', 'letter-spacing', 'color'];
// Properties a text class takes from body when its own rules don't set them.
const INHERITED = ['font-family', 'font-weight', 'font-size', 'line-height', 'letter-spacing'];
const MIN_WIDTH = /^(?:screen and )?\((?:min-width:\s*|width\s*>=\s*)(\d+)px\)$/;

const clean = (value) => value.replace(/\s+/g, ' ').trim();

// Splits a selector list at its top-level commas.
function split(selector) {
  const items = [];
  let depth = 0;
  let start = 0;
  [...selector].forEach((char, i) => {
    if (char === '(') depth += 1;
    if (char === ')') depth -= 1;
    if (char === ',' && !depth) {
      items.push(selector.slice(start, i));
      start = i + 1;
    }
  });
  items.push(selector.slice(start));
  return items.map(clean).filter(Boolean);
}

// A nested rule's selectors with its parents' put in: `&` replaced, or the parent prepended.
function fullSelectors(rule) {
  let parent = rule.parent;
  while (parent.type !== 'root' && parent.type !== 'rule') parent = parent.parent;
  const own = split(rule.selector);
  if (parent.type === 'root') return own;
  return fullSelectors(parent).flatMap((outer) => own.map((item) => (
    item.includes('&') ? item.replaceAll('&', outer) : `${outer} ${item}`)));
}

// Every rule outside @keyframes, with the width it applies from and the other at-rules around
// it. `width` is null when a media query around it is anything but a plain min-width.
function flatten(root) {
  const rules = [];
  root.walkRules((rule) => {
    let width = 0;
    const conditions = [];
    for (let parent = rule.parent; parent.type !== 'root'; parent = parent.parent) {
      if (parent.type !== 'atrule') continue;
      if (parent.name.endsWith('keyframes')) return;
      const match = parent.name === 'media' && parent.params.match(MIN_WIDTH);
      if (match) width = Math.max(width, Number(match[1]));
      else conditions.unshift(`@${parent.name} ${clean(parent.params)}`);
    }
    const decls = rule.nodes.filter((n) => n.type === 'decl').map((d) => ({ prop: d.prop, value: clean(d.value) }));
    if (!decls.length) return;
    rules.push({ items: fullSelectors(rule), width, conditions, decls });
  });
  return rules;
}

function scan() {
  const { widths: breakpoints, scopes } = rootScopes(STYLES);
  const rules = flatten(parse(STYLES));

  // The variable a value points to, when the value is only that variable and its value is
  // another variable: --s2a-font-size-7xl for var(--s2a-typography-font-size-heading-1).
  const via = (value, scope) => {
    const name = value.match(/^var\((--[\w-]+)\)$/)?.[1];
    return scope.get(name)?.match(/^var\((--[\w-]+)\)$/)?.[1];
  };
  const rem = (value) => value.replace(/^([\d.]+)rem$/, (m, n) => `${m} (${Number(n) * 16}px)`);
  const cell = (value, scope) => ({ value: rem(resolve(value, scope)), via: via(value, scope) });
  // The cells for a property set by `decls` ({ value, width }, in source order): at each
  // breakpoint, the last one that applies.
  const cascade = (decls) => breakpoints.map((bp, i) => {
    const decl = decls.findLast((d) => d.width <= bp);
    return decl ? cell(decl.value, scopes[i]) : { value: '' };
  });
  const plain = rules.filter((r) => !r.conditions.length && r.width !== null);
  const declsOf = (list, prop) => list.flatMap((r) => r.decls
    .filter((d) => d.prop === prop)
    .map((d) => ({ value: d.value, width: r.width })));

  // A selector matches a lone element with class `name` when it's `.name`, or an attribute
  // selector such as [class*="heading-"] whose text the name contains.
  const matches = (item, name) => item === `.${name}`
    || name.includes(item.match(/^\[class\*="([^"]+)"\]$/)?.[1] ?? '\0');
  const body = plain.filter((r) => r.items.includes('body'));
  const textNames = [...new Set(plain
    .filter((r) => r.decls.some((d) => d.prop === 'font-size'))
    .flatMap((r) => r.items.map((item) => item.match(/^\.([\w-]+)$/)?.[1]).filter(Boolean)))];
  const textStyles = Object.fromEntries(textNames.map((name) => {
    const own = plain.filter((r) => r.items.some((item) => matches(item, name)));
    const elements = own.filter((r) => r.items.includes(`.${name}`))
      .flatMap((r) => r.items.filter((item) => /^[a-z][a-z0-9]*$/.test(item)));
    const rows = TYPE_PROPS.flatMap((prop) => {
      let decls = declsOf(own, prop);
      let from;
      if (!decls.length && INHERITED.includes(prop)) {
        decls = declsOf(body, prop);
        from = 'body';
      }
      if (!decls.length) return [];
      // The declaration that applies at the smallest breakpoint.
      const declared = (decls.findLast((d) => d.width === 0) ?? decls[0]).value;
      return [{ property: prop, declared, from, cells: cascade(decls) }];
    });
    return [name, { elements, rows }];
  }));

  // Scaled sizes come first in the stylesheet, then static ones.
  const sectionSpacing = [];
  plain.forEach((r) => {
    const match = r.items[0].match(/^\[class\*="spacing-([\w-]+?)(-static)?"\]/);
    const decls = declsOf([r], 'padding-top');
    if (!match || !decls.length) return;
    const [, size, isStatic] = match;
    let row = sectionSpacing.find((s) => s.size === size);
    if (!row) {
      row = { size };
      sectionSpacing.push(row);
    }
    row[isStatic ? 'static' : 'scaled'] = { declared: decls[0].value, cells: cascade(decls) };
  });

  const gridNames = [...new Set(scopes.flatMap((scope) => [...scope.keys()]))].filter((n) => n.startsWith('--grid-'));
  const grid = gridNames.map((name) => ({
    name,
    cells: scopes.map((scope) => (scope.has(name) ? cell(`var(${name})`, scope) : { value: '' })),
  }));

  // `1fr` is one column, and `repeat(3, minmax(0, 1fr))` three.
  const columns = (value) => String(Number(value.match(/^repeat\((\d+)/)?.[1] ?? value.split(' ').length));
  const upNames = [...new Set(plain.flatMap((r) => r.items
    .map((item) => item.match(/^\[class\*="up"\]\.([\w-]+-up)$/)?.[1]).filter(Boolean)))];
  const upGrids = upNames.map((name) => {
    const decls = declsOf(plain.filter((r) => r.items.includes(`[class*="up"].${name}`)), 'grid-template-columns');
    return { name, cells: cascade(decls).map((c) => ({ ...c, value: c.value && columns(c.value) })) };
  });

  return { breakpoints, textStyles, sectionSpacing, grid, upGrids, rules };
}

export default function foundations() {
  return {
    name: 'milo-foundations',
    resolveId: (id) => (id === ID ? `\0${ID}` : null),
    load(id) {
      if (id !== `\0${ID}`) return null;
      return Object.entries(scan()).map(([name, value]) => `export const ${name} = ${JSON.stringify(value)};`).join('\n');
    },
  };
}
