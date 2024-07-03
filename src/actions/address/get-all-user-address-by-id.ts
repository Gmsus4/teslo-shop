'use server'

import prisma from "@/lib/prisma";

export const getAllUserAddressById = async(userId: string) => {
    try {
        const allAddress = await prisma.allUserAddress.findMany({ 
            where: {userId: userId},
            orderBy: {
                firstName: 'asc'
            }
        });

        if( !allAddress ) return null;

        return allAddress;
    } catch (error) {
        console.log(error)
        return null;
    }
}