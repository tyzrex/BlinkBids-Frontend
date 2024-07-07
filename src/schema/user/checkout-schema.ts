import { z } from 'zod';

import { nepalDistricts } from '@/lib/constants';

export const checkoutSchema = z.object({
  name: z.string().nonempty("Name cannot be empty"),
  email: z.string().nonempty("Email cannopt be empty").email(),
    phone: z.string().nonempty("Phone cannot be empty").min(10, "Phone must be atleast 10 characters").max(10),
     address: z.string().nonempty("Street address cannot be empty"),
  district: z.string()
  .nonempty("District cannot be empty")
  .refine(value => nepalDistricts.includes(value), {
    message: 'Invalid District',
  }),
  payment_method: z.enum(['cod', 'esewa', 'khalti']),
  address_description: z.string()
})



export type checkoutSchemaType = z.infer<typeof checkoutSchema>
