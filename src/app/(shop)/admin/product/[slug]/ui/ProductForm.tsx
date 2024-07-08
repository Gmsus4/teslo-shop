"use client";

import { useForm } from "react-hook-form";
import {
  Categories,
  Product,
  ProductImage as ProductWithImage,
} from "@/interfaces";
import { createUpdateProduct, deleteProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsBoxSeamFill } from "react-icons/bs";
import Link from "next/link";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  // categories: {
  //   id: string;
  //   name: string;
  // }[] | undefined
  isEditProduct?: boolean
  categories: Categories[] | undefined;
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
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;

  images?: FileList;
}

export const ProductForm = ({ product, categories, isEditProduct }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState<number | null>(null);

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "), //Para convertirlo a un string, porque este era un array
      sizes: product.sizes ?? [], //Si no existe, nos retorne un array vacío

      images: undefined,
    },
  });

  watch("sizes"); //Se este redibujando si los sizes cambian

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues("sizes")); //Un array con valores unicos, sus valores no pueden ser duplicados
    sizes.has(size) ? sizes.delete(size) : sizes.add(size); //Si el arreglo contiene el valor de size, entonces lo elimina, sino entonces lo agrega

    setValue("sizes", Array.from(sizes)); //Transforma el sizes en un arreglo
  };

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert("Producto no se pudo actualizar");
      return;
    }

    setIsLoading(false);
    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  const deleteProductAdmin = async () => {
    await deleteProduct({product})
    // router.replace(`/admin/products`);
    router.back();
    router.refresh();
    // console.log(`ID del producto: ${product.id}`);
    // console.log(`ID del ProductImage: ${product.ProductImage![1].id}`);

    // product.ProductImage?.map(image => {
    //   await deleteProductImage(image.id, image.url);
    // })
    // product.id
  }

  const deleteImage = async (image: ProductWithImage) => {
    setIsLoadingDelete(true);
    setDeletingImageId(image.id);

    await deleteProductImage(image.id, image.url);

    setIsLoadingDelete(false);
    setDeletingImageId(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[700px] w-auto">
      <div className="grid px-5 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
        <div className="w-full flex flex-col gap-4">
          <div className="">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nombres
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>

          <div className="flex gap-2 w-full justify-between">
            <div className="w-full">
              <label
                htmlFor="inStock"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Stock
              </label>
              <input
                type="number"
                id="inStock"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                {...register("inStock", { required: true, min: 0 })}
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                {...register("price", { required: true, min: 0 })}
              />
            </div>
          </div>

          <div className="">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Descripción
            </label>
            <textarea
              id="description"
              rows={5}
              className="p-2 w-full border rounded-md bg-gray-200"
              {...register("description", { required: true })}
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="">
            <label
              htmlFor="tags"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Tags
            </label>
            <input
              disabled={isLoading}
              type="text"
              id="tags"
              {...register("tags", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>

          <div className="">
            <label
              htmlFor="slug"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Slug
            </label>
            <input
              disabled={isLoading}
              type="text"
              id="slug"
              {...register("slug", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>

          <div className="flex w-full gap-4">
            <div className="w-full">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Gender
              </label>
              <select
                disabled={isLoading}
                {...register("gender", { required: true })}
                id="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option selected>[Seleccione]</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kid">Kid</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Categoria
              </label>
              <select
                disabled={isLoading}
                {...register("categoryId", { required: true })}
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option disabled={isLoading} selected>
                  [Seleccione]
                </option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {" "}
                    {category.name}{" "}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="">
            <span className="mb-[6px] flex">Tallas</span>
            <div className="flex flex-row justify-between w-full">
              {sizes.map((size) => (
                // bg-blue-500 text-white <--- si está seleccionado
                <div
                  key={size}
                  onClick={() => onSizeChanged(size)}
                  className={clsx(
                    "p-2 border rounded-md cursor-pointer mr-2 mb-2 w-14 transition-all text-center",
                    {
                      "bg-blue-500 text-white":
                        getValues("sizes").includes(size),
                    }
                  )}
                >
                  <span>{size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <input
          className="inline-block p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mt-2"
          type="file"
          accept="image/png, image/jpeg, image/avif"
          multiple
          disabled={isLoading}
          {...register("images")}
        />
        <div className={
          clsx(
            "grid mini:grid-cols-2 grid-cols-1 gap-4 my-2",
            {
              'mb-12': isEditProduct
            }
          )
        }>
          {product.ProductImage?.map((image) => (
            <div key={image.id} className="imagineDragons">
              <ProductImage
                alt={product.title ?? ""}
                src={image.url}
                width={300}
                height={300}
                className="rounded rounded-t-xl rounded-b-none shadow-md w-full"
              />
              {deletingImageId === image.id && isLoadingDelete ? (
                <button
                  id={image.id.toString()}
                  disabled
                  type="button"
                  className="flex items-center transition-colors duration-300 justify-center text-white bg-gray-700 font-medium rounded-b-xl text-sm w-full px-5 py-2.5 text-center"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Eliminando...
                </button>
              ) : (
                <button
                  id={image.id.toString()}
                  onClick={() => deleteImage(image)}
                  type="button"
                  disabled={isLoading}
                  className="btn-danger w-full rounded-b-xl"
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {!isLoading ? (
        <div className="flex gap-4">
          <button
            className="btn-primary w-8/12 rounded flex items-center justify-center gap-2"
            type="submit"
            disabled={isLoadingDelete}
          >
            <FaSave />
            Guardar
          </button>
          {
            isEditProduct && (
              <>
                <Link href={`/product/${product.slug}`} className="flex items-center justify-center gap-2 btn-primary w-4/12 rounded" type="button">
                  <BsBoxSeamFill />
                  Ver producto
                </Link>
                <button disabled={isLoadingDelete} className="flex items-center justify-center gap-2 btn-danger w-4/12 rounded" type="button" onClick={deleteProductAdmin}>
                  <MdDelete />
                  Eliminar
                </button>
              </>
            )
          }
        </div>
      ) : (
        <div className="flex gap-4 w-full">
          <button
            disabled
            type="button"
            className="flex items-center w-full transition-colors duration-300 justify-center text-white bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Guardando...
          </button>
        </div>
      )}
    </form>
  );
};
