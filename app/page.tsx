import type { Metadata } from "next";
import HomeClient from "./home-client";
import { getHomeProjects } from "../sanity/lib/queries";

export const metadata: Metadata = {
  title: {
    absolute: "Louis Browne — Photographer & Director, New York",
  },
  description:
    "London-born, New York-based photographer and director. Commercial work for Nike, Dior, Gucci and Adidas. Editorial in British Vogue and Rolling Stone. Available for projects globally.",
  openGraph: {
    title: "Louis Browne — Photographer & Director, New York",
    description:
      "London-born, New York-based photographer and director. Commercial work for Nike, Dior, Gucci and Adidas. Editorial in British Vogue and Rolling Stone.",
    url: "https://www.louisbrowne.co",
  },
};

export default async function Home() {
  const projects = await getHomeProjects();
  return <HomeClient projects={projects} />;
}
