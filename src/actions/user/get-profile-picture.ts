'use server'

import prisma from "@/lib/prisma";

export const getUserDB = async( userId: string ) => {
    try {
        const userProfile = await prisma.user.findFirst({ //Encuentra el primer producto
            where: { 
                id: userId
            }
        })

        if( !userProfile ) return null; //Si no tenemos la imagen

        // const { image, ...rest } = imageProfile;

        return {
            // image: image
            data: userProfile
        };
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener producto por slug');
    }
}