'use server'

import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAdress = async(address: Address, userId: string) => {
    try {
        const newAddress = await createOrReplaceAddress(address, userId); //Retorna un nuevo objeto si este no existe o actualiza el objeto con nuevos valores
        return {
            ok: true,
            address: newAddress
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se puedo grabar la dirección'
        }
    }
}

const createOrReplaceAddress = async(address: Address, userId: string) => {
    try {
        const storeAddress = await prisma.userAddress.findUnique({ //Buscamos la data de la direccion donde coincida el userid
            where: { userId: userId }
        })

        const addressToSave = { //Objeto con los datos a mandar al prisma
            userId: userId,
            address: address.address,
            address2: address.address2,
            countryId: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
            city: address.city
        }

        if( !storeAddress ){ //Si no existe direccion, nos creamos una nueva
            const newAddress = await prisma.userAddress.create({
                data: addressToSave
            })

            return newAddress;
        }

        const updatedAddress = await prisma.userAddress.update({ //Si existe la direccion entonces la tenemos que actualizar 
            where: { userId: userId },
            data: addressToSave
        }) 

        return updatedAddress;
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo grabar la dirección')
    }
}