import {z} from "zod"

export const PagesSchema = z.object({
    name: z.string({
        required_error: "Page name cannot be empty"
    }),
    content: z.string({
        required_error:"Page description cannot be empty"}
    )
})

export type PagesSchemaType = z.infer<typeof PagesSchema>