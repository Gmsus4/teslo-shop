'use server'

import { auth } from "@/auth.config";
import type { Size, Address } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async( productIds: ProductToOrder[], address: Address) => {
    const session = await auth();
    const userId = session?.user.id;

    //Verificar sesión de usuario
    if(!userId){
        return {
            ok: false,
            message: 'No hay sesión de usuario'
        }
    }

    //Obtener la información de los productos
    //Nota: recuerden que podemos llevar 2+ productos con el mismo ID
    const products = await prisma.product.findMany({//Buscar en la tabla de porductos todos los productos cuyo id exista en este arreglo de productIds
        where: {
            id: {
                in: productIds.map(p => p.productId)
            }
        }
    })

    //console.log(products); r => 
    // [
    //     {
    //       id: '0325a664-0f0c-448f-b729-5773475c6ece',
    //       title: 'Kids Cyberquad Bomber Jacket',
    //       description: 'Wear your Kids Cyberquad Bomber Jacket during your adventures on Cyberquad for Kids. The bomber jacket features a graffiti-style illustration of our Cyberquad silhouette and wordmark. With three zippered pockets and our signature T logo and Tesla wordmark printed along the sleeves, Kids Cyberquad Bomber Jacket is perfect for wherever the trail takes you. Made from 60% cotton and 40% polyester.',
    //       inStock: 10,
    //       price: 65,
    //       sizes: [ 'XS', 'S', 'M' ],
    //       slug: 'kids_cyberquad_bomber_jacket',
    //       tags: [ 'shirt' ],
    //       gender: 'kid',
    //       categoryId: 'e7c46165-5e62-4b09-a248-446e2db87fb2'
    //     },
    //     {
    //       id: '2d72286e-7f83-4d6b-a4c8-08ca3e8fa24b',
    //       title: 'Zero Emissions (Almost) Onesie',
    //       description: 'Show your commitment to sustainable energy with this cheeky onesie for your young one. Note: Does not prevent emissions. 100% Cotton. Made in Peru.',
    //       inStock: 10,
    //       price: 30,
    //       sizes: [ 'XS', 'S' ],
    //       slug: 'zero_emissions_(almost)_onesie',
    //       tags: [ 'shirt' ],
    //       gender: 'kid',
    //       categoryId: 'e7c46165-5e62-4b09-a248-446e2db87fb2'
    //     }
    //   ]

    //Calcular los montos //Encabezado
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity ,0);
    //console.log(itemsInOrder); r => 8

    // Los totales de tax, subtotal

    // return {
    //     ok: false,
    //     message: 'Algo salio mal'
    // }
}