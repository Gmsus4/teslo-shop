"use client";

import { getProductByName } from "@/actions";
import { ProductImage } from "@/components";
import { Size } from "@/interfaces";
import { currencyFormat } from "@/utils";
import { Gender } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

type ProductImage = {
  id: number;
  url: string;
  productId: string;
};

interface Product {
  id: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  sizes: string[]; // Asumiendo que $Enums.Size es un tipo que se puede convertir a un array de strings
  slug: string;
  tags: string[];
  gender: string; // Asumiendo que $Enums.Gender es un tipo que se puede convertir a un string
  categoryId: string;
  ProductImage: ProductImage[]; // Arreglo de imágenes de producto
}

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const products = await getProductByName(searchTerm);
      setProducts(products || []); // Si products es null, establece un arreglo vacío []
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };
  return (
    <div className="flex justify-between flex-col w-full items-center">
      <form
        onSubmit={handleSearch}
        className="max-w-md mx-auto w-full px-4 lg:w-[400px]"
      >
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block outline-none w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar productos"
            required
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute flex flex-row gap-2 end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      <div className="containerSearch"></div>

      {/* <div className="h-auto py-2 px-4 rounded flex items-center gap-2 shadow-lg justify-between lg:w-[400px]">
        <input
          className="p-2 outline-none bg-transparent"
          type="text"
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="btn-primary cursor-pointer" onClick={handleSearch}>
          <IoSearchOutline size={20} />
        </div>
      </div> */}

      <div className="min-h-[736px] w-full">
        {products.length > 0 && (
          <div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 w-full mt-4">
              {products.map((product) => (
                <div key={product.id} className="md:max-w-md bg-white border border-gray-200 rounded-lg shadow w-full relative">
                    <ProductImage
                      className="w-full rounded-t-lg cursor-default"
                      //   className="rounded-t-lg"
                      alt={product.slug}
                      height={300}
                      width={300}
                      src={product.ProductImage[0]?.url ?? 'https://res.cloudinary.com/dozzu7xhx/image/upload/v1720374544/teslo-shop/tools/wil2eqzpwgsnuaa2dvvf.png'}
                    />
                  <div className="p-5 ">
                    <Link href={`/product/${product.slug}`}>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:text-blue-600">
                        {product.title}
                      </h5>
                    </Link>
                    <p className="text-xl font-bold text-white bg-red-500 inline-block py-2 px-4 pr-10 mb-2 w-auto absolute bottom-44 left-0">
                      {currencyFormat(product.price)}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex gap-4 cursor-pointer">
                      <div className="button" data-tooltip={currencyFormat(product.price)}>
                        <div className="button-wrapper">
                          <div className="text">Agregar</div>
                          <Link href={`/product/${product.slug}`} className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-cart2"
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                      {/* <Link
                        href={`/product/${product.slug}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        Ver producto
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link> */}
                    </div>
                  </div>
                </div>

                // <div className="flex flex-col">
                //   <div>
                //     <Link href={`/product/${product.slug}`}>
                //       <ProductImage
                //         alt={product.slug}
                //         height={300}
                //         width={300}
                //         src={product.ProductImage[0].url}
                //       />
                //     </Link>
                //   </div>
                //   <div>
                //     <Link
                //       className="hover:text-blue-600"
                //       href={`/product/${product.slug}`}
                //     >
                //       {product.title}
                //     </Link>
                //   </div>
                // </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
