import { z } from "zod";

export const addBlogSchema = z.object({
  // name: z.string().min(1, "Name cannot be empty"),
  // description: z.string(),
  // image: z.any(),
  // slug: z.string(),
  // meta_title: z.string(),
  // meta_description: z.string(),
  // meta_keywords: z.string(),
  // custom_code: z.string(),
  title: z.string().min(1, "Title cannot be empty"),
  category: z.coerce.number(),
  slug: z.string().min(1, "Slug is required"),
  author: z.string().min(1, "Author cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
  short_desc: z.string().min(1, "Short Description cannot be empty"),
  image: z.any(),
  publish_date: z.string().min(1, "Publish Date cannot be empty"),
  meta_title: z.string().min(1, "Meta Title cannot be empty"),
  meta_description: z.string().min(1, "Meta Description cannot be empty"),
  meta_keywords: z.string().min(1, "Meta Keywords cannot be empty"),
  status: z.enum(["draft", "published"]),
  is_featured: z.any(),
});

export type addBlogSchemaType = z.infer<typeof addBlogSchema>;
