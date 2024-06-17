"use client";

import clsx from "clsx";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "@/actions";
import { useState } from "react";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre es muy largo, debe tener menos de 50 caracteres")
    .required("El nombre es obligatorio"),
  email: yup
    .string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es obligatorio"),
  password: yup
    .string()
    .min(6, "La contraseña es muy corta, debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

export const RegisterForm = () => {
  // const { register, handleSubmit, formState: {errors} } = useForm<FormInputs>();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const { name, email, password } = data;
    
    //Server action
    const resp = await registerUser(name, email, password);
    if(!resp.ok){
      setErrorMessage( resp.message );
      return;
    }

    console.log( {resp} );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="mb-5">
        <label
          htmlFor="name"
          className={clsx(
            "block mb-2 text-sm font-medium text-gray-900 required",
            {
              "text-red-600": !!errors.name?.message,
              // "text-green-600": isValid
            }
          )}
        >
          Nombre completo
        </label>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
            "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
              !!errors.name?.message,
            "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
              isValid,
          })}
          type="text"
          autoFocus
          {...register("name", { required: true, minLength: 3 })}
        />
        {errors.name?.message && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-500">
            <span className="font-medium">Oops! </span>
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className={clsx(
            "block mb-2 text-sm font-medium text-gray-900 required",
            {
              "text-red-600": !!errors.email?.message,
              // "text-green-600": isValid
            }
          )}
        >
          Correo electrónico
        </label>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
            "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
              !!errors.email?.message,
            "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
              isValid,
          })}
          type="email"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.email?.message && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-500">
            <span className="font-medium">Oops!</span> {errors.email.message}
          </p>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className={clsx(
            "block mb-2 text-sm font-medium text-gray-900 required w-full",
            {
              "text-red-600": !!errors.password?.message,
              // "text-green-600": isValid
            }
          )}
        >
          Contraseña
        </label>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded w-full", {
            "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
              !!errors.password?.message,
            "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
              isValid,
          })}
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password?.message && (
          <p className="mt-2 text-xs text-red-600">
            <span className="font-medium">Oops! </span>
            {errors.password.message}
          </p>
        )}
      </div>

      {
        errorMessage && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <span className="font-medium">{ errorMessage }</span> 
          </div>
        )
      }

      <button className="btn-primary">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
