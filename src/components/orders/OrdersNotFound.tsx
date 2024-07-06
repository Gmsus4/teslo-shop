import Link from "next/link"
import { IoCartOutline, IoTicketOutline } from "react-icons/io5"

interface Props {
    title: string,
    subtitle: string
}

export const OrdersNotFound = ({title, subtitle}:Props) => {
  return (
    <div className="bg-gray-100 border border-gray-300 p-4 rounded-md text-center flex flex-col gap-4 items-center px-10 py-10">
        <IoTicketOutline size={80}/>
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-600 mt-2">{subtitle}</p>
        <Link href={'/'} className="flex items-center gap-2 text-white px-4 p-2 bg-blue-500 rounded-lg cursor-pointer shadow-2xl">
        <IoCartOutline size={20} className="text-white"/>
        <p>Explorar productos</p>
        </Link>
  </div>
  )
}
