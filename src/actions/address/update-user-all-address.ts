'use server'

import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const updateAllUserAddress = async(address: Address, userId: string, idAddress: string) => {
    try {
        const addressToSave = { //Objeto con los datos a mandar al prisma
            userId: userId,
            address: address.address,
            address2: address.address2,
            countryId: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
            city: address.city,
            state: address.state,
            suburb: address.suburb,
        }

        const updatedAddress = await prisma.allUserAddress.update({
            where: { id: idAddress },
            data: addressToSave
        }) 

        return updatedAddress;
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo grabar la dirección')
    }
}