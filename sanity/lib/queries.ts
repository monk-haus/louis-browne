import { groq } from "next-sanity";
import { client } from "./client";
import { urlFor } from "./image";
import type { Project, MotionProject, MediaItem, StillsImage, StillsProject } from "../../app/home-data";

function toMediaItems(raw: unknown): MediaItem[] | undefined {
  if (!raw) return undefined;
  return (raw as Record<string, unknown>[]).map((item) => {
    const asset = item.asset as { url?: string; mimeType?: string } | undefined;
    const isVideo = item._type === "file" || (asset?.mimeType?.startsWith("video/") ?? false);
    if (isVideo) {
      return { kind: "video", src: asset?.url ?? "" };
    }
    return {
      kind: "image",
      src: urlFor(item as Parameters<typeof urlFor>[0]).width(1600).format("webp").quality(85).url(),
    };
  });
}

export const homeProjectsQuery = groq`
  *[_type == "homeProject"] | order(order asc) {
    "id": _id,
    title,
    location,
    year,
    thumbnail,
    "video": video.asset->url,
    "gif": gif.asset->url,
    link
  }
`;

export const motionProjectsQuery = groq`
  *[_type == "motionProject"] | order(order asc) {
    "id": "slug:" + slug.current,
    title,
    "slug": slug.current,
    thumbnail,
    "gif": gif.asset->url,
    vimeoIds,
    "images": images[]{_type, ..., "asset": asset->},
    "updatedAt": _updatedAt
  }
`;

export const motionProjectBySlugQuery = groq`
  *[_type == "motionProject" && slug.current == $slug][0] {
    title,
    description,
    thumbnail,
    vimeoIds,
    "images": images[]{_type, ..., "asset": asset->},
    "createdAt": _createdAt
  }
`;

export const stillsProjectsQuery = groq`
  *[_type == "stillsCategory"] | order(order asc) {
    title,
    "slug": slug.current,
    thumbnail,
    "firstImage": images[0]{..., "asset": asset->}
  }
`;

export const stillsProjectBySlugQuery = groq`
  *[_type == "stillsCategory" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    thumbnail,
    "images": images[]{_type, ..., "asset": asset->}
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
    link: (p.link as string | undefined),
  }));
}

export async function getMotionProjects(): Promise<MotionProject[]> {
  const raw = await client.fetch(motionProjectsQuery);
  return raw.map((p: Record<string, unknown>) => ({
    id: p.slug as string,
    title: p.title as string,
    image: p.thumbnail ? urlFor(p.thumbnail as Parameters<typeof urlFor>[0]).width(1200).format("webp").quality(80).url() : "",
    gif: (p.gif as string | undefined),
    vimeoIds: (p.vimeoIds as string[] | undefined),
    images: toMediaItems(p.images),
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
    images: toMediaItems(raw.images),
    description: raw.description as string | undefined,
    createdAt: raw.createdAt as string | undefined,
  };
}

export async function getStillsProjects(): Promise<StillsProject[]> {
  const raw = await client.fetch(stillsProjectsQuery);
  return (raw as Record<string, unknown>[]).map((p) => {
    const thumb = p.thumbnail ?? p.firstImage;
    return {
      id: p.slug as string,
      title: p.title as string,
      image: thumb ? urlFor(thumb as Parameters<typeof urlFor>[0]).width(800).format("webp").quality(80).url() : "",
    };
  });
}

export async function getStillsProjectBySlug(slug: string): Promise<StillsProject | null> {
  const raw = await client.fetch(stillsProjectBySlugQuery, { slug });
  if (!raw) return null;
  return {
    id: raw.slug as string,
    title: raw.title as string,
    image: raw.thumbnail ? urlFor(raw.thumbnail as Parameters<typeof urlFor>[0]).width(800).format("webp").quality(80).url() : "",
    images: toMediaItems(raw.images) ?? [],
  };
}

export async function getStillsImages(): Promise<StillsImage[]> {
  const raw = await client.fetch(stillsProjectsQuery);
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
