'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number; 
}

export const getPaginatedOrders = async({page = 1, take = 12}:PaginationOptions) => {
    const session = await auth();

    if(session?.user.role !== 'admin'){
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        take: take,
        skip: (page - 1) * take,
        
        include: {
            OrderAddress: {
                select: {
                    firstName: true,
                    lastName: true
                }
            },
            user: true
        }
    });

    //Obtener el total de paginas
    const totalCount = await prisma.user.count({}); //Total de los usuarios en la base de datos
    const totalPages = Math.ceil(totalCount / take);

    return { 
        ok: true,
        orders: orders,
        totalPages: totalPages
    }
}