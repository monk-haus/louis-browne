import type { Metadata } from "next";
import MotionClient from "./motion-client";
import { getMotionProjects } from "../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "Commercial Direction",
  description:
    "Commercial direction by Louis Browne. Campaigns for Nike, Adidas, Dior, Vans, Bulleit and more. Mixed-media approach with a youthful, cinematic style. US rep: Stadium Creative Group.",
  openGraph: {
    title: "Louis Browne — Commercial Director",
    description:
      "Campaigns for Nike, Adidas, Dior, Vans, Bulleit and more. Mixed-media approach with a youthful, cinematic style.",
    url: "https://www.louisbrowne.co/motion",
  },
};

export default async function Motion() {
  const projects = await getMotionProjects();
  return <MotionClient projects={projects} />;
}
