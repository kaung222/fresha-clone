import { z } from "zod";

export const CreateInvoiceSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  price: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, {
      message: "Price must be a positive number",
    }),
  quantity: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 1, {
      message: "Quantity must be at least 1",
    }),
  description: z.string().optional().nullable(),
  createdAt: z.string().optional().nullable(),
});
