import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://plastifusionplastics.com",
      lastModified: new Date(),
    },
    {
      url: "https://plastifusionplastics.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://plastifusionplastics.com/solutions",
      lastModified: new Date(),
    },
    {
      url: "https://plastifusionplastics.com/infrastructure",
      lastModified: new Date(),
    },
    {
      url: "https://plastifusionplastics.com/contact",
      lastModified: new Date(),
    },
  ];
}