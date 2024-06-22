"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const totalItemsInCart = useCartStore(state => state.getTotalItems());

  useEffect(() => {
    setLoaded(true);
  }, []);

  // useEffect(() => {
  //   if(totalItemsInCart === 0) redirect('/empty')
  // }, [totalItemsInCart]);

  if (!loaded) {
    return (
      <>
        <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        disabled
        type="button"
      >
        <svg
          aria-hidden="true"
          className="inline w-4 h-4 me-3 text-white animate-spin"
          fill="none"
          role="status"
          viewBox="0 0 100 101"
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
        Loading...
        </button>
      </>
    )
  }

  return (
    <>
      {productsInCart.map((product) => (
      <>        
        <div key={`${product.slug}-${product.size}`} className="flex flex-col w-full">
          <div className="w-full h-0.5 rounded bg-gray-200"/>
          <div className="flex mb-1 justify-between items-center sm:gap-10 w-full">
            <div className="flex items-center my-4 w-full">
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
                  <div className="flex gap-2 items-center justify-between title-btnDelete w-full">
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

      {/* {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />
          <div>
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className="font-bold">{ currencyFormat(product.price * product.quantity )}</p>
          </div>
        </div>
      ))} */}
    </>
  );
};
