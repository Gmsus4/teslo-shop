"use client";

import { logout } from "@/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";

import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen); //Ture or False
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user; //Verdadero o falso

  const handleLogout = async () => {
    //closeMenu(); // Cierra el nav
    await logout(); // Realiza el logout
    window.location.replace('/');
    //router.push('/'); // Redirige al home
  };

  return (
    <div className={`${isSideMenuOpen ? '' : 'hidden'}`}>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        //Todo: Efecto de slide
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen, //Si el menu no esta abierto voy a añadir esta clase
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menu */}
        <Link
          href="/profile"
          onClick={closeMenu}
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all "
        >
          <IoPersonOutline size={30} />
          <span className="ml-3 text-xl">Perfil</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all "
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>

        {isAuthenticated && ( //Si estoy autenticado
          <button
            className="w-full flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={handleLogout}
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        )}

        {!isAuthenticated && (
          <Link
            onClick={closeMenu}
            href="/auth/login"
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all "
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {/* Line Separator */}
        <div className="w-full h-px bg-gray-200 my-10" />

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all "
        >
          <IoShirtOutline size={30} />
          <span className="ml-3 text-xl">Productos</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all "
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all "
        >
          <IoPeopleOutline size={30} />
          <span className="ml-3 text-xl">Usuarios</span>
        </Link>
      </nav>
    </div>
  );
};
