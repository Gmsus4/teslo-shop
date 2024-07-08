"use client";

import { getProductByName } from "@/actions";
import { ProductImage } from "@/components";
import { SearchProducts } from "@/components/ui/search/SearchProducts";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { useState } from "react";
import { SearchPageImageHover } from "./SearchPageImageHover";

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
      <SearchProducts handleSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div className="min-h-[736px] w-full">
        {products.length > 0 && (
          <div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 w-full mt-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="md:max-w-md bg-white border border-gray-200 rounded-lg shadow w-full relative"
                >
                  <SearchPageImageHover product={product}/>
                  {/* <div className="relative">
                    <ProductImage
                      className="w-full rounded-t-lg cursor-default"
                      //   className="rounded-t-lg"
                      alt={product.slug}
                      height={300}
                      width={300}
                      src={
                        product.ProductImage[0]?.url ??
                        "https://res.cloudinary.com/dozzu7xhx/image/upload/v1720374544/teslo-shop/tools/wil2eqzpwgsnuaa2dvvf.png"
                      }
                    />
                    <p className="text-xl font-bold text-white bg-red-500 inline-block py-2 px-4 pr-10 w-auto absolute bottom-0">
                      {currencyFormat(product.price)}
                    </p>
                  </div> */}
                  <div className="p-5 ">
                    <Link href={`/product/${product.slug}`}>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:text-blue-600">
                        {product.title}
                      </h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex gap-4 cursor-pointer">
                      <div
                        className="button"
                        data-tooltip={currencyFormat(product.price)}
                      >
                        <div className="button-wrapper">
                          <div className="text">Agregar</div>
                          <Link
                            href={`/product/${product.slug}`}
                            className="icon"
                          >
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
