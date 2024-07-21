'use server'

import { z } from 'zod';
import { postSchema } from '@/validations/createPostSchema';

type PostInput = z.infer<typeof postSchema>;

export async function createPost(userId: number, data: PostInput) {
  const result = postSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  const { description } = result.data;

  try {
    // Aquí iría la lógica para crear un post en la base de datos
    // Por ejemplo:
    // 1. Conectar a la base de datos
    // 2. Crear un nuevo post con los datos recibidos
    // 3. Guardar el post en la base de datos

    console.log('Creando post:', userId);
    console.log('Datos del post:', { description });

    return {
      success: true,
      message: 'Post creado correctamente',
    };

  } catch (error) {
    console.error('Error al crear post:', error);
    return {
      success: false,
      message: 'Error al crear post',
    };
  }
}