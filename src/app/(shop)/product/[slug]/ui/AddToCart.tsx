'use client'

import { QuantitySelector, SizeSelector } from "@/components"
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props{
  product: Product;
}
export const AddToCart = ({ product }:Props) => {
  const addProductToCart = useCartStore(state => state.addProductToCart)

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if(!size) return;
    
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    }
    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  }

  return (
    <>
        {
          posted && !size && ( //Si hicimos clic en el btn para agregar al carrito y además no tiene una talla seleccionada
            <div className="p-4 mb-4 text-md text-red-800 rounded-lg bg-red-50 fade-in transition-all" role="alert">
              <span className="font-bold mt-2">Debe de seleccionar una talla *</span> 
            </div>
          )
        }

        {/* Selector de tallas */}
        <SizeSelector
            selectedSize={size}
            availableSizes={product.sizes}
            onSizeChanged={(size) => setSize(size)}
        />

        {/* Selector de cantidad */}
        <QuantitySelector
          quantity={quantity}
          onQuantityChanged={ setQuantity }
        />

        {/* Button */}
        <button onClick={addToCart} className="btn-primary my-5">
          Agregar al carrito
        </button>
    </>
  )
}
