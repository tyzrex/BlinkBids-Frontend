import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string(
        {
            required_error: "Email is required"
        }).email(
        {
            message: "Invalid email"
        }),
    password: z.string(
        {
            required_error: "Password is required"
        }).min(6,
        {
            message: "Password must be at least 6 characters"
        }),

})


export type loginSchemaType = z.infer<typeof loginSchema>
    