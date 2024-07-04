import { Address, Country, FormInputs } from "@/interfaces";
import Link from "next/link";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { FaCheckCircle, FaRegAddressCard } from "react-icons/fa";
import { MdDelete, MdError } from "react-icons/md";

interface Props {
  handleSubmit: UseFormHandleSubmit<
    FormInputs,
    undefined
  > /* Estos address eran FormInputs */;
  onSubmit: (data: FormInputs) => Promise<void>;
  register: UseFormRegister<FormInputs>;
  validatedCodigoPostal: () => Promise<void>; //Función para validar el código postal
  deleteAddress?: () => Promise<void>; //Función para eliminar un address de tipo model AllUserAddress(De momento)
  isLoadingPostalCode: boolean; //Es el loading que se muestra mientras hace la petición para mostrar el código postal
  isErrorPostalCode: boolean; //Muestra un mensaje si existe un error con la petición del código postal, de la función validatedCodigoPostal()
  isCheckPostalCode: boolean; //Un valor boolean si el usuario a buscado mediante el código postal y ha obtenido información
  userStoreAddress: Partial<Address>;
  colonias: never[];
  countries: Country[];
  btnTitle: string; //Asignarle un nombre al botón de acción
  btnNameLoading: string //Asignarle un nombre al loading de los botones de acción
  isAddressCheckout: boolean; //Que si viene de la pagina de checkout/address
  iconBtn: boolean; //Mostrar ciertos Iconos dentro de los botones
  isAddressUnique?: boolean; //Si la información del address es de tipo unique.
  isLoading: boolean //Es el loading de la acción al presionar el botón de acción
  isLoadingDelete?: boolean //Es el loading de la acción al presionar el botón de delete(Eliminar)
}

export const FormAddress = ({
  handleSubmit,
  onSubmit,
  register,
  validatedCodigoPostal,
  deleteAddress,
  isLoadingPostalCode,
  isErrorPostalCode,
  isCheckPostalCode,
  userStoreAddress,
  isAddressCheckout,
  isAddressUnique = false,
  isLoading,
  isLoadingDelete,
  colonias,
  countries,
  btnTitle,
  iconBtn,
  btnNameLoading
}: Props) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:p-10 p-4 rounded-xl"
    >
      <div>
        <label
          htmlFor="nombres"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Nombres
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>

          <input
            {...register("firstName", { required: true })}
            type="text"
            id="nombres"
            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
            placeholder="Bonnie"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="apellidos"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Apellidos
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>

          <input
            {...register("lastName", { required: true })}
            type="text"
            id="apellidos"
            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
            placeholder="Green"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="address"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Calle y número
        </label>
        <input
          {...register("address", { required: true })}
          type="text"
          id="address"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Calle, número ext e int"
          required
        />
      </div>
      <div>
        <label
          htmlFor="address2"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Dirección 2 (opcional)
        </label>
        <input
          {...register("address2")}
          type="text"
          id="address2"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder=""
        />
      </div>
      <div>
        <label
          htmlFor="codigopostal"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Código postal
        </label>
        <input
          {...register("postalCode", { required: true })}
          type="text"
          id="codigopostal"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Por ejemplo, 01000"
          required
        />
        {isLoadingPostalCode ? (
          <button
            type="button"
            className="py-1 px-4 text-xs font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-500"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-blue-500 animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Cargando...
          </button>
        ) : (
          <button
            onClick={validatedCodigoPostal}
            type="button"
            className="py-1 px-4 text-xs font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-500"
          >
            Validar código postal
          </button>
        )}

        {isErrorPostalCode && (
          <span className="flex justify-start gap-2 mt-2">
            <MdError size={50} className="text-red-500 h-full" />
            <p className="text-red-500 text-xs">
              Tienes que proporcionar un código postal válido dentro de nuestra
              área de servicio.
            </p>
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="estado"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Estado/Provincia/Región
        </label>
        <input
          {...register("state", { required: true })}
          type="text"
          id="estado"
          className="bg-gray-50 border border-gray-00 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder=""
          required
        />
      </div>
      <div>
        <label
          htmlFor="ciudad"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Ciudad
        </label>
        <input
          {...register("city", { required: true })}
          type="text"
          id="ciudad"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder=""
          required
        />
      </div>

      <div>
        <label
          htmlFor="colonia"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Colonia
        </label>
        {userStoreAddress.suburb && !isCheckPostalCode ? (
          <input
            {...register("suburb", { required: true })}
            type="text"
            id="colonia"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=""
            required
          />
        ) : isAddressUnique && !isCheckPostalCode ? (
          <input
            {...register("suburb", { required: true })}
            type="text"
            id="colonia"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=""
            required
          />
        ) : (
          <select
            {...register("suburb", { required: true })}
            required
            id="colonia"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">[ Seleccione ]</option>
            {colonias.map((colonia, index) => (
              <option key={index} value={colonia}>
                {colonia}
              </option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          País o región
        </label>
        <select
          required
          {...register("country", { required: true })}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">[ Seleccione ]</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="tel"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Teléfono
        </label>
        <input
          {...register("phone", { required: true })}
          type="number"
          id="tel"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder=""
          required
        />
      </div>
      {isAddressCheckout && (
        <Link
          href={"/address"}
          className="flex items-center text-blue-600 cursor-pointer hover:border-blue-700 transition-colors duration-300 border-dashed border-2 border-blue-600 justify-center gap-2 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Cambiar dirección de entrega
          {iconBtn && <FaRegAddressCard size={15} />}
        </Link>
      )}

        {
          !isAddressUnique && (
            <div className="flex">
              {
                !isLoadingDelete ? (
                  <button type="button" onClick={deleteAddress} className="flex items-center justify-center px-4 h-full gap-2 text-red-900 bg-red-200 rounded-lg">
                    <MdDelete/>
                    Borrar
                  </button>
                ) : (
                  <button disabled type="button" className="flex items-center transition-colors duration-300 justify-center text-red-900 bg-red-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    Eliminando...
                  </button>
                )
              }
            </div>
          )
        }

      {
        !isLoading ? (
          <button
            type="submit"
            className="flex items-center transition-colors duration-300 justify-center gap-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {btnTitle}
            {iconBtn && <FaCheckCircle size={15} />}
          </button>
        ) : (
          <button disabled type="button" className="flex items-center transition-colors duration-300 justify-center text-white bg-gray-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            {btnNameLoading}...
          </button>
        )
      }
    </form>
  );
};
