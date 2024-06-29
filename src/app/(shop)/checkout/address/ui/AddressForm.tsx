"use client";

import clsx from "clsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Address, Country } from "@/interfaces";
import { useAddressStore } from "@/store";
import { useEffect } from "react";
import { deleteUserAddress, setUserAdress } from "@/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormInputs {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
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
  firstName: yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .required('El nombre es obligatorio'),
  
  lastName: yup.string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede tener más de 50 caracteres')
    .required('El apellido es obligatorio'),
  
  address: yup.string()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(100, 'La dirección no puede tener más de 100 caracteres')
    .required('La dirección es obligatoria'),
  
  address2: yup.string()
    .max(100, 'La segunda dirección no puede tener más de 100 caracteres'),
  
  postalCode: yup.string()
    .matches(/^\d{5,10}$/, 'El código postal debe ser un número de 5 a 10 dígitos')
    .required('El código postal es obligatorio'),
  
  city: yup.string()
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(50, 'La ciudad no puede tener más de 50 caracteres')
    .required('La ciudad es obligatoria'),
  
  country: yup.string()
    .required('El país es obligatorio'),
  
  phone: yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'El número de teléfono no es válido')
    .required('El teléfono es obligatorio'),
  
  rememberAddress: yup.boolean(),
});

