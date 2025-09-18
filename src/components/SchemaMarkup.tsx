export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Swiftware",
    "url": "https://swiftware.ca",
    "telephone": "+1-604-862-5038",
    "email": "support@swiftware.ca",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Richmond",
      "addressRegion": "BC",
      "addressCountry": "CA"
    },
    "areaServed": ["Canada", "United States"]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}