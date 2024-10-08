import z from "zod";
export const CreateDoctorSchema = z.object({
  // serviceIds: z.array(z.string()),
  name: z.string(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Use valid phone number"),
  specialityId: z.string(),
  description: z.string(),
  gender: z.string().nullable(),
  profilePictureUrl: z.string().nullable(),
});
