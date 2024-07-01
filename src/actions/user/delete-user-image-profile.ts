'use server'

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProfileUserImage = async(imageUrl: string) => {
    if(!imageUrl.startsWith('http')){
        return {
            ok: false,
            message: 'No se pueden borrar las imagenes de FS'
        }
    }

    const imageName = imageUrl
        .split('/')
        .pop()
        ?.split('.')[0] ?? '';

    console.log({imageName});

    try {
        // await cloudinary.uploader.destroy(imageName);
        await cloudinary.uploader.destroy(`teslo-shop/users/${ imageName }`)

        //Revalidar los paths
        revalidatePath(`/profile`);
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo eliminar la imagen'
        }
    }
}   