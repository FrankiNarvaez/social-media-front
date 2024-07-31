import { z } from 'zod';

const urlComprobation = /^(ftp|http|https):\/\/[^ "]+$/; // Comprueba que el enlace ingresado por el usuario sea un URL válido

export const editProfileSchema = z.object({
    fullName: z.string().min(5, { message: 'Fullname must be at least 5 characters long' }).optional(),
    description: z.string().max(180, { message: 'Description must be shorter than 180 characters' }).optional(),
    gender: z.string().optional(),
    location: z.string().optional(),
    personalWebSite: z.string()
        .optional()
        .refine(value => value === undefined || urlComprobation.test(value), {
            message: 'Invalid URL format',
        }),
    workPlace: z.string().optional(),
    profileImage: z.instanceof(File).optional(),
    coverImage: z.instanceof(File).optional(),
});
