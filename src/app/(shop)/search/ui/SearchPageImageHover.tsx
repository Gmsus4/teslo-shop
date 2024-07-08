'use client'

import { ProductImage } from "@/components";
import { currencyFormat } from "@/utils";
import { useState } from "react";

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
    sizes: string[];
    slug: string;
    tags: string[];
    gender: string;
    categoryId: string;
    ProductImage: ProductImage[];
}

interface SearchPageImageHoverProps {
    product: Product;
}

export const SearchPageImageHover = ({product}:SearchPageImageHoverProps) => {
    const [displayImage, setDisplayImage] = useState(product.ProductImage[0]);
  return (
    <div className="relative">
        <ProductImage
          onMouseEnter={() =>
            setDisplayImage(
              product.ProductImage[1] ? product.ProductImage[1] : product.ProductImage[0]
            )
          }
          onMouseLeave={() => setDisplayImage(product.ProductImage[0])}
          src={displayImage.url ? displayImage.url : "https://res.cloudinary.com/dozzu7xhx/image/upload/v1720374544/teslo-shop/tools/wil2eqzpwgsnuaa2dvvf.png"}
          className="w-full rounded-t-lg cursor-default"
          alt={product.slug}
          height={300}
          width={300}
        />
      <p className="text-xl font-bold text-white bg-red-500 inline-block py-2 px-4 pr-10 w-auto absolute bottom-0">
        {currencyFormat(product.price)}
      </p>
    </div>
  );
};