export const AddressForm = ({ countries, userStoreAddress = {} }: Props) => {
  const router = useRouter();
  const { handleSubmit, register, formState: { errors, isValid }, reset } = useForm<FormInputs>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      ...(userStoreAddress as any),
      rememberAddress: true,
    }
  });

  const { data: session } = useSession({
    required: true //Si la persona no esta autenticada la va a mandar al login
  })

  const setAddress = useAddressStore(state => state.setAddress);
  const address = useAddressStore(state => state.address);

  useEffect(() => {
    if(address.firstName){
      reset(address)
    }
  }, [address, reset])
  

  const onSubmit = async (data: FormInputs) => {
    //console.log({data});
    const { rememberAddress, ...restAddress} = data;
    setAddress(restAddress);

    if( rememberAddress ){
      await setUserAdress(restAddress, session!.user.id)
    } else {
      await deleteUserAddress(session!.user.id)
    }

    router.push('/checkout')
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) } className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
      {/* Nombres */}
      <div className="flex flex-col mb-2">
        {/* <span>Nombres</span> */}
        <label
          htmlFor="name"
          className={clsx(
            "block mb-2 text-sm font-medium text-gray-900 required",
            {
              "text-red-600": !!errors.firstName?.message,
              // "text-green-600": isValid
            }
          )}
        >
          Nombres
        </label>
        <input type="text" { ...register('firstName', { required: true })} className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
            "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
              !!errors.firstName?.message,
            "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
              isValid,
          })}/>
        {errors.firstName?.message && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-500">
            <span className="font-medium">Oops! </span>
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* Apellidos */}
      <div className="flex flex-col mb-2">
        {/* <span>Nombres</span> */}
        <label
          htmlFor="name"
          className={clsx(
            "block mb-2 text-sm font-medium text-gray-900 required",
            {
              "text-red-600": !!errors.lastName?.message,
              // "text-green-600": isValid
            }
          )}
        >
          Apellidos
        </label>
        <input type="text" { ...register('lastName', { required: true })} className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
            "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
              !!errors.lastName?.message,
            "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
              isValid,
          })}/>
        {errors.lastName?.message && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-500">
            <span className="font-medium">Oops! </span>
            {errors.lastName.message}
          </p>
        )}
      </div>

      {/* Dirección */}
      <div className="flex flex-col mb-2">
        {/* <span>Nombres</span> */}
        <label
          htmlFor="name"
          className={clsx(
            "block mb-2 text-sm font-medium text-gray-900 required",
            {
              "text-red-600": !!errors.address?.message,
              // "text-green-600": isValid
            }
          )}
        >
          Dirección
        </label>
        <input type="text" { ...register('address', { required: true })} className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
            "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
              !!errors.address?.message,
            "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
              isValid,
          })}/>
        {errors.address?.message && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-500">
            <span className="font-medium">Oops! </span>
            {errors.address.message}
          </p>
        )}
      </div>

      {/* Dirección 2 */}
      <div className="flex flex-col mb-2">
        {/* <span>Nombres</span> */}
        <label
          htmlFor="name"
          className={clsx(
            "block mb-2 text-sm font-medium text-gray-900 required",
            {
              "text-red-600": !!errors.address2?.message,
              // "text-green-600": isValid
            }
          )}
        >
          Dirección 2 (opcional)
        </label>
        <input type="text" { ...register('address2')} className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
            "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
              !!errors.address2?.message,
            "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
              isValid,
          })}/>
      </div>
   
      {/* Código postal */}
      <div className="flex flex-col mb-2">
        {/* <span>Nombres</span> */}
        <label
          htmlFor="name"
          className={clsx(
            "block mb-2 text-sm font-medium text-gray-900 required",
            {
              "text-red-600": !!errors.postalCode?.message,
              // "text-green-600": isValid
            }
          )}
        >
          Código postal
        </label>
        <input type="text" { ...register('postalCode', { required: true })} className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
            "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
              !!errors.postalCode?.message,
            "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
              isValid,
          })}/>
        {errors.postalCode?.message && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-500">
            <span className="font-medium">Oops! </span>
            {errors.postalCode.message}
          </p>
        )}
      </div>

      {/* Ciudad */}
      <div className="flex flex-col mb-2">
        {/* <span>Nombres</span> */}
        <label
          htmlFor="name"
          className={clsx(
            "block mb-2 text-sm font-medium text-gray-900 required",
            {
              "text-red-600": !!errors.city?.message,
              // "text-green-600": isValid
            }
          )}
        >
          Ciudad
        </label>
        <input type="text" { ...register('city', { required: true })} className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
            "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
              !!errors.city?.message,
            "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
              isValid,
          })}/>
        {errors.city?.message && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-500">
            <span className="font-medium">Oops! </span>
            {errors.city.message}
          </p>
        )}
          
      </div>

      {/* País */}
      <div className="flex flex-col mb-2">
        {/* <span>Nombres</span> */}
        <label
          htmlFor="name"
          className={clsx(
            "block mb-2 text-sm font-medium text-gray-900 required",
            {
              "text-red-600": !!errors.country?.message,
              // "text-green-600": isValid
            }
          )}
        >
          País
        </label>
        <select { ...register('country', { required: true })} className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
            "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
              !!errors.country?.message,
            "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
              isValid,
          })}>
          <option value="">[ Seleccione ]</option>
          {
            countries.map( country => (
              <option key={ country.id } value={country.id}>{country.name}</option>
            ))
          }
        </select>
        {errors.country?.message && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-500">
            <span className="font-medium">Oops! </span>
            {errors.country.message}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div className="flex flex-col mb-2">
        {/* <span>Nombres</span> */}
        <label
          htmlFor="name"
          className={clsx(
            "block mb-2 text-sm font-medium text-gray-900 required",
            {
              "text-red-600": !!errors.phone?.message,
              // "text-green-600": isValid
            }
          )}
        >
          Teléfono
        </label>
        <input type="text" { ...register('phone', { required: true })} className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
            "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
              !!errors.phone?.message,
            "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
              isValid,
          })}/>
        {errors.phone?.message && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-500">
            <span className="font-medium">Oops! </span>
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* ¿Recordar dirección? */}
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
              { ...register('rememberAddress')}
            //   checked
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
          // href="/checkout"
          type="submit"
          className="btn-primary"
          // disabled={ !isValid }
          // className={ clsx({
          //   'btn-primary': isValid,
          //   'btn-disabled': !isValid
          // })
          // }
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
