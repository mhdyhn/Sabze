import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mhdyhn.github.io/Sabze/",
      lastModified: new Date(),
    },
  ];
}
