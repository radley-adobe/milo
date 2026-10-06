import { Subheading } from '@storybook/addon-docs/blocks';
import { DesignTokenDocBlock } from 'storybook-design-token';
import { pages, usageMap } from 'virtual:design-tokens';

// Milo's Adobe Fonts kit, which libs/utils/fonts.js loads for each story. The Docs page loads it
// for the font previews.
const FONT_KIT = 'https://use.typekit.net/hah7vzn.css';
if (!document.querySelector(`link[href="${FONT_KIT}"]`)) {
  document.head.append(Object.assign(document.createElement('link'), { rel: 'stylesheet', href: FONT_KIT }));
}

// The font family tokens name installed fonts, such as "Adobe Clean". As in Milo's styles.css,
// each falls back to the kit's web font of the same name, such as adobe-clean.
const withWebFont = (family) => `${family}, ${family.replace(/"/g, '').toLowerCase().replaceAll(' ', '-')}`;

// Milo's body font, as `--body-font-family-base` in libs/c2/styles/styles.css sets it.
const BODY_FONT = '"Adobe Clean", adobe-clean, "Trebuchet MS", sans-serif';

const SAMPLE = 'Lorem ipsum';
const TEXT = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam veniam eum dicta.';

// The addon's previews of font tokens, set in Milo's fonts. Font Size, Line Height and Letter
// Spacing previews wrap instead of overflowing their column, and preview-head.html lets their
// rows grow to fit them.
const presenters = {
  FontFamily: ({ token }) => <div style={{ fontFamily: withWebFont(token.value) }}>{SAMPLE}</div>,
  FontSize: ({ token }) => (
    <div style={{ fontFamily: BODY_FONT, fontSize: token.value, lineHeight: 'normal' }}>{SAMPLE}</div>
  ),
  FontWeight: ({ token }) => <div style={{ fontFamily: BODY_FONT, fontWeight: token.value }}>{SAMPLE}</div>,
  LineHeight: ({ token }) => (
    <div style={{ fontFamily: BODY_FONT, lineHeight: token.value }}>{TEXT}</div>
  ),
  LetterSpacing: ({ token }) => (
    <div style={{ fontFamily: BODY_FONT, letterSpacing: token.value }}>{TEXT}</div>
  ),
};

// Tables that show at full height, with rows that grow to fit their preview and half the table's
// width for it. Primitive Shadow, whose tokens are the parts of each shadow and have no preview,
// shows at full height with the addon's columns.
const FIT_ROWS = ['FontSize', 'LineHeight', 'LetterSpacing', 'Spacing'];
const tableClass = ({ category, presenter }) => {
  if (FIT_ROWS.includes(presenter)) return 'token-rows-fit token-wide-preview';
  return category === 'Primitive / Shadow' ? 'token-rows-fit' : undefined;
};

// The categories on one Design Tokens page, such as `Primitive / Color`, each under its own
// heading. Colors show as cards and the rest as tables, without the addon's search field.
export default function TokenCategories({ page }) {
  return (
    <>
      <p>
        Values are resolved. When Milo declares a token as another token, the description shows
        that reference. Right-click a token to see which C2 blocks read it in their CSS.
      </p>
      {pages[page].map(({ category, heading, presenter }) => (
        <div key={category} className={tableClass({ category, presenter })}>
          <Subheading>{heading}</Subheading>
          <DesignTokenDocBlock
            categoryName={category}
            usageMap={usageMap}
            viewType={presenter === 'Color' ? 'card' : 'table'}
            presenters={presenters}
            showSearch={false}
          />
        </div>
      ))}
    </>
  );
}
