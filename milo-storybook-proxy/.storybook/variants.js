import { existsSync } from 'node:fs';
import { BLOCKS, parse } from './cssprops.js';
import LIBS from './libs.js';

// Vite plugin. `import variants from 'virtual:variants/<c1|c2>/<block>'` gives a story the
// argType for its Variants control: the classes the block's CSS combines with the block's own
// class, such as `light` from `.marquee.light`. src/milo.js applies the selected classes.

const PREFIX = 'virtual:variants/';

// Every class the block's CSS uses in the same compound selector as the block's class. Some
// blocks add a class of their own, such as `text-block` on the text block, so that one counts as
// the block's class too.
function scan(foundation, block) {
  const own = [block, `${block}-block`];
  const classes = new Set();
  parse(`${BLOCKS[foundation]}/${block}/${block}.css`).walkRules((rule) => {
    for (const [compound] of rule.selector.matchAll(/(?:\.[\w-]+){2,}/g)) {
      const names = compound.slice(1).split('.');
      if (names.some((name) => own.includes(name))) {
        names.filter((name) => !own.includes(name)).forEach((name) => classes.add(name));
      }
    }
  });
  return [...classes].sort();
}

export default function variants() {
  return {
    name: 'milo-variants',
    resolveId: (id) => (id.startsWith(PREFIX) ? `\0${id}` : null),
    load(id) {
      if (!id.startsWith(`\0${PREFIX}`)) return null;
      const [foundation, block] = id.slice(PREFIX.length + 1).split('/');
      // Another copy of libs/, such as Milo's main branch before a release, can be missing a
      // block that has a story. That block gets no variants.
      const missing = process.env.MILO_LIBS
        && !existsSync(`${LIBS}${BLOCKS[foundation]}/${block}/${block}.css`);
      const options = missing ? [] : scan(foundation, block);
      // `block` tells src/milo.js which block in the story the classes apply to.
      return `export default ${JSON.stringify({
        block,
        description: `Classes that \`${block}.css\` styles together with \`.${block}\`. Other classes the block was authored with stay.`,
        control: 'check',
        options,
        ...(!options.length && { table: { disable: true } }),
      })};`;
    },
  };
}
