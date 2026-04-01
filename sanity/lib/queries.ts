import { groq } from "next-sanity";
import { client } from "./client";
import { urlFor } from "./image";
import type { Project, MotionProject, StillsImage } from "../../app/home-data";

export const homeProjectsQuery = groq`
  *[_type == "homeProject"] | order(order asc) {
    "id": _id,
    title,
    location,
    year,
    thumbnail,
    "video": video.asset->url,
    "gif": gif.asset->url
  }
`;

export const motionProjectsQuery = groq`
  *[_type == "motionProject"] | order(order asc) {
    "id": "slug:" + slug.current,
    title,
    "slug": slug.current,
    thumbnail,
    vimeoIds,
    "images": images[]{..., "asset": asset->},
    "updatedAt": _updatedAt
  }
`;

export const motionProjectBySlugQuery = groq`
  *[_type == "motionProject" && slug.current == $slug][0] {
    title,
    description,
    thumbnail,
    vimeoIds,
    "images": images[]{..., "asset": asset->},
    "createdAt": _createdAt
  }
`;

export const stillsQuery = groq`
  *[_type == "stillsCategory"] | order(order asc) {
    title,
    "images": images[]{..., "asset": asset->}
  }
`;

export const informationPageQuery = groq`
  *[_type == "informationPage"][0] {
    titleLine1,
    titleLine2,
    representationLabel,
    representationLine1,
    representationLine2,
    bioBigLine1,
    bioBigLine2,
    bioText,
    email,
    instagramUrl
  }
`;

export async function getHomeProjects(): Promise<Project[]> {
  const raw = await client.fetch(homeProjectsQuery);
  return raw.map((p: Record<string, unknown>) => ({
    id: p.id as string,
    title: p.title as string,
    location: (p.location as string) ?? "",
    year: (p.year as string) ?? "",
    image: p.thumbnail ? urlFor(p.thumbnail as Parameters<typeof urlFor>[0]).width(1200).format("webp").quality(80).url() : "",
    video: (p.video as string | undefined),
    gif: (p.gif as string | undefined),
  }));
}

export async function getMotionProjects(): Promise<MotionProject[]> {
  const raw = await client.fetch(motionProjectsQuery);
  return raw.map((p: Record<string, unknown>) => ({
    id: p.slug as string,
    title: p.title as string,
    image: p.thumbnail ? urlFor(p.thumbnail as Parameters<typeof urlFor>[0]).width(1200).format("webp").quality(80).url() : "",
    vimeoIds: (p.vimeoIds as string[] | undefined),
    images: p.images
      ? (p.images as Record<string, unknown>[]).map((img) =>
          urlFor(img as Parameters<typeof urlFor>[0]).width(1600).format("webp").quality(85).url()
        )
      : undefined,
    updatedAt: p.updatedAt as string | undefined,
  }));
}

export async function getMotionProjectBySlug(slug: string): Promise<MotionProject | null> {
  const raw = await client.fetch(motionProjectBySlugQuery, { slug });
  if (!raw) return null;
  return {
    id: slug,
    title: raw.title as string,
    image: raw.thumbnail ? urlFor(raw.thumbnail as Parameters<typeof urlFor>[0]).width(1200).format("webp").quality(80).url() : "",
    vimeoIds: raw.vimeoIds as string[] | undefined,
    images: raw.images
      ? (raw.images as Record<string, unknown>[]).map((img) =>
          urlFor(img as Parameters<typeof urlFor>[0]).width(1600).format("webp").quality(85).url()
        )
      : undefined,
    description: raw.description as string | undefined,
    createdAt: raw.createdAt as string | undefined,
  };
}

export async function getStillsImages(): Promise<StillsImage[]> {
  const raw = await client.fetch(stillsQuery);
  const result: StillsImage[] = [];
  for (const category of raw as { title: string; images: Record<string, unknown>[] }[]) {
    for (const img of category.images ?? []) {
      result.push({
        src: urlFor(img as Parameters<typeof urlFor>[0]).width(1600).format("webp").quality(85).url(),
        title: category.title,
      });
    }
  }
  return result;
}

export async function getInformationPage() {
  return client.fetch(informationPageQuery);
}
