import {z} from 'zod'

export const addBrandSchema = z.object({
    name: z.string().min(1, "Name cannot be empty"),
    description: z.string(),
    image: z.any(),
    slug: z.string(),
    meta_title: z.string(),
    meta_description: z.string(),
    meta_keywords: z.string(),
    custom_code: z.string(),
})

export type addBrandSchemaType = z.infer<typeof addBrandSchema>