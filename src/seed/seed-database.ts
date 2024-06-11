import { initialData } from "./seed";
import prisma from '../lib/prisma';

async function main(){

    //1. Borrar registros previos
    await Promise.all([
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
    ]);

    // await prisma.productImage.deleteMany();
    // await prisma.product.deleteMany();
    // await prisma.category.deleteMany();
    
    // console.log(initialData);
    console.log('Seed ejecutado correctamente')
}

(() => {
    if(process.env.NODE_ENV === 'production') return;
    main();
})();