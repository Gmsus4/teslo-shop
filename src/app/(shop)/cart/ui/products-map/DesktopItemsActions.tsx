import { QuantitySelector } from "@/components";
import { CartProduct } from "@/interfaces";
import { IoTrashOutline } from "react-icons/io5";

interface Props {
  product: any;
  actionDelete: (product: any) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
}

export const DesktopItemsActions = ({
  product,
  actionDelete,
  updateProductQuantity,
}: Props) => {
  return (
    <>
      <div className="sm:flex gap-8 flex-col-reverse items-end sm:flex-row sm:items-center mr-6 ml-10 hidden">
        <QuantitySelector
          quantity={product.quantity}
          onQuantityChanged={(quantity) =>
            updateProductQuantity(product, quantity)
          }
        />
        <div className="w-10 sm:flex hidden">
          <p className="font-bold text-xl"> ${product.price}</p>
        </div>
        <IoTrashOutline
          size={20}
          onClick={() => actionDelete(product)}
          className="underline cursor-pointer text-gray-500"
        />
      </div>
    </>
  );
};
