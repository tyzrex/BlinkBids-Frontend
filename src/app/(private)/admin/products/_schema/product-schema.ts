import { z } from "zod";

export const productSchema = z
  .object({
    name: z
      .string({
        required_error: "Name cannot be empty",
      })
      .min(1, "Name cannot be empty"),
    sku: z
      .string({
        required_error: "SKU cannot be empty",
      })
      .min(1, "SKU cannot be empty"),
    slug: z
      .string({
        required_error: "Slug cannot be empty",
      })
      .min(1, "Slug cannot be empty"),
    short_description: z.string(),
    category: z.any(),
    description: z
      .string({
        required_error: "Description cannot be empty",
      })
      .min(1, "Description cannot be empty"),
    brand: z.any(),
    highlights: z.string(),
    warranty: z.string(),
    status: z.boolean({
      required_error: "Please select a status",
    }),
    emi_available: z.boolean({
      required_error: "Please select a status",
    }),
    campaign: z.any(),
    meta_title: z.string(),
    meta_keywords: z.string(),
    meta_description: z.string(),
    custom_code: z.string().optional(),
    price: z.coerce
      .number({
        required_error: "Price cannot be empty",
      })
      .refine((data) => data > 0, {
        message: "Price should be greater than 0",
      }),
    discounted_price: z.coerce.number().optional(),
    images: z.array(z.string()).optional(),
    new_images: z.array(z.instanceof(File)).optional(),
  })
  .partial()
  .refine(
    (data) =>
      data.discounted_price ? data.discounted_price <= (data.price ?? 0) : true,
    {
      message: "Discounted price should be less than actual price",
      path: ["discounted_price"],
    }
  );

export type productSchemaType = z.infer<typeof productSchema>;
