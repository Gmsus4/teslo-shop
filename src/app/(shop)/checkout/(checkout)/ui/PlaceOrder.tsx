'use client'

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export const PlaceOrder = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const address = useAddressStore(state => state.address);
    const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation());

    const cart = useCartStore(state => state.cart);
    const clearCart = useCartStore(state => state.clearCart);

    useEffect(() => {
        setLoaded(true)
        if(itemsInCart === 0){
          redirect('/empty')
        }
    }, [])

    const onPlaceOrder = async() => {
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
        setErrorMessage(resp.message);
        return;
      }

      //* Todo salio bien
      clearCart();
      router.replace('/orders/' + resp.order?.id);
  }
    
    if( !loaded ){
        return <p>Cargando... </p>
    }
  return (
    <div className="bg-white rounded-xl shadow-2xl p-7 mb-10 mx-4 md:mx-0">
      <h2 className="text-xl mb-2 font-bold">Dirección de entrega</h2>

      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between">
          <p className="text-gray-600">{address.firstName}  {address.lastName}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200"/>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between">
          <p className="text-right text-gray-500 text-sm">Estado</p>
          <p className="text-right text-gray-500 text-sm">{address.city}, {address.country}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200"/>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between">
          <p className="text-right text-gray-500 text-sm">Calle</p>
          <p className="text-right text-gray-500 text-sm">{address.address}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200"/>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between">
          <p className="text-right text-gray-500 text-sm">Código Postal</p>
          <p className="text-right text-gray-500 text-sm">{address.postalCode}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200"/>
      </div>
      <div className="flex flex-col gap-2 mt-2 mb-6">
        <div className="flex justify-between">
          <p className="text-right text-gray-500 text-sm">Teléfono</p>
          <p className="text-right text-gray-500 text-sm">{address.phone}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200"/>
      </div>
      {/* <div className="mb-10 ">
        <p className="text-xl">{address.firstName}  {address.lastName}</p>
        <p>{address.city}, {address.country}</p>
        <p>{address.address}</p>
        <p>Col. Centro</p>
        <p>CP. {address.postalCode}</p>
        <p>Tel. {address.phone}</p>
        </div> */}

      <h2 className="text-xl mb-2 font-bold">Resumen de orden</h2>
      {/* Divider */}
        <div className="flex flex-col">
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between">
            <span className="text-gray-500">No. Productos</span>
            <span className="text-right text-gray-500">{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}</span>
          </div>

          <div className="w-full h-0.5 rounded bg-gray-200"/>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-right text-gray-500">{currencyFormat(subTotal)}</span>
          </div>

          <div className="w-full h-0.5 rounded bg-gray-200"/>
        </div>

        <div className="flex flex-col gap-2 mt-2 mb-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Impuestos (15%)</span>
            <span className="text-right text-gray-500">{currencyFormat(tax)}</span>
          </div>

          <div className="w-full h-0.5 rounded bg-gray-200"/>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between">
            <span className="mb-2 text-sm mt-5"></span>
            <span className="text-right mb-2 mt-5 text-sm text-gray-400">Calculado al pagar</span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span className="text-xl font-bold mb-2">Total</span>
              <span className="text-right text-xl font-bold mb-2">{currencyFormat(total) }</span>
            </div>
            <div className="flex justify-between">
              <span className="mb-2 text-sm">IVA incluido</span>
              <span className="text-right mb-2 text-sm"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 lg:w-[300px]">
        <p className="mb-5">
          {/* Disclaimer */ }
          <span className="text-xs">
            Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
          </span>
        </p>

        <p className="text-red-500">{errorMessage}</p>

        <button 
          onClick={ onPlaceOrder }
          className={
            clsx({
                "disabled": isPlacingOrder,
                "btn-primary": !isPlacingOrder,
                "btn-disabled": isPlacingOrder
            })
          }
        //   href="/orders/123"
        >
          Colocar orden
        </button>
      </div>
    </div>
  )
}
