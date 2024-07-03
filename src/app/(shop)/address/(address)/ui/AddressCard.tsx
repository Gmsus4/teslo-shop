'use client'

import { createNewAddress, deleteUserAddress, setUserAdress } from "@/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
  allAddress: {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    address2: string | null;
    postalCode: string;
    phone: string;
    city: string;
    state: string;
    suburb: string;
    countryId: string;
    userId: string;
  }[] | undefined,

  userAddress: {
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
} | undefined,
}

interface AllAddress {
  id: string; //aqui
  firstName: string;
  lastName: string;
  address: string;
  address2?: string | undefined | null;
  postalCode: string;
  phone: string;
  city: string;
  state: string;
  suburb: string;
  countryId: string;
  userId: string; //aqui
}

export const AddressCard = ({ allAddress, userAddress }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  if (!userAddress) {
    return (
      <>
        <Link href={'/address/new'} className="text-gray-500 font-semibold text-2xl mt-10 w-full h-60 border-dashed rounded-lg border-4 border-gray-300 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-gray-500 transition-colors duration-300">
          <AiOutlinePlus size={60} className="text-gray-400" />
            Agregar dirección
        </Link>
      </>
    );
  }
  
  const setUseAddress = async(address:AllAddress) => {
    setIsLoading(true);
    const { id, userId, countryId, ...rest } = address;
    const setAddress = {
      ...rest,
      country: countryId
    }

    try {
      await createNewAddress(userAddress, userId); //Crea una nueva dirección exactamente igual que la dirección de usuario por defecto, la del model UserAddress
      await setUserAdress(setAddress, userId); //Actualiza el UserAddress unique con el address que se le presiono usar
      await deleteUserAddress(userId, id); //Elimina el address AllUserAddress que ya paso a ser parte del UserAddress
  
      // Una vez completadas las tareas, recarga la página
      router.refresh()
      setIsLoading(false);
    } catch (error) {
      console.error('Error al actualizar la dirección:', error);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link href={'/address/new'} className="text-gray-500 font-semibold text-2xl w-full h-60 border-dashed rounded-lg border-4 border-gray-300 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-gray-500 transition-colors duration-300">
        <AiOutlinePlus size={60} className="text-gray-400" />
          Agregar dirección
      </Link>
        <div className="w-full h-60 p-6 rounded-lg border-2 border-blue-400 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
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
          <div className="flex justify-between items-center"> 
            <Link href={`/address/edit/${userAddress.id}`} className="text-sm text-blue-600 hover:underline self-start">
              Editar
            </Link>
            <span className="text-sm text-blue-600 flex items-center gap-2">
              Usando actualmente
              <FaCheckCircle />
            </span>
          </div>
        </div>
      {
        allAddress?.map(address => (
          <div key={address.id} className="w-full h-60 p-6 rounded-lg border-2 border-gray-300 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-sm font-bold text-gray-800">
                {address?.firstName}
              </p>
              <p className="text-sm text-gray-700">{address?.address}</p>
              <p className="text-sm text-gray-700">{address?.suburb}</p>
              <p className="text-sm text-gray-700">
                {address?.city}, {address?.state}, {address?.postalCode}
              </p>
              <p className="text-sm text-gray-700">{address?.countryId}</p>
              <p className="text-sm text-gray-700">
                Número de teléfono: {address?.phone}
              </p>
              {/* <p className="text-xs text-gray-700">
                ID Address: {address?.id}
              </p> */}
            </div>
            <div className="flex justify-between">
              <Link href={`/address/edit/${address.id}`} className="text-sm text-blue-600 hover:underline self-start">
                Editar
              </Link>
              <button onClick={() => setUseAddress(address)} className="text-sm text-gray-600 hover:underline self-start" disabled={isLoading}>
                Usar
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
};
