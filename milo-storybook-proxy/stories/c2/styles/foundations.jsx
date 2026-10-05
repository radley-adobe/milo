import { Story, Subheading } from '@storybook/addon-docs/blocks';
import { components } from 'storybook/internal/components';
import { breakpoints, grid, rules, sectionSpacing, textStyles, upGrids } from 'virtual:foundations';

// Tables for the Foundations Docs pages, from the values .storybook/foundations.js reads in
// Milo's libs/c2/styles/styles.css. A table of values has a column for the base value and one for
// each breakpoint where one of its values changes.

const { code: Code, p: P, table: Table } = components;
const MISSING = "Not in this build's libs/c2/styles/styles.css.";

const width = (w) => (w ? `${w}px and up` : 'Base');

// A full-width table whose first columns have the given widths, so tables of the same kind line up.
function Grid({ widths, children }) {
  return (
    <Table className="foundations-table" style={{ width: '100%', tableLayout: 'fixed' }}>
      <colgroup>{widths.map((w, i) => <col key={i} style={{ width: w }} />)}</colgroup>
      {children}
    </Table>
  );
}

const same = (a, b) => a.value === b.value && a.via === b.via;

// The indexes of the breakpoints where a value in `rows` (lists of cells) changes, and the first.
const changes = (rows) => breakpoints.map((w, i) => i)
  .filter((i) => !i || rows.some((cells) => !same(cells[i], cells[i - 1])));

function Head({ first, columns }) {
  return (
    <thead>
      <tr>
        {first.map((label) => <th key={label}>{label}</th>)}
        {columns.map((i) => <th key={i}>{width(breakpoints[i])}</th>)}
      </tr>
    </thead>
  );
}

// A row's values at `columns`, with one cell across neighbors that are the same. Under each value
// is the variable the declared one points to at that width.
function Cells({ cells, columns }) {
  const merged = columns.map((i) => cells[i]).reduce((list, c) => {
    if (list.length && same(list.at(-1), c)) list.at(-1).span += 1;
    else list.push({ ...c, span: 1 });
    return list;
  }, []);
  return merged.map((c, i) => (
    <td key={i} colSpan={c.span}>
      {c.value}
      {c.via && <div style={{ fontSize: '0.85em', opacity: 0.75 }}><Code>{c.via}</Code></div>}
    </td>
  ));
}

// The story for a text class is the class name in PascalCase, such as Heading1 for heading-1.
const storyName = (name) => name.replace(/(?:^|-)(\w)/g, (m, c) => c.toUpperCase());

// One entry per text class: a sample from `stories`, the elements its rule also styles, and its
// typography at each breakpoint.
export function TextStyles({ stories, names }) {
  return names.map((name) => {
    const style = textStyles[name];
    const columns = style && changes(style.rows.map((row) => row.cells));
    return (
      <div key={name}>
        <Subheading>{name}</Subheading>
        {style?.elements.length > 0 && (
          <P>Also applies to {style.elements.map((e) => <Code key={e}>{`<${e}>`}</Code>)} elements.</P>
        )}
        <Story of={stories[storyName(name)]} />
        {style ? (
          <Grid widths={['12%', '26%']}>
            <Head first={['Property', 'Declared']} columns={columns} />
            <tbody>
              {style.rows.map((row) => (
                <tr key={row.property}>
                  <td>{row.property}</td>
                  <td>
                    <Code>{row.declared}</Code>
                    {row.from && ` (from ${row.from})`}
                  </td>
                  <Cells cells={row.cells} columns={columns} />
                </tr>
              ))}
            </tbody>
          </Grid>
        ) : <P>{MISSING}</P>}
      </div>
    );
  });
}

// The top and bottom padding of each `spacing-<size>` class, or with `kind` set to `static`,
// each `spacing-<size>-static` class.
export function SectionSpacing({ kind = 'scaled' }) {
  const rows = sectionSpacing.filter((s) => s[kind]);
  const columns = changes(rows.map((s) => s[kind].cells));
  const suffix = kind === 'static' ? '-static' : '';
  return (
    <Grid widths={['18%', '28%']}>
      <Head first={['Class', 'Declared']} columns={columns} />
      <tbody>
        {rows.map((s) => (
          <tr key={s.size}>
            <td><Code>{`spacing-${s.size}${suffix}`}</Code></td>
            <td><Code>{s[kind].declared}</Code></td>
            <Cells cells={s[kind].cells} columns={columns} />
          </tr>
        ))}
      </tbody>
    </Grid>
  );
}

// The `--grid-` variables on :root.
export function GridVariables() {
  const columns = changes(grid.map((g) => g.cells));
  return (
    <Grid widths={['28%']}>
      <Head first={['Variable']} columns={columns} />
      <tbody>
        {grid.map(({ name, cells }) => (
          <tr key={name}>
            <td><Code>{name}</Code></td>
            <Cells cells={cells} columns={columns} />
          </tr>
        ))}
      </tbody>
    </Grid>
  );
}

// The number of columns of each `-up` class.
export function ColumnCounts() {
  const columns = changes(upGrids.map((g) => g.cells));
  return (
    <Grid widths={['28%']}>
      <Head first={['Class']} columns={columns} />
      <tbody>
        {upGrids.map(({ name, cells }) => (
          <tr key={name}>
            <td><Code>{name}</Code></td>
            <Cells cells={cells} columns={columns} />
          </tr>
        ))}
      </tbody>
    </Grid>
  );
}

// The declarations of every rule with one of `selectors` in its selector list, with the width or
// at-rules it applies under.
export function Declarations({ selectors }) {
  return (
    <Grid widths={['28%', '24%']}>
      <thead>
        <tr><th>Selector</th><th>Applies</th><th>Declarations</th></tr>
      </thead>
      <tbody>
        {selectors.flatMap((selector) => {
          const found = rules.filter((r) => r.items.includes(selector));
          if (!found.length) {
            return [<tr key={selector}><td><Code>{selector}</Code></td><td colSpan={2}>{MISSING}</td></tr>];
          }
          return found.map((r, i) => (
            <tr key={`${selector} ${i}`}>
              <td><Code>{selector}</Code></td>
              <td>{[r.width && width(r.width), ...r.conditions].filter(Boolean).join(', ') || 'All widths'}</td>
              <td>
                {r.decls.map((d, j) => (
                  <div key={j}><Code>{`${d.prop}: ${d.value};`}</Code></div>
                ))}
              </td>
            </tr>
          ));
        })}
      </tbody>
    </Grid>
  );
}
