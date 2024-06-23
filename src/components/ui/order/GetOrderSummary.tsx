import { currencyFormat } from "@/utils";

interface Props {
  itemsInCart: number;
  subTotal: number;
  tax: number;

  title?: string;
  textSize?: string;
  gap?: string;
  mb?: string;
  mt?: string;
}
export const GetOrderSummary = ({
  itemsInCart,
  subTotal,
  tax,

  title = "text-xl",
  textSize = "text-sm",
  gap = "gap-2",
  mb = "mb-2",
  mt = "mt-2",
}: Props) => {
  return (
    <div className="">
      <h2 className={`${title} ${mb} font-bold`}>Resumen de la compra</h2>
      {/* Divider */}
      <div className={`flex flex-col`}>
        <div className={`flex flex-col ${gap} ${mt}`}>
          <div className={`flex justify-between`}>
            <span className={`text-gray-500 ${textSize}`}>No. Productos</span>
            <span className={`text-gray-500 ${textSize}`}>
              {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
            </span>
          </div>

          <div className={`w-full h-0.5 rounded bg-gray-200`} />
        </div>

        <div className={`flex flex-col ${gap} ${mt}`}>
          <div className={`flex justify-between`}>
            <span className={`text-gray-500 ${textSize}`}>Subtotal</span>
            <span className={`text-gray-500 ${textSize}`}>
              {currencyFormat(subTotal)}
            </span>
          </div>

          <div className={`w-full h-0.5 rounded bg-gray-200`} />
        </div>

        <div className={`flex flex-col ${gap} ${mt} ${mb}`}>
          <div className={`flex justify-between`}>
            <span className={`text-gray-500 ${textSize}`}>Impuestos (15%)</span>
            <span className={`text-gray-500 ${textSize}`}>
              {currencyFormat(tax)}
            </span>
          </div>

          <div className={`w-full h-0.5 rounded bg-gray-200`} />
        </div>
      </div>
    </div>
  );
};
