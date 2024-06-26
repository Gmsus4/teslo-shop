"use client";

import { createUpdateProduct } from "@/actions";
import { Categories, Product, ProductImage } from "@/interfaces";
import clsx from "clsx";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImage[] };
  // categories: {
  //   id: string;
  //   name: string;
  // }[] | undefined
  categories: Categories[] | undefined
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs { 
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  categoryId: string;

  //Todo: Images
}

export const ProductForm = ({ product, categories }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch, //Cuando hay que volver a renderizar en caso de que exista un cambio en algun formulario
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(', '), //Para convertirlo a un string, porque este era un array
      sizes: product.sizes ?? [] //Si no existe, nos retorne un array vacío

      //Todo: Images
    }
  });

  watch('sizes'); //Se este redibujando si los sizes cambian

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues('sizes')); //Un array con valores unicos, sus valores no pueden ser duplicados
    sizes.has(size) ? sizes.delete(size) : sizes.add(size); //Si el arreglo contiene el valor de size, entonces lo elimina, sino entonces lo agrega

    setValue('sizes', Array.from(sizes)) //Transforma el sizes en un arreglo
  }

  const onSubmit = async(data: FormInputs) => {
    const formData = new FormData();
    
    const {...productToSave} = data;

    if(product.id){
      formData.append('id', product.id ?? '')
    }

    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('gender', productToSave.gender);

    const { ok } = await createUpdateProduct(formData);
    console.log({ok});
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('title', { required: true })}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('slug', { required: true })}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('price', { required: true, min: 0 })}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('inStock', { required: true, min: 0 })}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('tags', { required: true })}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register('gender', { required: true })}>
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register('categoryId', { required: true })}>
            <option value="">[Seleccione]</option>
            {
              categories?.map(category => (
                <option key={category.id} value={category.id}> {category.name} </option>
              ))
            }
          </select>
        </div>

        <button className="btn-primary w-full">
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">

          <span>Tallas</span>
          <div className="flex flex-wrap">
            
            {
              sizes.map( size => (
                // bg-blue-500 text-white <--- si está seleccionado
                <div 
                  key={ size }
                  onClick={() => onSizeChanged(size)}
                  className={
                    clsx(
                      'p-2 border rounded-md cursor-pointer mr-2 mb-2 w-14 transition-all text-center',
                      {
                        'bg-blue-500 text-white': getValues('sizes').includes(size)
                      }
                    )
                  }>
                  <span>{ size }</span>
                </div>
              ))
            }

          </div>


          <div className="flex flex-col mb-2">

            <span>Fotos</span>
            <input 
              type="file"
              multiple 
              className="p-2 border rounded-md bg-gray-200" 
              accept="image/png, image/jpeg"
            />

          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {
              product.ProductImage?.map(image => (
                <div key={image.id}>
                  <Image 
                    alt={product.title ?? ''}
                    src={`/products/${image.url}`}
                    width={300}
                    height={300}
                    className="rounded rounded-t-xl rounded-b-none shadow-md"
                  />  
                    <button 
                      onClick={() => console.log(image.id, image.url)}
                      type="button" 
                      className="btn-danger w-full rounded-b-xl"
                    >
                      Eliminar
                    </button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </form>
  );
};