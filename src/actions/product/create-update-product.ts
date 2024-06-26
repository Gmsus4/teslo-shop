'use server' // Indica que este archivo se ejecutará en el lado del servidor

import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client'; // Importa el enum Gender desde Prisma Client
import { z } from 'zod'; // Importa la biblioteca zod para validación de esquemas

// Define el esquema del producto utilizando zod
const productSchema = z.object({
    id: z.string().uuid().optional().nullable(), // String tipo UUID que es opcional y puede ser nulo
    title: z.string().min(3).max(255), // String que debe tener entre 3 y 255 caracteres
    slug: z.string().min(3).max(255), // String que debe tener entre 3 y 255 caracteres
    description: z.string(), // String sin restricciones de longitud
    price: z.coerce
        .number() // Coerce para asegurar que sea un número
        .min(0) // El precio debe ser al menos 0
        .transform(val => Number(val.toFixed(2))), // Transforma el número a dos decimales
    inStock: z.coerce
        .number() // Coerce para asegurar que sea un número
        .min(0) // La cantidad en stock debe ser al menos 0
        .transform(val => Number(val.toFixed(0))), // Transforma el número a un entero
    categoryId: z.string().uuid(), // String tipo UUID
    sizes: z.coerce.string().transform(val => val.split(',')), // Convierte una cadena de texto en un array separando por comas
    tags: z.string(), // String sin restricciones de longitud
    gender: z.nativeEnum(Gender) // Enum nativo de Prisma para el género
});

// Función asincrónica para crear o actualizar un producto
export const createUpdateProduct = async (formData: FormData) => {
    const data = Object.fromEntries(formData); // Convierte FormData en un objeto
    const productParsed = productSchema.safeParse(data); // Valida el objeto contra el esquema definido

    if (!productParsed.success) { // Si la validación falla
        console.log(productParsed.error); // Imprime los errores de validación en la consola
        return {
            ok: false // Retorna un objeto indicando que la operación no fue exitosa
        };
    }

    const product = productParsed.data;
    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

    const { id, ...rest } = product;

    const primsaTx = await prisma.$transaction(async (tx) => {

        let product: Product;
        const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());

        if(id){
            //Actualizar
            product = await prisma.product.update({
                where: { id: id },
                data: {
                    ...rest,
                    sizes: {
                        set: rest.sizes as Size[]
                    },
                    tags: {
                        set: tagsArray
                    }
                }
            });

            console.log({ updatedProduct: product});
        } else {
            //Crear
        }

        return {

        }
    });
    //Todo: RevalidatePaths
    return {
        ok: true // Retorna un objeto indicando que la operación fue exitosa
    };
};
