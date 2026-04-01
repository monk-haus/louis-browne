import type { Metadata } from "next";
import InfoClient from "./info-client";
import { getInformationPage } from "../../sanity/lib/queries";

export const metadata: Metadata = {
  title: {
    absolute: "About — Louis Browne, Photographer & Director",
  },
  description:
    "Louis Browne is a photographer and director born in London, based in New York. He's shot for Gucci, Nike, Dior and Adidas and worked with Billie Eilish, Olivia Rodrigo and The 1975. US rep: Stadium Creative Group.",
  openGraph: {
    title: "About Louis Browne — London-born NYC Photographer & Director",
    description:
      "Shot for Gucci, Nike, Dior and Adidas. Worked with Billie Eilish, Olivia Rodrigo and The 1975. Based in New York.",
    url: "https://www.louisbrowne.co/information",
  },
};

export default async function Information() {
  const data = await getInformationPage();
  return <InfoClient data={data} />;
}
