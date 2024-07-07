import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const heroBannerSchema = z.object({
    link:z.string(
        {
            required_error: "Link is required"
        }
    )
    .url(
        {
            message: "Link must be a valid URL"
        }
    ),  
    // name:z.string(
    //     {
    //         required_error: "Name is required"
    //     }
    // )
    // ,
     images:z.any().refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      )
      .refine((files) => files?.[0]?.size < MAX_FILE_SIZE, `Max image size is 5MB.`),
      
    }
)

export type HeroBannerSchemaType = z.infer<typeof heroBannerSchema>