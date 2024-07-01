'use server'

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const uploadImageUser = async (formData: FormData, userId: string) => {
    const image = await uploadImage(formData.get('image') as File);
    if(!image){
        throw new Error('No se pudo cargar las imágenes, rollingback')
    }

    const userUpdate = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            image: image
        }
    })

    console.log(userId);

    revalidatePath('/profile');

    return {
        ok: true,
        user: userUpdate
    }
};

const uploadImage = async(image: File) => {
    try {
        try {
            const buffer = await image.arrayBuffer();
            const base64Image = Buffer.from(buffer).toString('base64');
    
            const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, { folder: 'teslo-shop/users' });
            return result.secure_url;
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}