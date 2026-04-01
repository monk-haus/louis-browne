import type { Metadata } from "next";
import { getMotionProjects, getMotionProjectBySlug } from "../../../sanity/lib/queries";
import ProjectClient from "./project-client";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await getMotionProjects();
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await getMotionProjectBySlug(id);
  if (!project) return {};

  const title = project.title;
  const description =
    project.description ?? `${title} — directed by Louis Browne. Commercial direction, New York.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Louis Browne`,
      description,
      url: `https://www.louisbrowne.co/motion/${id}`,
      ...(project.image ? { images: [{ url: project.image, width: 1200, height: 630, alt: `${title} directed by Louis Browne` }] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getMotionProjectBySlug(id);
  if (!project) notFound();

  const description =
    project.description ?? `${project.title} — directed by Louis Browne. Commercial direction, New York.`;

  const schema = project.vimeoIds?.length
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: project.title,
        description,
        thumbnailUrl: project.image || undefined,
        uploadDate: project.createdAt,
        embedUrl: `https://player.vimeo.com/video/${project.vimeoIds[0]}`,
        url: `https://vimeo.com/${project.vimeoIds[0]}`,
        director: {
          "@type": "Person",
          name: "Louis Browne",
          url: "https://www.louisbrowne.co",
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description,
        image: project.image || undefined,
        url: `https://www.louisbrowne.co/motion/${id}`,
        creator: {
          "@type": "Person",
          name: "Louis Browne",
          url: "https://www.louisbrowne.co",
        },
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ProjectClient project={project} />
    </>
  );
}
