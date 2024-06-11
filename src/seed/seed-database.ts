import { initialData } from "./seed";
import prisma from '../lib/prisma';

async function main(){
    //1. Borrar registros previos
    await Promise.all([
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
    ]);
    
    const {categories, products} = initialData;

    //2. Categorias
    const categoriesData = categories.map( category => ({
        name: category
    }))

    await prisma.category.createMany({
        data: categoriesData
    });

    console.log('Seed ejecutado correctamente')
}

(() => {
    if(process.env.NODE_ENV === 'production') return;
    main();
})();