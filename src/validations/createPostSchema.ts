import { z } from 'zod';

export const postSchema = z.object({
  description: z.string().min(3, { message: 'Description must be at least 3 characters long' }),
});

