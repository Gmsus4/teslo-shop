'use server'

import { Size } from "@/interfaces";
import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import {
    Product,
    ProductImage as ProductWithImage,
  } from "@/interfaces";
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

// interface Props {
//     product: {
//         images: string[];
//         ProductImage: {
//             id: number;
//             url: string;
//             productId: string;
//         }[];
//         id: string;
//         title: string;
//         description: string;
//         inStock: number;
//         price: number;
//         sizes: Size[];
//         slug: string;
//         tags: string[];
//         gender: Gender;
//         categoryId: string;
//     } | null
// }

interface Props {
    product: Partial<Product> & { ProductImage?: ProductWithImage[] };
}

export const deleteProduct = async({product}:Props) => {
    if(!product){
        return {
            ok: false
        }
    }

    const imageDeletionPromises = product.images!.map(async(image) => {
        if(!image.startsWith('http')){
            return {
                ok: false,
                message: 'No se pueden borrar las imagenes de FS'
            }
        }

        const imageName = image
            .split('/')
            .pop()
            ?.split('.')[0] ?? '';
    
        await cloudinary.uploader.destroy(`teslo-shop/products/${ imageName }`)
    })

    await Promise.all(imageDeletionPromises);

    try {
        await prisma.productImage.deleteMany({
            where: {productId: product?.id}
        });
    
        await prisma.product.delete({
            where: { id: product?.id }
        })

        revalidatePath(`/admin/products`);

        return {
            ok: true
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false
        }
    }
}