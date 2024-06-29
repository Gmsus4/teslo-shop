'use server' // Indica que este archivo se ejecutará en el lado del servidor

import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client'; // Importa el enum Gender desde Prisma Client
import { revalidatePath } from 'next/cache';
import { z } from 'zod'; // Importa la biblioteca zod para validación de esquemas
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

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

    try {
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
    
            } else {
                //Crear
                product = await prisma.product.create({
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[]
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                })
            }
    
            //Proceso de carga y guardado de imagenes
            //Recorrer las imagenes y guardarlas
            if(formData.getAll('images')){
                const images = await uploadImages(formData.getAll('images') as File[]);
                if(!images){
                    throw new Error('No se pudo cargar las imágenes, rollingback')
                }

                await tx.productImage.createMany({
                    data: images.map(image => ({
                        url: image!,
                        productId: product.id
                    }))
                })
            }
    
            return {
                product
            }
        });
        
        //Todo: RevalidatePaths
        revalidatePath('/admin/products');
        revalidatePath(`/admin/product/${product.slug}`);
        revalidatePath(`/products/${product.slug}`);

        return {
            ok: true,
            product: primsaTx.product
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Revisar los logs, no se pudo actualizar/crear'
        }
    }
};

const uploadImages = async(images: File[]) => {
    try {
        const uploadPormises = images.map(async (image) => {
            try {
                //Crear y convertir esa imagen como un string para subir esa imagen facilmente a cloudinary
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');
    
                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, { folder: 'teslo-shop' }).then(r => r.secure_url)
            } catch (error) {
                console.log(error);
                return null;  
            }
        });

        const uploadedImages = await Promise.all(uploadPormises);
        return uploadedImages;
    } catch (error) {
        console.log(error);
        return null;
    }
}   