import clsx from "clsx";
import { IoCardOutline, IoCartOutline } from "react-icons/io5";

interface Props {
    isPaid: boolean;
}       

export const OrderStatus = ({isPaid}:Props) => {

  return (
    <div>
    {isPaid ? (
      <>
        <button
          type="button"
          className="flex cursor-default font-bold w-full gap-2 items-center text-white bg-gradient-to-br from-green-400 to-blue-600 rounded-lg text-base md:px-5 px-2 md:py-2.5 py-1 text-center md:me-2 md:mb-2"
        >
          <IoCardOutline className="text-white hidden md:flex" size={30}/>
          Pagada
        </button>
      </>
    ) : (
      <>
        <button
          type="button"
          className="flex cursor-default font-bold w-full gap-2 items-center text-white bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg text-base md:px-5 px-2 md:py-2.5 py-1 text-center md:me-2 md:mb-2"
        >
          <IoCardOutline className="text-white hidden md:flex" size={30}/>
          No Pagada
        </button>
      </>
    )}
  </div>
  )
};
