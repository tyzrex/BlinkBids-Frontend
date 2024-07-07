import { z } from 'zod';

export const addBlogSchema = z.object({
    title: z.string().min(1, "Title cannot be empty"),
    slug: z.string().min(1, "Slug cannot be empty"),
    content: z.string().min(1, "Description cannot be empty"),
    short_desc : z.string().min(1, "Short Description cannot be empty"),
    meta_title: z.string().min(1, "Meta Title cannot be empty"),
    meta_description: z.string().min(1, "Meta Description cannot be empty"),
    meta_keywords: z.string().min(1, "Meta Keywords cannot be empty"),
    status: z.boolean(),
})

export type addBlogSchemaType = z.infer<typeof addBlogSchema>