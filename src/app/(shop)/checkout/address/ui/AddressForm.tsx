"use client";

import clsx from "clsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Address, Country } from "@/interfaces";
import { useAddressStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { deleteUserAddress, getCodigoPostal, setUserAdress } from "@/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdError } from "react-icons/md";

interface FormInputs {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  state: string;
  suburb: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress?: boolean;
}

interface Props {
  countries: Country[];
  userStoreAddress?: Partial<Address>;
}

const addressSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .required("El nombre es obligatorio"),

  lastName: yup
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede tener más de 50 caracteres")
    .required("El apellido es obligatorio"),

  address: yup
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(100, "La dirección no puede tener más de 100 caracteres")
    .required("La dirección es obligatoria"),

  address2: yup
    .string()
    .max(100, "La segunda dirección no puede tener más de 100 caracteres"),

  postalCode: yup
    .string()
    .matches(
      /^\d{5,10}$/,
      "El código postal debe ser un número de 5 a 10 dígitos"
    )
    .required("El código postal es obligatorio"),

  state: yup
    .string()
    .min(2, "El estado debe tener al menos 2 caracteres")
    .max(50, "El estado no puede tener más de 50 caracteres")
    .required('El estado debe ser obligatorio'),

  suburb: yup
    .string()
    .min(2, "La colonia debe tener al menos 2 caracteres")
    .max(50, "La colonia no puede tener más de 50 caracteres")
    .required('La colonia debe ser obligatoria'),

  city: yup
    .string()
    .min(2, "La ciudad debe tener al menos 2 caracteres")
    .max(50, "La ciudad no puede tener más de 50 caracteres")
    .required("La ciudad es obligatoria"),

  country: yup.string().required("El país es obligatorio"),

  phone: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, "El número de teléfono no es válido")
    .required("El teléfono es obligatorio"),

  rememberAddress: yup.boolean(),
});

