'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number; 
}

export const getPaginatedUsers = async({page = 1, take = 12}:PaginationOptions) => {
    const session = await auth();
    if( session?.user.role !== 'admin' ){
        return {
            ok: false,
            message: 'Debe de ser un usuario administrador'
        }
    }

    const users = await prisma.user.findMany({
        take: take,
        skip: (page - 1) * take,
        orderBy: {
            name: 'asc'
        }
    });

    //2. Obtener el total de paginas
    const totalCount = await prisma.user.count({}); //Total de los usuarios en la base de datos
    const totalPages = Math.ceil(totalCount / take);

    return {
        ok: true,
        users: users,
        totalPages: totalPages
    }
}