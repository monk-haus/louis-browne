import type { Metadata } from "next";
import { getStillsProjects, getStillsProjectBySlug } from "../../../sanity/lib/queries";
import StillsProjectClient from "./project-client";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await getStillsProjects();
  return projects.filter((p) => p.id).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await getStillsProjectBySlug(id);
  if (!project) return {};

  return {
    title: project.title,
    description: `${project.title} — photography by Louis Browne.`,
    openGraph: {
      title: `${project.title} | Louis Browne`,
      description: `${project.title} — photography by Louis Browne.`,
      url: `https://www.louisbrowne.co/stills/${id}`,
      ...(project.image ? { images: [{ url: project.image, alt: `${project.title} by Louis Browne` }] } : {}),
    },
  };
}

export default async function StillsProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getStillsProjectBySlug(id);
  if (!project) notFound();
  return <StillsProjectClient project={project} />;
}
