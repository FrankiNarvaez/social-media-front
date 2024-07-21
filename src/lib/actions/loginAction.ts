'use server'

import { z } from 'zod';
import { loginSchema } from '@/validations/loginSchema';

type LoginInput = z.infer<typeof loginSchema>;

export async function loginUser(data: LoginInput) {
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  const { email, password } = data;

  try {
    // Aquí iría la lógica para autenticar al usuario
    // Por ejemplo:
    // 1. Buscar el usuario en la base de datos username y email y que sean UNICOS
    // 2. Verificar la contraseña
    // 3. Generar un token de sesión si la autenticación es exitosa
    console.log({ email, password });

    return {
      success: true,
      message: 'User logged in successfully',
    };
  } catch (error) {
    console.error('Error al iniciar sesion:', error);
    return {
      success: false,
      message: 'Error logging in user',
    };
  }
}