'use server'

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
    try {
        await prisma.userAddress.delete({ where: { userId: userId } });
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