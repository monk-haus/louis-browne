import { defineField, defineType } from "sanity";

export const motionProject = defineType({
  name: "motionProject",
  title: "Motion Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({
      name: "vimeoIds",
      title: "Vimeo Video IDs",
      description: "Paste the Vimeo video ID or path (e.g. 1125595435 or louisbrowne23/nike). Add a second entry for projects with two videos.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      title: "Still Images",
      description: "Images shown below the video on the project page.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true, accept: "image/*,.tif,.tiff" } }],
    }),
    defineField({
      name: "description",
      title: "SEO Description",
      description: "Used in search engine results and social sharing. ~150 characters.",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", media: "thumbnail" } },
});
