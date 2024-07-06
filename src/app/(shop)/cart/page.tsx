import Link from "next/link";

import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";
import { IoCartOutline } from "react-icons/io5";

export default function CartPage() {
  return (
    <div className="flex justify-center gap-4 md:gap-16 flex-col lg:flex-row mt-10">
      {/* Titulo y Continua comprando */}
      <div className="flex flex-col xl:min-w-[600px] lg:min-w-[500px] lg:w-[600px] w-auto mx-4 px-4 md:px-0 md:mx-0 h-[100%]">
        <div className="flex sm:flex-row flex-col sm:items-center mb-4 md:mb-0 justify-between">
          <Title title="Tu Carrito" className="mt-0" />
          <Link
            href="/"
            className="underline items-center gap-2 md:flex hidden"
          >
            Continua comprando
            <IoCartOutline className="mt-1" />
          </Link>
        </div>

        {/* Productos en el carrito */}
        <div className="overflow-auto lg:h-[600px] overflow-x-hidden scroll-smooth">
          {/* Items */}
          <ProductsInCart />
        </div>
      </div>

      {/* Checkout - Resumen de la compra*/}
      <div className="bg-transparent lg:w-[350px] lg:h-[715px] overflow-hidden flex flex-col w-full shadow-xl bg-white rounded-2xl">
        <div className="p-7 mx-4 md:mx-0 flex flex-col justify-between h-full">
          {/* <h2 className="text-xl mb-2 font-bold">Resumen del pedido</h2> */}
          <OrderSummary />
          {/* <SkeletonOrderSummary /> */}
        </div>
      </div>
    </div>
  );
}
