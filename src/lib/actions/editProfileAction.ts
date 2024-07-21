'user server'

import { z } from 'zod';
import { editProfileSchema } from '@/validations/editProfileSchema';

type EditProfileInput = z.infer<typeof editProfileSchema>;

export async function editProfile(userId: number, data: EditProfileInput) {
  const result = editProfileSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  const { fullname, description, gender, location, workPlace, personalWebSite } = result.data;

  try {
    // Aquí iría la lógica para actualizar el perfil en la base de datos
    // Por ejemplo:
    // 1. Conectar a la base de datos
    // 2. Actualizar los datos del usuario
    // 3. Si hay una nueva imagen de perfil, subirla y actualizar la URL
    // 4. Guardar los cambios en la base de datos

    console.log('Editando perfil:', userId);
    console.log('Datos nuevos:', { fullname, description, gender, location, workPlace, personalWebSite });

    if (data.profilePicture) {
      console.log('La imagen se procesa aqui');
      // Aquí iría la lógica para subir la imagen a un servicio de almacenamiento
      // y actualizar la URL en la base de datos
    }

    return {
      success: true,
      message: 'Perfil actualizado correctamente',
    };

  } catch (error) {
    console.error('Error al editar perfil:', error);
    return {
      success: false,
      message: 'Error al editar perfil',
    };
  }
}