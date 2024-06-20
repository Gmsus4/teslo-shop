'use client'

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react"

export const PlaceOrder = () => {
    const [loaded, setLoaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const address = useAddressStore(state => state.address);
    const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation());

    const cart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true)
    }, [])

    const onPlaceOrder = async() => {
        setIsPlacingOrder(true);
        
        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size
        }))
        
        console.log({ address, productsToOrder })

        //Todo: Server Action
        const resp = await placeOrder(productsToOrder, address)
        console.log({resp})
        setIsPlacingOrder(false);
    }
    
    if( !loaded ){
        return <p>Cargando... </p>
    }
  return (
    <div className="py-7 md:p-7 flex flex-col md:w-[550px]"> {/* bg-white rounded-xl shadow-xl */} 
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-xl mb-2 font-bold">Dirección de entrega</h2>

      <div className="mb-10 ">
        <p className="text-xl">{address.firstName}  {address.lastName}</p>
        <p>{address.city}, {address.country}</p>
        <p>{address.address}</p>
        <p>Col. Centro</p>
        <p>CP. {address.postalCode}</p>
        <p>Tel. {address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10"/>

      <h2 className="text-xl mb-2 font-bold">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`} </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mb-2 text-sm mt-5"></span>
        <span className="text-right mb-2 mt-5 text-sm text-gray-400">Calculado al pagar</span>

        <span className="text-xl font-bold mb-2">Total</span>
        <span className="text-right text-xl font-bold mb-2">{currencyFormat(total) }</span>

        <span className="mb-2 text-sm">IVA incluido</span>
        <span className="text-right mb-2 text-sm"></span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */ }
          <span className="text-xs">
            Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
          </span>
        </p>

        {/* <p className="text-red-500">Error de creacion</p> */}

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
  </div>
  )
}