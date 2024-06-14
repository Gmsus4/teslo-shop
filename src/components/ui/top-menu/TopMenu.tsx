'use client'
import { titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link"
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

export const TopMenu = () => {
    const openMenu = useUIStore(state => state.openSideMenu);
    const totalItemsInCart = useCartStore(state => state.getTotalItems());

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      setLoaded(true)
    }, [])
    

  return (
    <nav className="flex px-5 justify-between items-center w-full">
        {/* Logo */}
        <div>
            <Link href="/">
                <span className={`${ titleFont.className } antialiased font-bold`}>Teslo</span>
                <span> | Shop</span>
            </Link>
        </div>

        {/* Center Menu */}
        <div className="hidden sm:block">
            <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men"> Hombres </Link>
            <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women"> Mujeres </Link>
            <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid"> Niños </Link>
        </div>

        {/* Search, Card, Menu */}
        <div className="flex items-center">
            <Link href="/search" className="mx-2">
                <IoSearchOutline className="w-5 h-5"/>
            </Link>

            <Link href="/cart" className="mx-2">
                <div className="relative">
                    { loaded && (totalItemsInCart > 0) && (
                        <span className="absolute px-1 text-xs rounded-full font-bold -right-2 -top-2 bg-blue-700 text-white">
                            { totalItemsInCart }
                        </span>
                    )}
                    <IoCartOutline className="w-5 h-5"/>
                </div>
            </Link>

            <button 
                onClick={openMenu}
                className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
                Menu
            </button>
        </div>
    </nav>
  )
}
