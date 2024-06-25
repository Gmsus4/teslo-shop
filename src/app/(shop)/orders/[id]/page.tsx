import { getOrderById } from "@/actions";
import {
  DeliveryAddress,
  GetOrderSummary,
  PaypalButton,
  Title,
  TotalOrderSummary,
} from "@/components";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;
  // Todo: Llamar el server action

  const { ok, order } = await getOrderById(id);
  if (!ok) {
    redirect("/");
  }

  const address = order?.OrderAddress;

  return (
    <div className="flex justify-center gap-4 md:gap-16 flex-col md:flex-row">
      <div className="flex flex-col lg:min-w-[500px] md:w-[400px] w-auto mx-4 px-4 md:px-0 md:mx-0">
        <Title
          className="text-sm mt-0 mb-0 "
          title={`Orden #${id.split("-").at(-1)}`}
        />
        <div
          className={clsx(
            "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-4",
            {
              "bg-red-500": !order!.isPaid,
              "bg-green-700": order!.isPaid,
            }
          )}
        >
          <IoCartOutline size={30} />
          <span className="mx-2">{order?.isPaid ? "Pagada" : "No pagada"}</span>
        </div>
        {/* Carrito */}
        <div className="overflow-x-hidden overflow-auto md:h-[600px] scroll-smooth">
          {/* Items */}
          {order!.OrderItem.map((item) => (
            <div
              key={item.product.slug + "-" + item.size}
              className="flex flex-col w-full"
            >
              <div className="w-full h-0.5 rounded bg-gray-200" />
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
                    <p className="text-gray-500 text-sm">
                      ${item.price} x {item.quantity} — {item.size}
                    </p>
                    {/* <p className="text-gray-500 text-sm">${item.price} x {item.quantity}</p> */}
                    {/* <p className="text-gray-500 text-sm">{item.quantity} {item.quantity > 1 ? 'productos' : 'producto'}</p> */}
                    <p className="font-bold text-lg text-gray-500">
                      <span className="font-normal">Subtotal:</span>{" "}
                      {currencyFormat(item.price * item.quantity)}
                    </p>
                    <div className="w-10 sm:hidden flex"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout - Resumen de la compra*/}
      <div className="bg-white rounded-xl shadow-2xl p-7 mb-10 mx-4 md:mx-0 lg:w-[350px] lg:h-[715px] overflow-auto">
        <DeliveryAddress
          address={{
            firstName: address!.firstName,
            lastName: address!.lastName,
            address: address!.address,
            address2: undefined,
            postalCode: address!.postalCode,
            city: address!.city,
            country: "",
            phone: address!.phone,
            countryId: address?.countryId,
          }}
        />
        <GetOrderSummary
          itemsInCart={order!.itemsInOrder}
          subTotal={order!.subTotal}
          tax={order!.tax}
        />
        <TotalOrderSummary total={order!.total} mb="mb-2" mt="mt-5" />

        <div className="mt-4 w-full overflow-auto">
          <PaypalButton amount={order!.total} orderId={order!.id} />
        </div>
      </div>
    </div>
  );
}
