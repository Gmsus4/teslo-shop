import Link from "next/link";

import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";
import { IoCartOutline } from "react-icons/io5";

export default function CartPage() {
  // redirect('/empty');
  return (
    <div className="flex justify-center gap-4 md:gap-16 flex-col md:flex-row mt-10">
        <div className="flex flex-col xl:min-w-[600px] lg:min-w-[500px] md:w-[400px] w-auto mx-4 px-4 md:px-0 md:mx-0 h-[100%]">
          <div className="flex sm:flex-row flex-col sm:items-center mb-4 md:mb-0 justify-between">
            <Title title="Tu Carrito" className="mt-0"/> 
            {/* <p className="text-sm mt-4 text-gray-500">4 productos en el carrito</p> */}
            <Link href="/" className="underline items-center gap-2 md:flex hidden">
              Continua comprando
              <IoCartOutline className="mt-1"/>
            </Link >
          </div>
          {/* Carrito */}
          {/* <span className="text-xl">Agregar mas items</span> */}
          <div className="overflow-auto md:h-[600px] overflow-x-hidden scroll-smooth">
            {/* Items */}
            <ProductsInCart />
          </div>
        </div>
        {/* Checkout - Resumen de la compra*/}
        <div className="">
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