import { Controls, Description, Primary, Stories, Subheading, Subtitle, Title, useOf } from '@storybook/addon-docs/blocks';

// Storybook's Docs page with Live Examples after the description: links to the adobe.com pages
// in the file's `liveExamples` parameter, each named by its breadcrumbs. The links open in a new
// tab.
export default function Page() {
  const { csfFile, preparedMeta } = useOf('meta', ['meta']);
  const isSingleStory = Object.keys(csfFile.stories).length === 1;
  const links = preparedMeta.parameters.liveExamples ?? [];
  return (
    <>
      <Title />
      <Subtitle />
      <Description of="meta" />
      {isSingleStory && <Description of="story" />}
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
      <Primary />
      <Controls />
      {!isSingleStory && <Stories />}
    </>
  );
}
