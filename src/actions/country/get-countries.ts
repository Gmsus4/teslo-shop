'use server'

import prisma from "@/lib/prisma";

export const getCountries = async() => { //Regresarnos siempre un arreglo de paises, en los cuales tendremos el id y el name
    try {
        const countries = await prisma.country.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return countries;
    } catch (error) {
        console.log(error)
        return [];
    }
}