"use client";

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import { MobileItemsHeader } from "./products-map/MobileItemsHeader";
import { DesktopItemsActions } from "./products-map/DesktopItemsActions";
import { SkeletonProductsInCart } from "@/components/ui/skeleton/cart/SkeletonProductsInCart";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const productsInCart = useCartStore((state) => state.cart);
  const totalItemsInCart = useCartStore(state => state.getTotalItems());
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

  const notifySuccess = () => toast.success("Producto eliminado");

  const actionDelete = (product: any) => {
    notifySuccess();
    removeProduct(product);
  };
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if(totalItemsInCart === 0) redirect('/empty')
  }, [totalItemsInCart]);

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
            <div className="w-full h-0.5 rounded bg-gray-200"/>
            <div className="flex mb-1 justify-between items-center w-full">
              <MobileItemsHeader product={product} actionDelete={actionDelete} updateProductQuantity={updateProductQuantity}/>

              <DesktopItemsActions product={product} actionDelete={actionDelete} updateProductQuantity={updateProductQuantity}/>
            </div>
          </div>
        </>
      ))}
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
