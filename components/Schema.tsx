export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Plastifusion Plastics",
    url: "https://plastifusionplastics.com",
    logo: "https://plastifusionplastics.com/logo.png",
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