import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { FaAddressCard } from "react-icons/fa";

interface Props {
  userAddress:
    | {
        country: string;
        address2: string;
        id: string;
        firstName: string;
        lastName: string;
        address: string;
        postalCode: string;
        phone: string;
        city: string;
        state: string;
        suburb: string;
        userId: string;
      }
    | undefined;
}
export const AddressCard = ({ userAddress }: Props) => {
  if (!userAddress) {
    return (
      <>
      {/* <div className="flex gap-4 items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
        <FaAddressCard size={20} className="text-blue-800"/>
        <span className="font-medium">No tienes ninguna dirección guardada</span> 
      </div> */}
        <Link href={'/address/new'} className="text-gray-500 font-semibold text-2xl mt-10 w-full h-60 border-dashed rounded-lg border-4 border-gray-300 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-gray-500 transition-colors duration-300">
          <AiOutlinePlus size={60} className="text-gray-400" />
            Agregar dirección
        </Link>
      </>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link href={'/address/new'} className="text-gray-500 font-semibold text-2xl w-full h-60 border-dashed rounded-lg border-4 border-gray-300 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-gray-500 transition-colors duration-300">
        <AiOutlinePlus size={60} className="text-gray-400" />
          Agregar dirección
      </Link>
      <div className="w-full h-60 p-6 rounded-lg border-2 border-gray-300 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div>
          <p className="text-sm font-bold text-gray-800">
            {userAddress?.firstName}
          </p>
          <p className="text-sm text-gray-700">{userAddress?.address}</p>
          <p className="text-sm text-gray-700">{userAddress?.suburb}</p>
          <p className="text-sm text-gray-700">
            {userAddress?.city}, {userAddress?.state}, {userAddress?.postalCode}
          </p>
          <p className="text-sm text-gray-700">{userAddress?.country}</p>
          <p className="text-sm text-gray-700">
            Número de teléfono: {userAddress?.phone}
          </p>
        </div>
        <button className="text-sm text-blue-600 hover:underline self-start mt-2">
          Editar
        </button>
      </div>
    </div>
  );
};
