import { z } from 'zod';

export const userSchema = z.object({
    full_name: z
    .string(
        {
            required_error: "Full name cannot be empty",
        }
    )
    .min(3, "Full name must be at least 3 characters"),
    email:z.string(
        {
            required_error: "Email cannot be empty",
        }
    ).email("Please enter a valid email"),
    contact_number: z.string(
        {
            required_error: "Phone cannot be empty",
        }
    ).min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits"),
    address: z.string(
        {
            required_error: "Address cannot be empty",
        }
    ).min(3, "Address must be at least 3 characters"),
    gender: z.enum(["Male","Female","Other"]),
    district: z.string(
        {
            required_error: "District cannot be empty",
        }
    ).min(3, "District must be at least 3 characters"),
})

export type userSchemaType = z.infer<typeof userSchema>