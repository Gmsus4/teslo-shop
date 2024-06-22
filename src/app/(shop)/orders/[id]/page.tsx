import { getOrderById } from "@/actions";
import { Title } from "@/components";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

interface Props {
  params: {
    id: string;
  }
} 

export default async function OrdersByIdPage({ params }:Props) {
  const { id } = params;
  // Todo: Llamar el server action

  const { ok, order } = await getOrderById(id);
  if( !ok ){
    redirect('/');
  }

  const address = order?.OrderAddress;
  
  return (
    <div className="flex justify-center gap-4 md:gap-16 flex-col md:flex-row">
      <div className="flex flex-col xl:min-w-[600px] lg:min-w-[500px] md:w-[400px] w-auto mx-4 px-4 md:px-0 md:mx-0 h-[100%]">
        <Title className="text-sm mt-0 mb-0 " title={`Orden #${ id.split('-').at(-1) }`}/>
        {/* Carrito */}
        <div className="overflow-x-hidden overflow-auto md:h-[600px] scroll-smooth">
          {/* overflow-x-hidden overflow-auto */}
          {/* <div className={
            clsx(
              "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
              {
                'bg-red-500': !order!.isPaid,
                'bg-green-700': order!.isPaid
              }
            )
          }>
            <IoCartOutline size={30}/>
            <span className="mx-2">Pendiente de pago</span>
            <span className="mx-2">{order?.isPaid ? 'Pagada' : 'No pagada'}</span>
          </div> */}

        {/* Items */}
        {order!.OrderItem.map((item) => (      
        <div key={item.product.slug + '-' + item.size} className="flex flex-col w-full">
          <div className="w-full h-0.5 rounded bg-gray-200"/>
          <div className="flex mb-1 justify-between items-center sm:gap-10 w-full">
            <div className="flex items-center my-1 w-full">
              <Image
                src={`/products/${item.product.ProductImage[0].url}`}
                width={100}
                height={100}
                style={{
                  width: "80px",
                  height: "80px",
                }}
                alt={item.product.title}
                className="mr-5 rounded"
              />
              <div className="rest w-full">
                <div className="title-size-price-delete w-full">
                  <div className="flex gap-2 items-center justify-between title-btnDelete w-full">
                    <p className="font-bold">{item.product.title}</p>
                  </div>
                  </div>
                  <p className="text-gray-500 text-sm">${item.price} x {item.quantity} — {item.size}</p>
                  {/* <p className="text-gray-500 text-sm">${item.price} x {item.quantity}</p> */}
                  {/* <p className="text-gray-500 text-sm">{item.quantity} {item.quantity > 1 ? 'productos' : 'producto'}</p> */}
                  <p className="font-bold text-lg text-gray-500"><span className="font-normal">Subtotal:</span> {currencyFormat(item.price * item.quantity)}</p>  
                  <div className="w-10 sm:hidden flex">
                  </div>
                </div>
              </div>
            </div>
          </div>
    ))}
        </div>
      </div>

      {/* Checkout - Resumen de la compra*/}
      <div className="bg-white rounded-xl shadow-2xl p-7 mb-10 mx-4 md:mx-0">
      <h2 className="text-xl mb-2 font-bold">Dirección de entrega</h2>

      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between">
          <p className="text-gray-600">{address!.firstName}  {address!.lastName}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200"/>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between">
          <p className="text-right text-gray-500 text-sm">Estado</p>
          <p className="text-right text-gray-500 text-sm">{address!.city}, {address!.countryId}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200"/>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between">
          <p className="text-right text-gray-500 text-sm">Calle</p>
          <p className="text-right text-gray-500 text-sm">{address!.address}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200"/>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between">
          <p className="text-right text-gray-500 text-sm">Código Postal</p>
          <p className="text-right text-gray-500 text-sm">{address!.postalCode}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200"/>
      </div>
      <div className="flex flex-col gap-2 mt-2 mb-6">
        <div className="flex justify-between">
          <p className="text-right text-gray-500 text-sm">Teléfono</p>
          <p className="text-right text-gray-500 text-sm">{address!.phone}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200"/>
      </div>

      <h2 className="text-xl mb-2 font-bold">Resumen de orden</h2>
      {/* Divider */}
        <div className="flex flex-col">
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between">
            <span className="text-gray-500">No. Productos</span>
            <span className="text-right text-gray-500">{order?.itemsInOrder === 1 ? '1 artículo' : `${order?.itemsInOrder} artículos`}</span>
          </div>

          <div className="w-full h-0.5 rounded bg-gray-200"/>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-right text-gray-500">{currencyFormat(order!.subTotal)}</span>
          </div>

          <div className="w-full h-0.5 rounded bg-gray-200"/>
        </div>

        <div className="flex flex-col gap-2 mt-2 mb-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Impuestos (15%)</span>
            <span className="text-right text-gray-500">{currencyFormat(order!.tax)}</span>
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
              <span className="text-right text-xl font-bold mb-2">{currencyFormat(order!.total) }</span>
            </div>
            <div className="flex justify-between">
              <span className="mb-2 text-sm">IVA incluido</span>
              <span className="text-right mb-2 text-sm"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full lg:w-[300px]">
          <div className={
            clsx(
              "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white",
              {
                'bg-red-500': !order!.isPaid,
                'bg-green-700': order!.isPaid
              }
            )
          }>
            <IoCartOutline size={30}/>
            {/* <span className="mx-2">Pendiente de pago</span> */}
            <span className="mx-2">{order?.isPaid ? 'Pagada' : 'No pagada'}</span>
          </div>
      </div>
    </div>
    </div>
  );
}