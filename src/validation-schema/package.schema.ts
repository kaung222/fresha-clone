import { z } from "zod";

export const PackageSchema = z.object({
    targetGender: z.enum(["male", "female", "all"]),
    memberIds: z.array(z.number().int()),
    name: z.string(),
    categoryId: z.number().int(),
    description: z.string(),
    serviceIds: z.array(z.number().int()),
    discount: z.number().nonnegative(),
    discountType: z.enum(["fixed", "percentage"]),
});
