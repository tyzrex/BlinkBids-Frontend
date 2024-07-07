import {z} from "zod"

export const seoSchema = z.object({
    meta_title: z.string(),
    meta_keywords: z.string(),
    meta_description: z.string(),
    custom_code: z.string(),
})

export type seoSchemaType = z.infer<typeof seoSchema>