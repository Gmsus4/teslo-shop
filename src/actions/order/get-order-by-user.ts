'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number; 
}

export const getOrdersByUser = async({page = 1, take = 12}:PaginationOptions) => {
    const session = await auth();

    if(!session?.user){
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }
    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: session.user.id
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
        const totalCount = await prisma.order.count({ //Total de ordenes de un usuario especifico
            where: {
                userId: session.user.id
            }
        }); 
        const totalPages = Math.ceil(totalCount / take);

        return { 
            ok: true,
            orders: orders,
            totalPages: totalPages
        }
    } catch (error) {
        return { 
            ok: false,
        }
    }
}