import type { Metadata } from "next";
import StillsClient from "./stills-client";
import { getStillsProjects } from "../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Editorial and commercial photography by Louis Browne. Portraits, fashion and music — featured in British Vogue, Rolling Stone and Wonderland. Clients include Gucci, Calvin Klein and Delta.",
  openGraph: {
    title: "Louis Browne — Editorial & Commercial Photographer",
    description:
      "Featured in British Vogue, Rolling Stone and Wonderland. Clients include Gucci, Calvin Klein and Delta.",
    url: "https://www.louisbrowne.co/stills",
  },
};

export default async function Stills() {
  const projects = await getStillsProjects();
  return <StillsClient projects={projects} />;
}
