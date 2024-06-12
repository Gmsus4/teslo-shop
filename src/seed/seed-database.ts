import { initialData } from "./seed";
import prisma from '../lib/prisma';

async function main(){
    //1. Borrar registros previos
    await Promise.all([ //Esperara hasta que las tres acciones de prisma se cumplan
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
    ]);
    
    const {categories, products} = initialData; //Obtener los datos de las categorias y los productos que vienen de la seed

    //2. Categorias
    const categoriesData = categories.map( category => ({ //Mapear las categorias disponibles de la seed 
        name: category
    }))
    //  Res => categoriesData
    // [
    //     { name: 'shirts' },
    //     { name: 'pants' },
    //     { name: 'hoodies' },
    //     { name: 'hats' }
    // ]

    await prisma.category.createMany({ //Crear y agregar todas las categorias a la base de datos
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany(); //Tomar las categorias que tengo en la base de datos
    
    // Haces un reducer, por cada iteracion el map que es un objeto tendra como key el nombre de la categoria mapeada y el valor como el id de esa categoria
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>) // <string=shirt, categoryId>
    //Res
    // {
    //     shirts: 'e432d4b2-01bf-4b7e-aad4-49ab7435603a',
    //     pants: '46b2a2d5-d833-4425-8002-8c26affe6bdf',
    //     hoodies: '4ad541fc-df0a-42fa-97f9-640f58ff4998',
    //     hats: '30073a97-4766-4a12-98ba-408a7e6b2159'
    // }


    console.log(categoriesMap);

    // Productos
    console.log('Seed ejecutado correctamente')
}

(() => {
    if(process.env.NODE_ENV === 'production') return;
    main();
})();