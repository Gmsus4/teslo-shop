"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { NotLoadedButton, SkeletonProductsInCart } from "@/components";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <>
        <SkeletonProductsInCart />
        <SkeletonProductsInCart />
        <SkeletonProductsInCart />
      </>
    )
  }

  return (
    <>
      {productsInCart.map((product) => (
      <> 
        <div key={`${product.slug}-${product.size}`} className="flex flex-col w-full">
          {/* <div className="w-full h-0.5 rounded bg-gray-200"/> */}
          <div className="flex mb-1 justify-between items-center sm:gap-10 w-full">
            <div className="flex items-center my-1 w-full">
              <Image
                src={`/products/${product.image}`}
                width={100}
                height={100}
                style={{
                  width: "80px",
                  height: "80px",
                }}
                alt={product.title}
                className="mr-5 rounded"
              />
              <div className="rest w-full">
                <div className="title-size-price-delete w-full">
                  <div className="flex items-center justify-between title-btnDelete w-full">
                    <Link
                      className="hover:cursor-pointer font-bold"
                      href={`/product/${product.slug}`}
                    >
                      {product.title}
                    </Link>

                  </div>
                  <p className="text-gray-500 text-sm">Talla - {product.size}</p>
                  <p className="text-gray-500 text-sm">{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</p>
                  <div className="w-10 sm:hidden flex">
                    <p className="font-bold text-xl"> ${product.price}</p>  
                  </div>
                </div>
                <div className="sm:hidden gap-8 flex-col-reverse items-start sm:flex-row sm:items-center mt-4 flex">
                  <div className="w-10 sm:flex hidden">
                    <p className="font-bold text-xl"> ${product.price}</p>  
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:flex gap-8 flex-col-reverse items-end sm:flex-row sm:items-center mr-6 ml-10 hidden">
              <div className="w-10 sm:flex hidden">
                <p className="font-bold text-xl"> ${product.price}</p>  
              </div>
            </div>
          </div>
        </div>
      </>
    ))}
    </>
  );
};
