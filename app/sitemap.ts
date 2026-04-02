import type { MetadataRoute } from "next";
import { getMotionProjects, getStillsProjects } from "../sanity/lib/queries";

const BASE_URL = "https://www.louisbrowne.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [motionProjects, stillsProjects] = await Promise.all([getMotionProjects(), getStillsProjects()]);

  const projectUrls: MetadataRoute.Sitemap = motionProjects.map((p) => ({
    url: `${BASE_URL}/motion/${p.id}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date("2024-01-01"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const stillsUrls: MetadataRoute.Sitemap = stillsProjects.map((p) => ({
    url: `${BASE_URL}/stills/${p.id}`,
    lastModified: new Date("2026-01-01"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/motion`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/stills`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/information`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectUrls,
    ...stillsUrls,
  ];
}
