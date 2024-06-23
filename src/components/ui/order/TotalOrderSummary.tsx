import { currencyFormat } from "@/utils";

interface Props {
  total: number;
  mb?: string;
  mt?: string;
  title?: string;
  textSize?: string;
}
export const TotalOrderSummary = ({
  total,
  title = "text-xl",
  textSize = "text-sm",
  mb = "mb-2",
  mt = "mt-5",
}: Props) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span className={`${mb} text-sm ${mt}`}></span>
          <span className={`text-right ${mb} ${mt} text-sm text-gray-400`}>
            Calculado al pagar
          </span>
        </div>
      </div>
      <div className={``}>
        <div className={`flex flex-col`}>
          <div className={`flex flex-col`}>
            <div className={`flex justify-between`}>
              <span className={`font-bold ${mb} ${title}`}>Total</span>
              <span className={`text-xl font-bold ${mb} ${textSize}`}>
                {currencyFormat(total)}
              </span>
            </div>
            <div className={`flex justify-between`}>
              <span className={`${mb} ${textSize}`}>IVA incluido</span>
              <span className={`text-right ${mb} text-sm`}></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
