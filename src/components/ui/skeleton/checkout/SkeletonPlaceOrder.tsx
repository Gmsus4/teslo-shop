export const SkeletonPlaceOrder = () => {
  return (
    <div
      role="status"
      className="p4 space-y-4 divide-y divide-gray-200 rounded animate-pulse lg:h-[715px] w-full p-7 mx-4 md:mx-0 shadow-xl pt-9"
    >
      {/* Direccion de entrega */}
      <div className="flex items-center justify-between w-full">
        <div className="w-full">
          <div className="h-5 bg-gray-500 rounded-full w-40 mb-2.5"></div>
          <div className="w-32 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="w-32 h-2.5 bg-gray-300 rounded-full"></div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
        <div className="w-32 h-2.5 bg-gray-300 rounded-full"></div>
      </div>

      {/*Resumen de la compra - Porductos, Subtotal e Impuestos */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-5 bg-gray-500 rounded-full w-40 mb-2.5"></div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="w-32 h-2.5 bg-gray-300 rounded-full"></div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
        <div className="flex items-center justify-between" />
      </div>

      {/* El total a pagar */}
      <div className="lex items-center justify-between pt-2 border-none">
        <div className="flex gap-4 justify-between">
          <div className="bg-transparent w-32 h-2.5 rounded-full"></div>
          <div className="w-32 h-2.5 bg-gray-100 rounded-full"></div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-0 border-none mb-0">
        <div className="h-5 bg-gray-500 rounded-full w-16"></div>
        <div className="h-5 bg-gray-500 rounded-full w-16"></div>
      </div>
      <div className="lex items-center justify-between border-none top-0">
        <div className="flex gap-4 justify-between">
          <div className="w-32 h-2.5 bg-gray-100 rounded-full"></div>
          <div className="bg-transparent w-32 h-2.5 rounded-full"></div>
        </div>
      </div>

      {/* Terminos y condiciones */}
      <div className="flex items-start justify-between pt-4 flex-col">
        <div className="h-2.5 bg-gray-300 rounded-full w-full mb-2"></div>
        <div className="h-2.5 bg-gray-300 rounded-full w-40"></div>
      </div>

      {/* Botón */}
      <div className="flex items-center justify-between pt-4">
        <div className="h-10 bg-gray-500 rounded w-32 mb-2.5 flex items-center overflow-hidden justify-center">
          <span className="text-white">Loading...</span>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
