'use server'

import prisma from "@/lib/prisma"

export const getPaginatedProductWithImages = async() => {
    try {
        const products = await prisma.product.findMany({ //Obtener todos los productos
            include: { //Incluyan 
                ProductImage: { //El ProductImage
                    take: 2, //Tome los primeros dos elementos
                    select: { //Selecciones
                        url: true //El url lo queremos agregar.
                    }
                }
            }
        });

        console.log(products);
    } catch (error) {
        
    }
}