export const AddressForm = ({ countries, userStoreAddress = {} }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<FormInputs>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      ...(userStoreAddress as any),
      rememberAddress: true,
    },
  });

  const { data: session } = useSession({
    required: true, //Si la persona no esta autenticada la va a mandar al login
  });

  const setAddress = useAddressStore((state) => state.setAddress);
  const address = useAddressStore((state) => state.address);

  // useEffect(() => {
  //   if (address.firstName) {
  //     reset(address);
  //   }
  // }, [address, reset]);

  const [colonias, setColonias] = useState([]);
  const [isCheckPostalCode, setIsCheckPostalCode] = useState(false);
  const [isLoadingPostalCode, setIsLoadingPostalCode] = useState(false);
  const [isErrorPostalCode, setIsErrorPostalCode] = useState(false);

  const validatedCodigoPostal = async() => {
    setIsLoadingPostalCode(true);
    const postalCode = getValues('postalCode');
    
    const data = await getCodigoPostal(postalCode);
    if(!data){
      setIsErrorPostalCode(true);
      setIsLoadingPostalCode(false);
      return;
    };
    setValue("state", data.estado);
    setValue("city", data.municipio);
    // setValue("suburb", data.colonias);
    setColonias(data.colonias);
    setIsCheckPostalCode(true);
    setIsLoadingPostalCode(false);
    setIsErrorPostalCode(false)
    // setValue("suburb", data.colonias);


    console.log(data);
    // console.log(dataPostalCode);
  }
  const onSubmit = async (data: FormInputs) => {
    //console.log({data});
    const { rememberAddress, ...restAddress } = data;
    setAddress(restAddress);

    if (rememberAddress) {
      await setUserAdress(restAddress, session!.user.id);
    } else {
      await deleteUserAddress(session!.user.id);
    }

    router.push("/checkout");
  };

  return (
    <>
      {/* <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
      >
        <div className="flex flex-col mb-2">
          <label
            htmlFor="name"
            className={clsx(
              "block mb-2 text-sm font-medium text-gray-900 required",
              {
                "text-red-600": !!errors.firstName?.message,
              }
            )}
          >
            Nombres
          </label>
          <input
            type="text"
            {...register("firstName", { required: true })}
            className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
              "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
                !!errors.firstName?.message,
              "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
                isValid,
            })}
          />
          {errors.firstName?.message && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-500">
              <span className="font-medium">Oops! </span>
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <label
            htmlFor="name"
            className={clsx(
              "block mb-2 text-sm font-medium text-gray-900 required",
              {
                "text-red-600": !!errors.lastName?.message,
              }
            )}
          >
            Apellidos
          </label>
          <input
            type="text"
            {...register("lastName", { required: true })}
            className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
              "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
                !!errors.lastName?.message,
              "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
                isValid,
            })}
          />
          {errors.lastName?.message && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-500">
              <span className="font-medium">Oops! </span>
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <label
            htmlFor="name"
            className={clsx(
              "block mb-2 text-sm font-medium text-gray-900 required",
              {
                "text-red-600": !!errors.address?.message,
              }
            )}
          >
            Dirección
          </label>
          <input
            type="text"
            {...register("address", { required: true })}
            className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
              "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
                !!errors.address?.message,
              "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
                isValid,
            })}
          />
          {errors.address?.message && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-500">
              <span className="font-medium">Oops! </span>
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <label
            htmlFor="name"
            className={clsx(
              "block mb-2 text-sm font-medium text-gray-900 required",
              {
                "text-red-600": !!errors.address2?.message,
              }
            )}
          >
            Dirección 2 (opcional)
          </label>
          <input
            type="text"
            {...register("address2")}
            className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
              "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
                !!errors.address2?.message,
              "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
                isValid,
            })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label
            htmlFor="name"
            className={clsx(
              "block mb-2 text-sm font-medium text-gray-900 required",
              {
                "text-red-600": !!errors.postalCode?.message,
              }
            )}
          >
            Código postal
          </label>
          <input
            type="text"
            {...register("postalCode", { required: true })}
            className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
              "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
                !!errors.postalCode?.message,
              "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
                isValid,
            })}
          />
          {errors.postalCode?.message && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-500">
              <span className="font-medium">Oops! </span>
              {errors.postalCode.message}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <label
            htmlFor="name"
            className={clsx(
              "block mb-2 text-sm font-medium text-gray-900 required",
              {
                "text-red-600": !!errors.city?.message,
              }
            )}
          >
            Ciudad
          </label>
          <input
            type="text"
            {...register("city", { required: true })}
            className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
              "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
                !!errors.city?.message,
              "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
                isValid,
            })}
          />
          {errors.city?.message && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-500">
              <span className="font-medium">Oops! </span>
              {errors.city.message}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <label
            htmlFor="name"
            className={clsx(
              "block mb-2 text-sm font-medium text-gray-900 required",
              {
                "text-red-600": !!errors.country?.message,
              }
            )}
          >
            País
          </label>
          <select
            {...register("country", { required: true })}
            className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
              "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
                !!errors.country?.message,
              "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
                isValid,
            })}
          >
            <option value="">[ Seleccione ]</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country?.message && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-500">
              <span className="font-medium">Oops! </span>
              {errors.country.message}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <label
            htmlFor="name"
            className={clsx(
              "block mb-2 text-sm font-medium text-gray-900 required",
              {
                "text-red-600": !!errors.phone?.message,
              }
            )}
          >
            Teléfono
          </label>
          <input
            type="text"
            {...register("phone", { required: true })}
            className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
              "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
                !!errors.phone?.message,
              "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
                isValid,
            })}
          />
          {errors.phone?.message && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-500">
              <span className="font-medium">Oops! </span>
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-2 sm:mt-1">
          <div className="inline-flex items-center mb-10">
            <label
              className="relative flex cursor-pointer items-center rounded-full p-3"
              htmlFor="checkbox"
            >
              <input
                type="checkbox"
                className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                id="checkbox"
                {...register("rememberAddress")}
              />
              <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </label>
            <span>¿Recordar dirección?</span>
          </div>

          <button
            type="submit"
            className="btn-primary"
          >
            Siguiente
          </button>
        </div>
      </form> */}
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto bg-white grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 p-10">
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
          {
            isLoadingPostalCode ? (
              <button
                type="button"
                className="py-1 px-4 text-xs font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-500"
              >
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-blue-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>
                  Cargando...
              </button>
            )
            : (
              <button
                onClick={validatedCodigoPostal}
                type="button"
                className="py-1 px-4 text-xs font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-500"
              >
                Validar código postal
              </button>
            )
          }

          {
            isErrorPostalCode && (
              <span className="flex justify-start gap-2 mt-2">
                <MdError size={50} className="text-red-500 h-full"/>
                <p className="text-red-500 text-xs">Tienes que proporcionar un código postal válido dentro de nuestra área de servicio.</p>
              </span>
            )
          }
        </div>
          {
            isCheckPostalCode && (
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
            )
          }

          {
            isCheckPostalCode && (
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
            )
          }

        {
          isCheckPostalCode && (
            <div>
              <label
                htmlFor="colonia"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Colonia
              </label>
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
            </div>
          )
        }

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
        <div>
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
          {errors.phone?.message && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-500">
              <span className="font-medium">Oops! </span>
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="flex items-center">
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" {...register("rememberAddress")} />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900">
              ¿Recordar dirección?
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </>
  );
};
