import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col md:flex-row md:gap-10 md:mt-10 md:items-start justify-center md:mb-10 px-4">
      <div className="flex flex-col justify-evenly md:pt-6">{/* bg-red-400 */}
        <Title title="Verificar orden"/>
        {/* Carrito */}
        <div className="flex flex-col mt-5">
          <span className="text-xl">Ajustar elementos</span>
          <Link href="/cart" className="underline mb-5">
            Editar carrito
          </Link >

        {/* Items */}
        <ProductsInCart />
        </div>
      </div>
      {/* Checkout - Resumen de la compra*/}
      <PlaceOrder />
    </div>
  );
}