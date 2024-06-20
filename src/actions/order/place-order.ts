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

    //console.log(productIds) => 
    // {
    //     products: [
    //       {
    //         productId: '2d72286e-7f83-4d6b-a4c8-08ca3e8fa24b',
    //         quantity: 2,
    //         size: 'S'
    //       },
    //       {
    //         productId: '2d72286e-7f83-4d6b-a4c8-08ca3e8fa24b',
    //         quantity: 1,
    //         size: 'XS'
    //       },
    //       {
    //         productId: '0325a664-0f0c-448f-b729-5773475c6ece',
    //         quantity: 5,
    //         size: 'M'
    //       }
    //     ],
    //     message: 'Estos son los productIds'
    // }
    
    if(!userId){
        return {
            ok: false,
            message: 'No hay sesión de usuario'
        }
    }

    //Obtener la información de los productos
    //Nota: recuerden que podemos llevar 2+ productos con el mismo ID
    const products = await prisma.product.findMany({//Buscar los productos que coincidan con el id de productIds(Productos en el carrito que muestran el id, quantity y size)
        where: {
            id: {
                in: productIds.map(p => p.productId)
            }
        }
    })
    //console.log(products)
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
    const { subTotal, tax, total } = productIds.reduce((totals, item) => {
        const productQuantity = item.quantity; //Obtiene la cantidad del primer producto iterado
        const product = products.find(product => product.id === item.productId); //Encutra el primer producto que coincida con el id

        if( !product ) throw new Error(`${item.productId} no existe - 500`);//Si no existe el producto mostrar un error

        const subTotal = product.price * productQuantity; //Obtiene el subtotal multiplicando el precio del producto(DB) por la cantidad del producto

        totals.subTotal += subTotal; //Ahora si, modificamos el valor del currentValue para añadirle el subTotal
        totals.tax += subTotal * 0.15; //Hacemos lo mismo con el tax, que es multiplicar el subtotal por 0.15
        totals.total += subTotal * 1.15;// Y con el total que es el subTotal por 1.15

        //Vuelve a iterar los demas productos y empezara a hacer las sumas correspondientes

        return totals
    }, {subTotal: 0, tax: 0, total: 0}) //Valor inicial

    // console.log({ subTotal, tax, total })

    //Crear la transacción de base de datos
    const prismaTx = await prisma.$transaction(async(tx) => {
        // 1. Actualizar el stock de los productos




        // 2. Crear la orden - Encabezado - Detalles



        // 3. Crear la dirección de la orden
        
        

        return {
            orden: 123,
            updatedProducts: [],
            orderAddress: {}
        }
    });




























    //1. Se obtiene la data de los productos en el carrito como son el id, quantity y el size de productIds mediante los parámetros (un mapeo del cart que viene del store que mostrara el id, quantity y el size respectivos)
    //2. Obtener la información de la sesión del usuario y validar si esta existe
    //3. Obtener toda la información de los productos "products" de la base de datos que coincidan con el id de los "productIds" (Los que están en el store que se pasaron como parámetros)
    //4. Calcular el número de productos que están en el carrito mediante un reduce en el "productIds"
    //5. Calcular el subTotal, total y tax mediante un reduce en el "productIds"
        //5.1 Obtenemos la cantidad del producto iterado (Por cada iteración)
        //5.2 Encontrar el producto de los "products" que coincida con el id de los "productIds" para así obtener más información como lo es el precio de este
        //5.3 Condicional por si el producto no existe (Que en realdiad siempre debería de existir)
        //5.4 Obtener el subTotal del precio del producto, multiplicando el product.price(Es de donde sacamos más información del producto - "products") por el productQuantity, es aquel que sacamos la cantidad de productos a llevar "productIds"
        //5.5 Establecer los totals (los currentValue) para que sigan con su iteración y al final obtengan los resultados | totals.subTotal, totals.tax y totals,total
    //6. Finalmente retornamos los totals, los valores ya hechos.
}