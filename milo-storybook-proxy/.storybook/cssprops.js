import { existsSync, readFileSync } from 'node:fs';
import postcss from 'postcss';
import LIBS from './libs.js';

// Vite plugin. `import cssprops from 'virtual:cssprops/<c1|c2>/<block>'` gives a story the
// parameters for the CSS custom properties addon: every variable the block's CSS sets or reads,
// with its value. Values come from the block's CSS and from Milo's global styles.css.

const PREFIX = 'virtual:cssprops/';
const GLOBAL_CSS = { c1: 'styles/styles.css', c2: 'c2/styles/styles.css' };
const BLOCKS = { c1: 'blocks', c2: 'c2/blocks' };
const ROOT_SELECTORS = [':root', 'html', 'body'];

const parse = (path) => postcss.parse(readFileSync(`${LIBS}${path}`, 'utf8'));
const clean = (value) => value.replace(/\s+/g, ' ').trim();
const sorted = (names) => [...names].sort();
const groupByName = (list) => list.reduce((map, d) => map.set(d.name, [...(map.get(d.name) ?? []), d]), new Map());
const declarationLine = (d) => `- \`${d.context}\`: \`${d.value}\``;

// The viewport width a rule applies from, or null when it sits in anything other than a plain
// min-width media query.
function minWidth(rule) {
  let width = 0;
  for (let parent = rule.parent; parent.type !== 'root'; parent = parent.parent) {
    const match = parent.type === 'atrule' && parent.name === 'media'
      && parent.params.match(/^(?:screen and )?\((?:min-width:\s*|width\s*>=\s*)(\d+)px\)$/);
    if (!match) return null;
    width = Math.max(width, Number(match[1]));
  }
  return width;
}

// Where a declaration sits, such as `@media (width >= 768px) › .marquee`.
function context(decl) {
  const parts = [];
  for (let parent = decl.parent; parent.type !== 'root'; parent = parent.parent) {
    parts.unshift(parent.type === 'atrule' ? `@${parent.name} ${parent.params}` : parent.selector);
  }
  return clean(parts.join(' › '));
}

// Every custom property a stylesheet sets, with the viewport width it applies from (null when
// that isn't a plain min-width) and whether it's set on :root, html or body.
function declarations(stylesheet) {
  const list = [];
  stylesheet.walkDecls(/^--/, (decl) => {
    const selectors = decl.parent.selector?.split(',').map((s) => s.trim());
    list.push({
      name: decl.prop,
      value: clean(decl.value),
      context: context(decl),
      width: minWidth(decl.parent),
      onRoot: !!selectors?.every((s) => ROOT_SELECTORS.includes(s)),
    });
  });
  return list;
}

// Replaces each var() in a value with the variable's value from scope, or its fallback. A var()
// that can't be resolved stays as it is.
export function resolve(value, scope, seen = []) {
  const start = value.indexOf('var(');
  if (start < 0) return value;
  let end = start + 4;
  for (let depth = 1; end < value.length && depth; end += 1) {
    if (value[end] === '(') depth += 1;
    if (value[end] === ')') depth -= 1;
  }
  const inner = value.slice(start + 4, end - 1);
  const comma = inner.indexOf(',');
  const name = (comma < 0 ? inner : inner.slice(0, comma)).trim();
  let replacement = value.slice(start, end);
  if (scope.has(name) && !seen.includes(name)) {
    replacement = resolve(scope.get(name), scope, [...seen, name]);
  } else if (comma >= 0) {
    replacement = resolve(inner.slice(comma + 1).trim(), scope, seen);
  }
  return value.slice(0, start) + replacement + resolve(value.slice(end), scope, seen);
}

function row(value, description, category) {
  return {
    value,
    category,
    ...(description && { description }),
    // The addon shows a color picker for anything CSS.supports() accepts as a color, which
    // includes any value with a var() in it.
    ...(value.includes('var(') && { control: 'text' }),
  };
}

function scan(foundation, block) {
  const globals = declarations(parse(GLOBAL_CSS[foundation]));
  const onRoot = globals.filter((d) => d.onRoot && d.width !== null);
  const elsewhere = groupByName(globals.filter((d) => !onRoot.includes(d)));
  // The values on :root, html and body at each breakpoint, smallest first.
  const widths = [...new Set(onRoot.map((d) => d.width))].sort((a, b) => a - b);
  const scopes = widths.map((width) => new Map(onRoot
    .filter((d) => d.width <= width)
    .map((d) => [d.name, d.value])));
  const scopeAt = (width) => scopes[widths.findLastIndex((w) => w <= (width ?? 0))];

  const blockCss = parse(`${BLOCKS[foundation]}/${block}/${block}.css`);
  const declared = groupByName(declarations(blockCss));
  const read = new Set();
  blockCss.walkDecls((decl) => {
    for (const [, name] of decl.value.matchAll(/var\(\s*(--[\w-]+)/g)) read.add(name);
  });

  const params = {};

  // A block's variables resolve against the global values at the smallest viewport, plus the
  // first value the block gives each of its own variables.
  const blockScope = new Map([...scopes[0], ...[...declared].map(([name, [first]]) => [name, first.value])]);
  sorted(declared.keys()).forEach((name) => {
    const list = declared.get(name);
    params[name.slice(2)] = row(resolve(list[0].value, blockScope), list.map(declarationLine).join('\n'), 'Block');
  });

  const unset = [];
  sorted(read).filter((name) => !declared.has(name)).forEach((name) => {
    const others = elsewhere.get(name) ?? [];
    // The :root value from each breakpoint where it changes.
    const steps = [];
    widths.forEach((width, i) => {
      const value = scopes[i].get(name);
      const resolved = value === undefined ? undefined : resolve(value, scopes[i]);
      if (resolved !== undefined && resolved !== steps.at(-1)?.resolved) {
        steps.push({ width, value, resolved });
      }
    });
    if (!steps.length && !others.length) {
      unset.push(name);
      return;
    }
    const reference = (step) => (step.value === step.resolved ? '' : `\`${step.value}\``);
    const stepLine = (step) => {
      const ref = reference(step);
      return `- ${step.width ? `${step.width}px and up` : 'Base'}: \`${step.resolved}\`${ref && ` (${ref})`}`;
    };
    const description = steps.length === 1 && !steps[0].width && !others.length
      ? reference(steps[0])
      : [...steps.map(stepLine), ...others.map(declarationLine)].join('\n');
    const value = steps[0]?.resolved ?? resolve(others[0].value, scopeAt(others[0].width));
    params[name.slice(2)] = row(value, description, 'Global');
  });

  unset.forEach((name) => {
    params[name.slice(2)] = row('', `Not set in the block's CSS or in \`${GLOBAL_CSS[foundation]}\``, 'Other');
  });

  return params;
}

export default function cssprops() {
  return {
    name: 'milo-cssprops',
    resolveId: (id) => (id.startsWith(PREFIX) ? `\0${id}` : null),
    load(id) {
      if (!id.startsWith(`\0${PREFIX}`)) return null;
      const [foundation, block] = id.slice(PREFIX.length + 1).split('/');
      // The stories follow this repo's libs/. Another copy, such as Milo's main branch before a
      // release, can be missing a block that has a story. That block gets no variables.
      const missing = process.env.MILO_LIBS
        && !existsSync(`${LIBS}${BLOCKS[foundation]}/${block}/${block}.css`);
      return `export default ${JSON.stringify(missing ? {} : scan(foundation, block))};`;
    },
  };
}
