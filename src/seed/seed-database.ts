import { initialData } from "./seed";
import prisma from '../lib/prisma';

async function main(){
    // Borrar registros previos
    await Promise.all([
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
    ]);
    const {categories, products} = initialData; 

    // Categorias
    const categoriesData = categories.map( category => ({ name: category }))
    await prisma.category.createMany({ data: categoriesData });
    const categoriesDB = await prisma.category.findMany(); 
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>)

    //Productos
    products.forEach( async(product) => {
        const { images, type, ...rest } = product; 
        const dbProduct = await prisma.product.create({
            data: {
                ...rest, 
                categoryId: categoriesMap[type]
            }
        })
    });

    //Images

    console.log('Seed ejecutado correctamente')
}

(() => {
    if(process.env.NODE_ENV === 'production') return;
    main();
})();