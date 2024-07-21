'user server'

import { z } from 'zod';
import { settingsSchema } from '@/validations/settingsSchema';

type SettingsInput = z.infer<typeof settingsSchema>;

export async function updateSettings(userId: number, data: SettingsInput) {
  const result = settingsSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  const { username, password } = result.data;

  try {
    // Aquí iría la lógica para actualizar la configuración del usuario
    // Por ejemplo:
    // 1. Conectar a la base de datos
    // 2. Actualizar los datos del usuario
    // 3. Guardar los cambios en la base de datos

    console.log('Actualizando configuración:', userId);
    console.log('Datos nuevos:', { username, password });

    return {
      success: true,
      message: 'Configuración actualizada correctamente',
    };

  } catch (error) {
    console.error('Error al actualizar configuración:', error);
    return {
      success: false,
      message: 'Error al actualizar configuración',
    };
  }
}