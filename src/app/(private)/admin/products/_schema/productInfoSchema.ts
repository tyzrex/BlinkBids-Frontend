import { z } from 'zod';

export const productInfoSchema = z.object({
    name: z.string().min(1,"Name cannot be empty"),
    sku: z.string().min(1,"SKU cannot be empty"),
    slug: z.string().min(1,"Slug cannot be empty"),
    short_description: z.string(),
    category: z.any(),
    description: z.string().min(1,"Description cannot be empty"),
    brand: z.any(),
    highlights: z.string(),
    warranty: z.string(),
    status: z.boolean(
        {
            required_error: "Please select a status"
        }
    ),
    emi_available: z.boolean(
        {
            required_error: "Please select a status"
        }
    ),
    campaign: z.any(),

})

export type productInfoSchemaType = z.infer<typeof productInfoSchema>