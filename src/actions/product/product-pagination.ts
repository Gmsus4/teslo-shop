'use server'

import prisma from "@/lib/prisma"

export const getPaginatedProductWithImages = async() => {
    try {
        const products = await prisma.product.findMany({ //Obtener todos los productos
            // take: 5,
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