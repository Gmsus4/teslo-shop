'use server'

import prisma from "@/lib/prisma";

export const getProductBySlug = async( slug: string ) => {
    try {
        const product = await prisma.product.findFirst({ //Encuentra el primer producto
            where: { //Donde el slug sea igual al slug que estoy recibiendo
                slug: slug
            },
            include: { //Que incluya el ProductImage, seleccionando solamente el url
                ProductImage: {
                    select: {
                        url: true
                    }
                }
            }
        })

        if( !product ) return null; //Si no tenemos un producto

        return {
            ...product, //Retorna todos los productos
            images: product.ProductImage.map(image => image.url) //Ademas retorna images: todas las imagenes
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener producto por slug');
        
    }
}