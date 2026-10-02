import { Subheading } from '@storybook/addon-docs/blocks';
import { DesignTokenDocBlock } from 'storybook-design-token';
import { pages, usageMap } from 'virtual:design-tokens';

// The categories on one Design Tokens page, such as `Primitive / Color`, each under its own
// heading. Colors show as cards and the rest as tables. The table of contents scrolls with the
// page instead of in its own fixed panel.
export default function TokenCategories({ page }) {
  return (
    <>
      <style>{'.sbdocs-toc--custom nav { position: static; padding-top: 0; }'}</style>
      <p>
        Values are resolved. When Milo declares a token as another token, the description shows
        that reference. Right-click a token to see which C2 blocks read it in their CSS.
      </p>
      {pages[page].map(({ category, heading, presenter }) => (
        <div key={category}>
          <Subheading>{heading}</Subheading>
          <DesignTokenDocBlock
            categoryName={category}
            usageMap={usageMap}
            viewType={presenter === 'Color' ? 'card' : 'table'}
          />
        </div>
      ))}
    </>
  );
}
