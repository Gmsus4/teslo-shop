'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const ChangeUserRole = async(userId: string, role: 'admin' | 'user') => {
    const session = await auth();
    if(session?.user.role !== 'admin'){
        return {
            ok: false,
            message: 'Debe ser un usuario administrador'
        }
    }
    
    try {
        const newRole = role === 'admin' ? 'admin' : 'user';

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                role: newRole
            }
        });

        revalidatePath('/admin/users'); //Poder ver el cambio reflejado en pantalla

        return {
            ok: true
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo actualizar el role, revisar logs'
        }
    }
} 