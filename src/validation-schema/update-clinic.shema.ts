import z from "zod";
export const UpdateClinicSchema = z.object({
  name: z.string(),
  address: z.string().nullable(),
  profilePictureUrl: z.string().nullable(),
  description: z.string().nullable(),
  appointmentFees: z.string(),
  country: z.string(),
  website: z.string().nullable(),
  city: z.string().nullable(),
});
