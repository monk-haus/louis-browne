import { defineField, defineType } from "sanity";

export const homeProject = defineType({
  name: "homeProject",
  title: "Home Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "video", title: "Hover Video", type: "file", options: { accept: "video/*" } }),
    defineField({ name: "gif", title: "Hover GIF", type: "file", options: { accept: "image/gif" } }),
    defineField({ name: "link", title: "Project Link", description: "Where clicking the thumbnail goes, e.g. /motion/nike-campaign", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "location", media: "thumbnail" } },
});
