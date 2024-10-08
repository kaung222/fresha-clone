import z from "zod";
export const CreateServiceSchema = z.object({
  name: z.string(),
  price: z.number().min(1000).nullable(),
  thumbnailUrl: z.string(),
  averagePeriodPerPatient: z.string().nullable(),
  description: z.string().nullable(),
});
