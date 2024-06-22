import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <div className="flex justify-center items-center md:flex-row flex-col">
      <IoCartOutline size={100} className="mx-5 text-gray-600"/> 
      <div className="flex flex-col items-center text-gray-600">
          <h1 className="text-xl font-semibold">
            Tú carrito está vacío
          </h1>
          <Link 
            href='/'
            className="text-blue-500 mt-2 md:text-xl text-base btn-primary w-full text-center"
          >
            Regresar
          </Link>
      </div>
    </div>
  );
}