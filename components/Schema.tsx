export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Plastifusion Plastics",
    url: "https://www.plastifusionplastics.com",
    logo: "https://www.plastifusionplastics.com/logo.png",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}