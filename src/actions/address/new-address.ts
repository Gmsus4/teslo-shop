'use server'

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const createNewAddress = async(address: Address, userId: string) => {
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

        const newAddress = await prisma.allUserAddress.create({
            data: addressToSave
        })

        return newAddress;
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo crear la dirección')
    }
}