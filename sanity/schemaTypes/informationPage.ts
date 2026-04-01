import { defineField, defineType } from "sanity";

export const informationPage = defineType({
  name: "informationPage",
  title: "Information Page",
  type: "document",
  fields: [
    defineField({ name: "titleLine1", title: "Title Line 1", type: "string", initialValue: "Studio of" }),
    defineField({ name: "titleLine2", title: "Title Line 2", type: "string", initialValue: "Louis Browne" }),
    defineField({ name: "representationLabel", title: "Representation Label", type: "string", initialValue: "U.S. Representation" }),
    defineField({ name: "representationLine1", title: "Representation Line 1", type: "string", initialValue: "Stadium" }),
    defineField({ name: "representationLine2", title: "Representation Line 2", type: "string", initialValue: "Creative Group" }),
    defineField({ name: "bioBigLine1", title: "Bio Headline Line 1", type: "string", initialValue: "Born in London," }),
    defineField({ name: "bioBigLine2", title: "Bio Headline Line 2", type: "string", initialValue: "based in New York" }),
    defineField({
      name: "bioText",
      title: "Bio Paragraphs",
      description: "Each entry is one paragraph.",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({ name: "email", title: "Email", type: "string", initialValue: "browne.louis@gmail.com" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url", initialValue: "https://www.instagram.com/louis_browne/" }),
  ],
  preview: { prepare: () => ({ title: "Information Page" }) },
});
