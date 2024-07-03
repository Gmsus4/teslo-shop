'use client'

import { placeOrder } from "@/actions";
import { DeliveryAddress, GetOrderSummary, NotLoadedButton, SkeletonPlaceOrder, TotalOrderSummary } from "@/components";
import { useAddressStore, useCartStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { IoCartOutline } from "react-icons/io5";

export const PlaceOrder = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const address = useAddressStore(state => state.address);
    const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation());

    const cart = useCartStore(state => state.cart);
    const clearCart = useCartStore(state => state.clearCart);

    const notifyError = () => toast.error('No hay Stock');

    useEffect(() => {
        setLoaded(true)
    }, [])

    const onPlaceOrder = async() => {
      if(itemsInCart === 0){
        router.replace('/empty')
        return;
      }
      
      setIsPlacingOrder(true);
      
      const productsToOrder = cart.map(product => ({
          productId: product.id,
          quantity: product.quantity,
          size: product.size
      }))

      //! Server Action
      const resp = await placeOrder(productsToOrder, address)
      if ( !resp.ok ){
        setIsPlacingOrder(false);
        alert('Por aquí está el error')
        setErrorMessage(resp.message);
        notifyError();
        return;
      }

      //* Todo salio bien
      clearCart();
      router.replace('/orders/' + resp.order?.id);
  }
    
    if( !loaded ){
        return (
          <div>
            <SkeletonPlaceOrder />
          </div>
        )
    }
  return (
    <>
      <div className="p-7 mx-4 md:mx-0 flex flex-col h-full justify-between">
        <div>
          <DeliveryAddress address={address} gap="gap-2" name="text-base"/>
        </div>
        <div>
          <GetOrderSummary itemsInCart={itemsInCart} subTotal={subTotal} tax={tax} gap="gap-2"/>
        </div>

        <div className="mt-2 pb-4">
          <TotalOrderSummary total={total} />
          <p className="mb-4">
            <span className="text-xs">
              Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
            </span>
          </p>

          {
            errorMessage && (
            <div className="bg-red-200 rounded-md flex items-start justify-start w-[100%] flex-col gap-4 p-4 mb-4">
                <span className="text-red-800">
                  <p className="font-bold">{errorMessage.split("no tiene inventario suficiente").at(0)}</p>
                  <p>No tiene inventario suficiente</p>
                </span>
                <Link
                  href="/cart"
                  className="underline md:flex items-center gap-2 hidden text-red-800"
                >
                  Editar carrito
                  <IoCartOutline className="mt-1 mb-1" />
                </Link>
            </div>
            )
          }

          <button 
            onClick={ onPlaceOrder }
            className={
              clsx({
                  "disabled": isPlacingOrder,
                  "btn-primary": !isPlacingOrder,
                  "btn-disabled": isPlacingOrder
              })
            }
          >
            Colocar orden
          </button>
        </div>
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
  )
}
