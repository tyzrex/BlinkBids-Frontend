import { z } from 'zod';

export const emiInfoSchema = z.object({
    emi_duration: z.coerce.number(
        {
            required_error: "Please select an EMI mode",
        }
    ),
    downpayment: z.coerce.number(
        {
            required_error: "Please enter a valid number",
        }
    ),
    finance_amount: z.
        coerce.number(
            {
                required_error: "Please enter a valid number",
            }
        )
    ,
    emi_per_month: z.coerce.number(
        {
            required_error: "Please enter a valid number",
        }
    ),
    agreement: z.boolean()
    .refine((agreement) => agreement === true, "Please agree to the terms and conditions"),
    declaration: z.boolean().refine((declaration) => declaration === true, "Please agree to the terms and conditions"),
});

export type EmiInfo = z.infer<typeof emiInfoSchema>;