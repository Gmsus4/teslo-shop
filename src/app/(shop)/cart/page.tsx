import Link from "next/link";

import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";

export default function CartPage() {
  // redirect('/empty');
  return (
    <div className="flex justify-center gap-4 md:gap-16 flex-col md:flex-row">
      <div className="flex flex-col xl:min-w-[600px] lg:min-w-[500px]  md:w-[400px] w-auto mx-4 px-4 md:px-0 md:mx-0">
        <Title title="Carrito"/>
        {/* Carrito */}
        <span className="text-xl">Agregar mas items</span>
        <Link href="/" className="underline mb-5">
          Continua comprando
        </Link >
        <div className="overflow-auto md:h-[500px] overflow-x-hidden md:mb-20 scroll-smooth">

        {/* Items */}
        <ProductsInCart />
        </div>
      </div>
      {/* Checkout - Resumen de la compra*/}
      <div className="">
        <div className="bg-white rounded-xl shadow-2xl p-7 mb-10 mx-4 md:mx-0 w-auto lg:w-[400px]">
          <h2 className="text-xl mb-2 font-bold">Resumen del pedido</h2>
          <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-right">3 Articulos</span>

            <span>Impuestos</span>
            <span className="text-right">$0</span>

            {/* <span>Subtotal</span>
            <span className="text-right">$100</span> */}

            <span className="mb-2 text-sm mt-5"></span>
            <span className="text-right mb-2 mt-5 text-sm text-gray-400">Calculado al pagar</span>

            <span className="text-xl font-bold mb-2">Subtotal</span>
            <span className="text-right text-xl font-bold mb-2">$100</span>

            <span className="mb-2 text-sm">IVA incluido</span>
            <span className="text-right mb-2 text-sm"></span>
          </div>
          <div className="mt-5 mb-2 w-full">
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