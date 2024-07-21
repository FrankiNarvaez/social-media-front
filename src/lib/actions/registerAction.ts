'use server'

import { z } from 'zod';
import { registerSchema } from '@/validations/registerSchema';

type RegisterInput = z.infer<typeof registerSchema>;

export async function registerUser(data: RegisterInput) {
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  const { username, email, password } = data;

  try {
    // Logica para registrar al usuario

    console.log ({ username, email, password });

    return {
      success: true,
      message: 'User registered successfully',
    };
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return {
      success: false,
      message: 'Error registering user',
    };
  }
}
