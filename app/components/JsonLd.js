// Server component. Escapes "<" so a stray sequence in catalog copy can never
// close the script tag early.
export function JsonLd({ schema }) {
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
