import { QuantitySelector } from "@/components";
import type { CartProduct } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";

interface Props {
  product: any;
  actionDelete: (product: any) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
}

export const MobileItemsHeader = ({
  product,
  actionDelete,
  updateProductQuantity,
}: Props) => {
  return (
    <>
      <div className="flex items-center my-1 w-full">
        <Image
          src={`/products/${product.image}`}
          width={100}
          height={100}
          style={{
            width: "80px",
            height: "80px",
          }}
          alt={product.title}
          className="mr-5 rounded"
        />
        <div className="rest w-full">
          <div className="title-size-price-delete w-full">
            <div className="flex gap-2 items-center justify-between title-btnDelete w-full">
              <Link
                className="hover:cursor-pointer font-bold"
                href={`/product/${product.slug}`}
              >
                {product.title}
              </Link>
              <IoTrashOutline
                size={20}
                onClick={() => actionDelete(product)}
                className="underline cursor-pointer text-gray-500 flex sm:hidden w-10"
              />
            </div>
            <p className="text-gray-500 text-sm">Talla - {product.size}</p>
            <div className="w-10 sm:hidden flex">
              <p className="font-bold text-xl"> ${product.price}</p>
            </div>
          </div>
          <div className="sm:hidden gap-8 flex-col-reverse items-start sm:flex-row sm:items-center mt-4 flex">
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
            <div className="w-10 sm:flex hidden">
              <p className="font-bold text-xl"> ${product.price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
