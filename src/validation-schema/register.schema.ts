import z from "zod";
export const RegisterSchema = z.object({
  name: z.string().min(2, {
    message: "Clinic name must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Use strong password"),
  phone: z.string().min(5, "use valid phone number"),
  address: z.string(),
  city: z.string(),
  description: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  type: z.string(),
  clinicTypeId: z.string(),
});
