interface Props {
    address: {
        firstName: string;
        lastName: string;
        address: string;
        address2?: string | undefined;
        postalCode: string;
        city: string;
        country: string;
        phone: string;

        id?: string;
        countryId?: string;
        orderId?: string;
    },

    name?: string;
    title?: string;
    textSize?: string;
    gap?: string;
    mb?: string;
    mt?: string;
}

export const DeliveryAddress = ({address, title = 'text-xl', textSize = 'text-sm', gap = 'gap-2', mb = 'mb-2', mt = 'mt-2', name = 'text-sm'}:Props) => {
  return (
    <>
      <h2 className={`${title} ${mb} font-bold`}>Dirección de entrega</h2>

      <div className={`flex flex-col ${gap} ${mt}`}>
        <div className="flex justify-between">
          <p className={`text-gray-600 ${name}`}>
            {address.firstName} {address.lastName}
          </p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200" />
      </div>
      <div className={`flex flex-col ${gap} ${mt}`}>
        <div className="flex justify-between">
          <p className={`text-right text-gray-500 ${textSize}`}>Estado</p>
          <p className={`text-right text-gray-500 ${textSize}`}>
            {address.city}, {address.countryId ? address.countryId : address.country}
          </p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200" />
      </div>
      <div className={`flex flex-col ${gap} ${mt}`}>
        <div className="flex justify-between">
          <p className={`text-right text-gray-500 ${textSize}`}>Calle</p>
          <p className={`text-right text-gray-500 ${textSize}`}>{address.address}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200" />
      </div>
      <div className={`flex flex-col ${gap} ${mt}`}>
        <div className="flex justify-between">
          <p className={`text-right text-gray-500 ${textSize}`}>Código Postal</p>
          <p className={`text-right text-gray-500 ${textSize}`}>
            {address.postalCode}
          </p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200" />
      </div>
      <div className={`flex flex-col ${gap} ${mt} mb-6`}>
        <div className="flex justify-between">
          <p className={`text-right text-gray-500 ${textSize}`}>Teléfono</p>
          <p className={`text-right text-gray-500 ${textSize}`}>{address.phone}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200" />
      </div>
    </>
  );
};
