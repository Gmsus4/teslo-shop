"use client";

import { authenticate } from "@/actions/auth/login";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  // const router =useRouter();
  useEffect(() => {
    if(state === 'Success'){
      window.location.replace('/');
    }
  }, [state])

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      {state === 'CredentialsSignin' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline"> Credenciales no son correctas</span>
        </div>
      )}

      <LoginButton />

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <div className="flex items-center justify-center w-full rounded-lg flex-col gap-4">
        <button 
          className="w-full flex items-center justify-center gap-2 bg-[#f8f8f8] rounded-lg px-6 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-white"
          type="button"
          onClick={() => signIn('google')} 
        >
          <FcGoogle size={30}/>
          Ingresar con Google
        </button>

        <button 
          className="w-full text-white font-bold bg-[#5865F2] flex items-center justify-center gap-2 rounded-lg px-6 py-2 text-sm hover:bg-[#444fc7] transition-colors duration-300"
          type="button"
          onClick={() => signIn('discord')} 
        >
          <FaDiscord size={30} className=""/>
          Conectar con Discord
        </button>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <button 
      type="submit" 
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending
      })}
        disabled={ pending }
      >
      Ingresar
    </button>
  );
}