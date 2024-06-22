import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";
import { IoCartOutline } from "react-icons/io5";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center gap-4 md:gap-16 flex-col md:flex-row mt-10">
      <div className="lg:col-span-2 grid-cols-1 flex flex-col xl:min-w-[600px] lg:min-w-[500px] md:w-[400px] w-auto mx-4 px-4 md:px-0 md:mx-0 h-[100%]">
        <div className="flex sm:flex-row flex-col sm:items-center mb-4 md:mb-0 justify-between">
          <Title  title="Verificar orden" className="mt-0"/> 
          {/* <p className="text-sm mt-4 text-gray-500">4 productos en el carrito</p> */}
          <Link href="/" className="underline md:flex items-center gap-2 hidden">
            Editar carrito
            <IoCartOutline className="mt-1"/>
          </Link >
        </div>

        {/* Carrito */}
        {/* <span className="text-xl">Agregar mas items</span> */}
        <div className="overflow-auto overflow-x-hidden md:h-[600px] scroll-smooth">
          {/* Items */}
          <ProductsInCart />
        </div>
      </div>
      {/* Checkout - Resumen de la compra*/}
      <div className="lg:col-span-1">
          <PlaceOrder />
      </div>
  </div>
  )


  
  // return (
  //   <div className="flex justify-center gap-4 md:gap-16 flex-col md:flex-row">
  //     <div className="flex flex-col xl:min-w-[600px] lg:min-w-[500px]  md:w-[400px] w-auto mx-4 px-4 md:px-0 md:mx-0">{/* bg-red-400 */}
  //       <Title title="Verificar orden"/>
  //       {/* Carrito */}
  //       <span className="text-xl">Ajustar elementos</span>
  //       <Link href="/cart" className="underline mb-5">
  //         Editar carrito
  //       </Link >
  //       <div className="overflow-auto md:h-[500px] overflow-x-hidden md:mb-20 scroll-smooth">
  //         {/* Items */}
  //         <ProductsInCart />
  //       </div>
  //     </div>
  //     {/* Checkout - Resumen de la compra*/}
  //     <PlaceOrder />
  //   </div>
  // );
}