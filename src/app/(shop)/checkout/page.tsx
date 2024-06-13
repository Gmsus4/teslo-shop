import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  // initialData.products[3],
  // initialData.products[4],
  // initialData.products[5],
  // initialData.products[6],
  // initialData.products[7],
  // initialData.products[8],
  // initialData.products[9],
]

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
        {
          productsInCart.map(product => (
            <div key={product.slug} className="flex mb-5">
                <Image 
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                  alt={product.title}
                  className="mr-5 rounded"
                />
              <div>
                <p>{product.title}</p>
                <p>${product.price} x 3</p>
                <p className="font-bold">Subtotal: ${product.price * 3}</p>
                <button className="underline mt-3">
                  Remover
                </button>
              </div>
            </div>
          ))
        }
        </div>
      </div>
      {/* Checkout - Resumen de la compra*/}
      <div className="py-7 md:p-7 flex flex-col md:w-[550px]"> {/* bg-white rounded-xl shadow-xl */} 
        <div className="bg-white rounded-xl shadow-xl p-7">
          <h2 className="text-xl mb-2 font-bold">Dirección de entrega</h2>

          <div className="mb-10 ">
            <p className="text-xl">Fernando Gómez</p>
            <p>Jalisco, MX</p>
            <p>San Juanito de Escobedo</p>
            <p>Mercado #47</p>
            <p>Col. Centro</p>
            <p>CP. 46560</p>
            <p>Tel. +52 3861112341</p>
          </div>

          {/* Divider */}
          <div className="w-full h-0.5 rounded bg-gray-200 mb-10"/>

          <h2 className="text-xl mb-2 font-bold">Resumen de orden</h2>

          <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-right">3 Articulos</span>

            <span>Subtotal</span>
            <span className="text-right">$100</span>

            <span>Impuestos</span>
            <span className="text-right">$0</span>

            <span className="mb-2 text-sm mt-5"></span>
            <span className="text-right mb-2 mt-5 text-sm text-gray-400">Calculado al pagar</span>

            <span className="text-xl font-bold">Total</span>
            <span className="text-right text-xl font-bold">$100</span>

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
            <Link 
              className="flex btn-primary justify-center"
              href="/orders/123">
              Colocar orden
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}