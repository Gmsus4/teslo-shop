import { Product } from "@/interfaces"
import Image from "next/image";
import Link from "next/link";

interface Props{
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  return (
    <div className="rounded-md overflow-hidden fade-in">
        <Link href={`/product/${ product.slug }`} >
            <Image 
                src={`/products/${ product.images[0] }`} 
                alt={ product.title}
                className="w-full object-cover" //Se quede dentro de la imagen y se expanda en el espacio que tiene disponible
                width={ 500 }
                height={ 500 }
            />
        </Link>

        <div className="p-4 flex flex-col">
            <Link className="hover:text-blue-600"
                href={`/product/${ product.slug }`} >
                { product.title }
            </Link>
            <span className="font-bold">${ product.price }</span>
        </div>
    </div>
  )
}
