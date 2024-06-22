import Link from "next/link";

import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";
import { IoCartOutline } from "react-icons/io5";

export default function CartPage() {
  // redirect('/empty');
  return (
    <div className="grid lg:grid-cols-3 gap-10 mx-auto">
        <div className="lg:col-span-2 grid-cols-1">
          <div className="flex sm:flex-row flex-col sm:items-center ml-4 mb-4 sm:mb-0 justify-between">
            <Title title="Tu Carrito"/> 
            {/* <p className="text-sm mt-4 text-gray-500">4 productos en el carrito</p> */}
            <Link href="/" className="underline flex items-center gap-2">
              Continua comprando
              <IoCartOutline className="mt-1"/>
            </Link >
          </div>
          {/* Carrito */}
          {/* <span className="text-xl">Agregar mas items</span> */}
          <div className="overflow-auto lg:h-[500px] overflow-x-hidden lg:mb-6 lg:mt-2 scroll-smooth">
            {/* Items */}
            <ProductsInCart />
          </div>
        </div>
        {/* Checkout - Resumen de la compra*/}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-2xl p-7 mb-10 mx-4 md:mx-0 w-auto">
            <h2 className="text-xl mb-2 font-bold">Resumen del pedido</h2>
            <OrderSummary />
            <div className="mt-5 w-full">
              <Link 
                className="flex btn-primary justify-center"
                href="/checkout/address">
                Checkout
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
}