'use server'

import { Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface Props {
    page?: number;
    take?: number;
    genders: string[];
    categoriesName: string[];
    sizes: string[];
}

export const filterProduct = async ({ genders, categoriesName, sizes, page = 1, take = 12 }: Props) => {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    // Obtener IDs de categorías
    const findCategoryIds = await prisma.category.findMany({
        where: {
            name: {
                in: categoriesName,
            },
        },
        select: {
            id: true,
        },
    }).then(categories => categories.map(category => category.id));

    // Consultar productos y ordenar por relevancia
    const products = await prisma.product.findMany({
        take: take,
        skip: (page - 1) * take,
        where: {
            OR: [
                {
                    gender: {
                        in: genders as any[],
                    },
                },
                {
                    categoryId: {
                        in: findCategoryIds,
                    },
                },
                {
                    sizes: {
                        hasSome: sizes as Size[], // Buscar productos que tengan al menos uno de los tamaños especificados
                    },
                },
            ],
        },
        include: {
            ProductImage: true,
        },
    });

    // Contar el total de productos para la paginación
    const totalCount = await prisma.product.count({
        where: {
            OR: [
                {
                    gender: {
                        in: genders as any[],
                    },
                },
                {
                    categoryId: {
                        in: findCategoryIds,
                    },
                },
                {
                    sizes: {
                        hasSome: sizes as Size[],
                    },
                },
            ],
        },
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
        products: products,
        totalPages: totalPages,
    };
};




// 'use server'

// import { Size } from "@/interfaces";
// import prisma from "@/lib/prisma"

// interface Props {
//     page?: number;
//     take?: number; 
//     genders: string[]
//     categoriesName: string[]
//     sizes: string[]
// }

// export const filterProduct = async({genders, categoriesName, sizes, page = 1, take = 12}:Props) => {
//     if(isNaN( Number(page)) ) page = 1;
//     if(page < 1) page = 1;

//     const productsGender = await prisma.product.findMany({
//         take: take,
//         skip: (page - 1) * take,
//         where: {
//             gender: {
//                 in: genders as any,
//             }
//         },
//         include: {
//             ProductImage: true
//         }
//     })

//     //Encontrar el de la categoria asignada => shirts => 1a810aa5-2bbd-4cf7-92b6-3899600b281f
//     const findCategoryId = await prisma.category.findMany({
//         where: {
//             name: {
//                 in: categoriesName
//             }
//         },
//         select: {
//             id: true
//         }
//     }).then(categories => categories.map(category => category.id))

//     //Encontrar todos los productos que coincidan con la categoria asignada
//     const productsCategory = await prisma.product.findMany({
//         take: take,
//         skip: (page - 1) * take,
//         where: {
//             categoryId: {
//                 in: findCategoryId
//             }
//         },
//         include: {
//             ProductImage: true
//         }
//     })

//     const productSizes = await prisma.product.findMany({
//         where: {
//             sizes: {
//                 equals: sizes as Size[],
//             },
//         },
//         include: {
//             ProductImage: true
//         }
//     })
    
//     const totalCount = await prisma.product.count({
//         where: {
//             gender: {
//                 in: genders as any,
//             }
//         },
//     }); //Total de los productos en la base de datos
//     const totalPages = Math.ceil(totalCount / take); 

//     return {
//         product: productSizes,
//         totalPages: totalPages
//     };
// }