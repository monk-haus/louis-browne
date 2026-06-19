import { defineField, defineType } from "sanity";
import { BatchMediaInput } from "../components/BatchMediaInput";

export const stillsCategory = defineType({
  name: "stillsCategory",
  title: "Stills Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({
      name: "images",
      title: "Media",
      description: "Images, GIFs, and videos. Drag-and-drop, or use 'Upload files (batch)' to add many at once.",
      type: "array",
      of: [
        { type: "image", options: { hotspot: true, accept: "image/*,.tif,.tiff" } },
        { type: "file", title: "Video", options: { accept: "video/*" } },
      ],
      components: { input: BatchMediaInput },
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title" } },
});
