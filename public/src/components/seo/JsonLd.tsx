/**
 * Renders one or more JSON-LD structured-data blocks.
 * @param props Holds `data`: a single schema object or an array of them.
 * @returns Script tags containing the serialized JSON-LD.
 */
export function JsonLd(props: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const items = Array.isArray(props.data) ? props.data : [props.data];

  return (
    <>
      {items.map((item) => (
        <script
          key={JSON.stringify(item)}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is built from trusted server-side config, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
