'use server'

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string, addressId: string) => {
    try {
        await prisma.allUserAddress.delete({ where: { userId: userId, id: addressId } });
        return {
            ok: true,
            message: 'Se elimino la dirección'
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se puedo eliminar la dirección'
        }
    }
}