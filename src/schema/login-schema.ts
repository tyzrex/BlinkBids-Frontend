import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string(
        {
            required_error:"Email is required"
        }
    ).email(),
    password:z.string(
        {
            required_error:"Password is required",
        }
    )
})

export type LoginSchemaType = z.infer<typeof loginSchema>