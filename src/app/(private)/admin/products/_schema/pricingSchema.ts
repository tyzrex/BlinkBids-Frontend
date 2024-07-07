import { z } from "zod";

export const pricingSchema = z
  .object({
    price: z.coerce.number(),
    discounted_price: z.coerce.number().optional(),
  })
  .refine((data) => data.price > 0, {
    message: "Price should be greater than 0",
    path: ["price"],
  })
  .refine(
    (data) =>
      data.discounted_price ? data.discounted_price < data.price : true,
    {
      message: "Discounted price should be less than actual price",
      path: ["discounted_price"],
    }
  );

export type PricingType = z.infer<typeof pricingSchema>;
