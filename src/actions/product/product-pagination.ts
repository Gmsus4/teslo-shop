'use server'

import prisma from "@/lib/prisma"

interface PaginationOptions {
    page?: number;
    take?: number; 
}

export const getPaginatedProductWithImages = async({
    page = 1,
    take = 12
}:PaginationOptions) => {
    if(isNaN( Number(page)) ) page = 1;
    if(page < 1) page = 1;


    try {
        const products = await prisma.product.findMany({ //Obtener todos los productos
            take: take,
            skip: (page - 1) * take,
            include: { //Incluyan 
                ProductImage: { //El ProductImage
                    take: 2, //Tome los primeros dos elementos
                    select: { //Selecciones
                        url: true //El url lo queremos agregar.
                    }
                }
            }
        });

        return {
            currentPage: 1,
            totalPages: 10,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map( image => image.url) //El image es porque asi lo tengo definido en mi interface
            }))
        }
    } catch (error) {
        throw new Error('No se pudo cargar los productos');
    }
}