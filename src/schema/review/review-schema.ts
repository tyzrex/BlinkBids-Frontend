import { z } from 'zod';

export const ReviewSchema = z.object({
  product: z.number({
    required_error: "Product ID is required."
  }).positive(),
  rating: z.number().positive().min(1),
  description: z.string().trim().min(2, { message: "Comment must be 2 or more characters long." }).max(1000, { message: "The comment must not exceed 1000 characters." }),
}); 

export type ReviewSchemaType = z.infer<typeof ReviewSchema>;