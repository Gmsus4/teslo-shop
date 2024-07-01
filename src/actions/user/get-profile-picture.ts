'use server'

import prisma from "@/lib/prisma";

export const getProfilePicture = async( userId: string ) => {
    try {
        const imageProfile = await prisma.user.findFirst({ //Encuentra el primer producto
            where: { 
                id: userId
            }
        })

        if( !imageProfile ) return null; //Si no tenemos la imagen

        const { image, ...rest } = imageProfile;

        return {
            ...rest,
            image: image
        };
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener producto por slug');
        
    }
}