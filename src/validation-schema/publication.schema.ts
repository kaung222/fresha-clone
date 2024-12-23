import { z } from 'zod';

export const PublicationBasicSchema = z.object({
    name: z.string().nonempty("Name is required"),
    phones: z.array(z.string()).min(1, "At least one phone number is required"),
    notes: z.string().optional(),
});
export const PublicationBasicFormSchema = z.object({
    thumbnail: z.string().url("Invalid URl Format").optional(),
    name: z.string().nonempty("Name is required"),
    main_phone: z.string().regex(/^[0-9+()-\s]+$/).min(1),
    secondary_phone: z.string().optional(),
    notes: z.string().optional(),
});

export const PublicationLocationSchema = z.object({
    address: z.string().nonempty("Address is required"),
    latitude: z.string().nonempty("Latitude is required"),
    longitude: z.string().nonempty("Longitude is required"),
});

export const PublicationImagesSchema = z.object({
    images: z
        .array(z.string().nonempty())
        .min(3, "At least 3 images are required")
        .max(6, "No more than 6 images are allowed"),
});

export const PublicationTypesSchema = z.object({
    types: z.array(z.string()).min(1).max(3),
});

