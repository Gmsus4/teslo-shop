import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs my-10 gap-4">
        <Link href='/'>
            Privacidad & Legal
        </Link>

        <Link href='/'>
            <span className={`${titleFont.className} antialiased font-bold`}>Teslo </span>
            <span>| shop</span>
            <span>©️ {new Date().getFullYear()}</span>
        </Link>

        <Link href='/'>
            Ubicaciones
        </Link>
    </div>
  )
}
