'use server'

import prisma from "@/lib/prisma";

export const getProductByName = async(title: string) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive',
                }
            },
            include: {
                ProductImage: true
            }
            //Encontrar todos los productos dependiendo de su name, pueden ser de varias coincidencias.
        });

        if( !products ) return null; //Si no tenemos un producto

        return products;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener producto por name');
    }
}