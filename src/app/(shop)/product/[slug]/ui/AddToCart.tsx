"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  product: Product;
  role: string | undefined;
}
export const AddToCart = ({ product, role }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  let titleNoti;
  if (quantity > 1) {
    titleNoti = "producto agregado";
  } else {
    titleNoti = "productos agregados";
  }
  // quantity > 1 ? titleNoti = 'producto agregado' : titleNoti = 'productos agregados';

  const notifySuccess = () => toast.success("Producto agregado al carrito");

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
    notifySuccess();
  };

  return (
    <>
      {posted &&
        !size && ( //Si hicimos clic en el btn para agregar al carrito y además no tiene una talla seleccionada
          <div
            className="p-4 mb-4 text-md text-red-800 rounded-lg bg-red-50 fade-in transition-all"
            role="alert"
          >
            <span className="font-bold mt-2">
              Debe de seleccionar una talla *
            </span>
          </div>
        )}

      {/* Selector de tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={(size) => setSize(size)}
      />

      {/* Selector de cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Button */}
      <div className="flex gap-4">
        <button onClick={addToCart} className="btn-primary my-5">
          Agregar al carrito
        </button>

        {role === "admin" && (
          // <Link href={`/admin/product/${product.slug}`} className="btn-primary my-5">
          //   Editar producto
          // </Link>
          <Link
            href={`/admin/product/${product.slug}`}
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl rounded my-5 text-center py-2 px-4 transition-all"
          >
            Editar producto
          </Link>
        )}
      </div>
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          className: "mt-8",
          success: {
            duration: 1500,
          },
        }}
      />
    </>
  );
};
