import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const commonSchema = z.object({
  has_credit_card: z.boolean(),
  bank: z.string().nonempty('Bank cannot be empty'),
});

export const hasCardBankSchema = commonSchema.extend({
  credit_card_number: z.string({
  required_error: "Credit card number can't be empty"
}).refine((val) => {
  // Remove spaces for digit count validation
  const digitsOnly = val.replace(/\s+/g, '');
  return digitsOnly.length === 16;
}, {
  message: "Credit card number should be 16 digits"
}).refine((val) => {
  // Check for only digits and spaces, and format
  return /^(\d{4} \d{4} \d{4} \d{4})$/.test(val);
}, {
  message: "Credit card number should be numeric and formatted as 'XXXX XXXX XXXX XXXX'"
}),
  credit_card_limit: z.coerce.number({
    required_error: "Credit card limit cant be empty"
  }),
  credit_card_name: z.string().nonempty('Card name cannot be empty'),
  credit_card_expiration: z.string().nonempty('Card expiry cannot be empty')
    .refine((val) => val.length === 5, {
      message: "Card expiry should be in MM/YY format"
    }).refine((val) => {
      const [month, year] = val.split('/');
      return parseInt(month) > 0 && parseInt(month) <= 12 && parseInt(year) > 0;
    }
    , {
      message: "Invalid expiry date"
    }),
});

export const noCardBankSchema = commonSchema.extend({
  residential_status: z.string({
    required_error: "Residential status cant be empty"
  }),
  nationality: z.enum(["nepali","others"]),
  dob_ad: z.string(
        {
            required_error: "Date of birth cannot be empty",
        }
    ),
  num_dependents: z.string().nonempty('No of dependents cannot be empty'),
  occupation: z.string().nonempty('Occupation cannot be empty'),
  monthly_income: z.string().nonempty('Monthly income cannot be empty'),
  employment_length: z.string().nonempty('Length of employment cannot be empty'),
  salary_certificate:z.any().refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .refine((files) => files?.[0]?.size < MAX_FILE_SIZE, `Max image size is 5MB.`),
//   citizenship_copy: z.string().nonempty('Citizenship cannot be empty'),
//   passport_photo: z.string().nonempty('Passport size photo cannot be empty'),
//   bank_statement: z.string().nonempty('Bank statement cannot be empty'),
    citizenship_copy:z.any().refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
        .refine((files) => files?.[0]?.size < MAX_FILE_SIZE, `Max image size is 5MB.`),
    passport_photo:z.any().refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
        .refine((files) => files?.[0]?.size < MAX_FILE_SIZE, `Max image size is 5MB.`),
    bank_statement:z.any().refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
        .refine((files) => files?.[0]?.size < MAX_FILE_SIZE, `Max image size is 5MB.`),

});

export type hasCardBankSchemaType = z.infer<typeof hasCardBankSchema>;
export type noCardBankSchemaType = z.infer<typeof noCardBankSchema>;
