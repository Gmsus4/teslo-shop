'use server'

import prisma from "@/lib/prisma";

//Obtiene todos los valores del address del model userAddress
export const getUserAddress = async(userId: string) => {
    try {
        const address = await prisma.userAddress.findUnique({ 
            where: {userId: userId} 
        });

        if( !address ) return null;

        const { countryId, address2, ...rest } = address;

        return {
            ...rest,
            country: countryId,
            address2: address2 ? address2 : ''
        };
    } catch (error) {
        console.log(error)
        return null;
    }
}