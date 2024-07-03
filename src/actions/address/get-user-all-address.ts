"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

//Obtiene todos los valores del address del model allUserAddress
export const getUserAllAddress = async (id: string) => {
  const session = await auth();
  if (!session?.user) {
    //Si no hay sesion del usuario
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }
  try {
    const address = await prisma.allUserAddress.findUnique({
      where: { id: id },
      include: {
        user: {
          include: {
            address: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const addressUnique = await prisma.userAddress.findUnique({
      where: { id: id },
    });

    // Si no se encuentra ninguna de las dos direcciones, lanzar error
    if (!address && !addressUnique) {
      throw new Error(`${id} no existe`);
    }

    // Verificar la propiedad del usuario para cada dirección encontrada
    if (session.user.role === "user") {
      if (address && session.user.id !== address.userId) {
        throw new Error(`${id} no es de este usuario`);
      }
      if (addressUnique && session.user.id !== addressUnique.userId) {
        throw new Error(`${id} no es de este usuario`);
      }
    }

    // Si alguna de las dos direcciones se encuentra, retornar ok
    if (address || addressUnique) {
        let message;
        if(address){
            message = 'No default'
        } else if (addressUnique){
            message = 'Default'
        }
      return {
        ok: true,
        address: address || addressUnique, // Retornar la dirección que se haya encontrado
        message: message
      };
    }

    return {
        ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Orden no existe",
    };
  }
};

