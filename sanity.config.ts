import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "louis-browne",
  title: "Louis Browne",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("homeProject").title("Home Projects"),
            S.documentTypeListItem("motionProject").title("Motion Projects"),
            S.documentTypeListItem("stillsCategory").title("Stills"),
            S.listItem()
              .title("Information Page")
              .child(
                S.document()
                  .schemaType("informationPage")
                  .documentId("informationPage")
              ),
          ]),
    }),
    visionTool(),
    media(),
  ],
  schema: { types: schemaTypes },
});
