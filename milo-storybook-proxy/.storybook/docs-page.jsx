import { DocsPage, Subheading, useOf } from '@storybook/addon-docs/blocks';

// Storybook's Docs page, followed by Live Examples: links to the adobe.com pages in the file's
// `liveExamples` parameter, each named by its breadcrumbs. The links open in a new tab.
export default function Page() {
  const { preparedMeta } = useOf('meta', ['meta']);
  const links = preparedMeta.parameters.liveExamples ?? [];
  return (
    <>
      <DocsPage />
      {links.length > 0 && (
        <>
          <Subheading>Live Examples</Subheading>
          <ul>
            {links.map(({ path, url }) => (
              <li key={url}><a href={url} target="_blank" rel="noreferrer">{path}</a></li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
