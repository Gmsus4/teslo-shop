export const revalidate = 0;

import { getOrdersByUser, getPaginatedOrders } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";


interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function OrdersPage({ searchParams }:Props) {
  const page = searchParams.page ? parseInt( searchParams.page ) : 1; //No cambio nada este archivo
  // const { ok, orders = [], totalPages } = await getPaginatedOrders({page, take: 2});
  const { ok, orders = [], totalPages } = await getOrdersByUser({page, take: 2});

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mis órdenes" />

          <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
            <div className="flow-root"> 
              <ul role="list" className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <li key={order.id} className="py-3 sm:py-4">
                      <div className="flex items-center gap-6 md:gap-20 justify-between md:flex-row flex-row">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <ProductImage
                              className="rounded-full object-fill w-16 h-16"
                              alt={order.user.name}
                              src={order.user.image!}
                              width={400}
                              height={400}
                            />
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {order.user.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {order.user.email}
                            </p>
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                              {order.id.split("-").at(-1)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-start gap-2 items-center">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded hidden md:flex">
                            {order.OrderAddress?.firstName}{" "}
                            {order.OrderAddress?.lastName}
                          </span>
                          <div className="flex md:flex-row gap-2 flex-col justify-between">
                            <div>
                              {order.isPaid ? (
                                <>
                                  <button
                                    type="button"
                                    className="flex gap-2 items-center text-white bg-gradient-to-br from-green-400 to-blue-600 font-medium rounded-lg text-xs md:px-5 px-2 md:py-2.5 py-1 text-center md:me-2 md:mb-2"
                                  >
                                    <IoCardOutline className="text-white hidden md:flex" />
                                    Ok Pagada
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    className="flex gap-2 items-center text-white cursor-default bg-gradient-to-br from-pink-500 to-orange-400 font-medium rounded-lg text-xs md:px-5 px-2 md:py-2.5 py-1 text-center md:me-2 md:mb-2"
                                  >
                                    <IoCardOutline className="text-white hidden md:flex" />
                                    No Pagada
                                  </button>
                                </>
                              )}
                            </div>
                            <div className="items-center text-base font-semibold text-gray-900 inline-flex">
                              <Link
                                href={`/orders/${order.id}`}
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:px-5 px-2 md:py-2.5 py-1 text-center md:me-2 md:mb-2 w-full"
                              >
                                Ver orden
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <Pagination totalPages={totalPages!} />
    </>
  );
}
