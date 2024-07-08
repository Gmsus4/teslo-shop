"use client";

import { ProductImage } from "@/components/product/product-image/ProductImage";
import { Product } from "@/interfaces";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div
      key={product.id}
      className="md:max-w-md bg-white border border-gray-200 rounded-lg shadow w-full"
    >
      <div className="relative">
        <ProductImage
          onMouseEnter={() =>
            setDisplayImage(
              product.images[1] ? product.images[1] : product.images[0]
            )
          }
          onMouseLeave={() => setDisplayImage(product.images[0])}
          src={displayImage ? displayImage : "https://res.cloudinary.com/dozzu7xhx/image/upload/v1720374544/teslo-shop/tools/wil2eqzpwgsnuaa2dvvf.png"}
          className="w-full rounded-t-lg cursor-default"
          //   className="rounded-t-lg"
          alt={product.slug}
          height={300}
          width={300}
        //   src={
        //     product.images[0] ??
        //     "https://res.cloudinary.com/dozzu7xhx/image/upload/v1720374544/teslo-shop/tools/wil2eqzpwgsnuaa2dvvf.png"
        //   }
        />
        <p className="text-xl font-bold text-white bg-red-500 inline-block py-2 px-4 pr-10 w-auto absolute bottom-0">
          {currencyFormat(product.price)}
        </p>
      </div>
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
        </div>
      </div>
    </div>
    // <div className="rounded-md overflow-hidden fade-in">
    //     <Link href={`/product/${ product.slug }`} >
    //         <ProductImage
    //             onMouseEnter={ () => setDisplayImage(product.images[1] ? product.images[1] : product.images[0])}
    //             onMouseLeave={ () => setDisplayImage(product.images[0]) }
    //             src={displayImage}
    //             alt={ product.title}
    //             className="w-full object-cover" //Se quede dentro de la imagen y se expanda en el espacio que tiene disponible
    //             width={ 500 }
    //             height={ 500 }
    //         />
    //     </Link>

    //     <div className="p-4 flex flex-col">
    //         <Link className="hover:text-blue-600"
    //             href={`/product/${ product.slug }`} >
    //             { product.title }
    //         </Link>
    //         <span className="font-bold">${ product.price }</span>
    //     </div>
    // </div>
  );
};
