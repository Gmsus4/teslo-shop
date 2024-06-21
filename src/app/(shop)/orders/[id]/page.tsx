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
    <div className="flex flex-col md:flex-row md:gap-10 md:mt-10 md:items-start justify-center md:mb-10 px-4">
      <div className="flex flex-col justify-evenly md:pt-6">
        <Title title={`Orden #${ id.split('-').at(-1) }`}/>
        {/* Carrito */}
        <div className="flex flex-col mt-5">
          <div className={
            clsx(
              "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5 ",
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

        {/* Items */}
        {
          order!.OrderItem.map(item => (
            <div key={item.product.slug + '-' + item.size} className="flex mb-5">
                <Image 
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />
              <div>
                <p>{item.product.title}</p>
                <p>${item.price} x {item.quantity}</p>
                <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
              </div>
            </div>
          ))
        }
        </div>
      </div>
      {/* Checkout - Resumen de la compra*/}
      <div className="py-7 md:p-7 flex flex-col md:w-[420px]">
        <div className="bg-white rounded-xl shadow-2xl p-7 pb-2">
          <h2 className="text-xl mb-2 font-bold">Dirección de entrega</h2>

          <div className="mb-10 ">
            <p className="text-xl">{address!.firstName}  {address!.lastName}</p>
            <p>{address!.city}, {address!.countryId}</p>
            <p>{address!.address}</p>
            <p>Col. Centro</p>
            <p>CP. {address!.postalCode}</p>
            <p>Tel. {address!.phone}</p>
          </div>

          {/* Divider */}
          <div className="w-full h-0.5 rounded bg-gray-200 mb-10"/>

          <h2 className="text-xl mb-2 font-bold">Resumen de orden</h2>

          <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-right">{order?.itemsInOrder === 1 ? '1 artículo' : `${order?.itemsInOrder} artículos`} </span>

            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(order!.subTotal)}</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">{currencyFormat(order!.tax)}</span>

            <span className="mb-2 text-sm mt-5"></span>
            <span className="text-right mb-2 mt-5 text-sm text-gray-400">Calculado al pagar</span>

            <span className="text-xl font-bold mb-2">Total</span>
            <span className="text-right text-xl font-bold mb-2">{currencyFormat(order!.total) }</span>

            <span className="mb-2 text-sm">IVA incluido</span>
            <span className="text-right mb-2 text-sm"></span>
          </div>
          <div className="mt-5 mb-2 w-full">
            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5 ",
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
    </div>
  );
}