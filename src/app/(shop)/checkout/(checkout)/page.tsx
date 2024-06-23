import { SkeletonPlaceOrder, Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";
import { IoCartOutline } from "react-icons/io5";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center gap-4 md:gap-16 flex-col lg:flex-row md:mt-10">
      <div className="flex flex-col xl:min-w-[600px] lg:min-w-[500px] lg:w-[400px] w-auto mx-4 px-4 md:px-0 md:mx-0 h-[100%]">
        <div className="flex sm:flex-row flex-col sm:items-center mb-4 md:mb-0 justify-between">
          <Title title="Verificar orden" className="mt-0" />
          <Link
            href="/cart"
            className="underline md:flex items-center gap-2 hidden"
          >
            Editar carrito
            <IoCartOutline className="mt-1" />
          </Link>
        </div>

        <div className="overflow-auto overflow-x-hidden lg:h-[600px] scroll-smooth">
          <ProductsInCart />
          {/* <SkeletonProductsInCart /> */}
        </div>
      </div>

      {/* Checkout - Resumen de la compra*/}
      <div className="bg-transparent lg:w-[360px] lg:h-[715px] overflow-auto flex flex-col w-full shadow-xl bg-white rounded-2xl">
          <PlaceOrder />
          {/* <SkeletonCheckoutOrder /> */}
      </div>
    </div>
  );
}
