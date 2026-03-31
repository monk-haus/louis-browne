import { motionProjects } from "../../home-data";
import ProjectClient from "./project-client";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return motionProjects.map((p) => ({ id: p.id }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = motionProjects.find((p) => p.id === id);
  if (!project) notFound();
  return <ProjectClient project={project} />;
}
