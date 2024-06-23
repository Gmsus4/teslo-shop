export const SkeletonOrderSummary = () => {
  return (
    <>
      <div className="flex flex-col justify-between h-full animate-pulse py-0 my-0">
        {/* Container Logo Carrito - Resumen de la compra */}
        <div className="flex flex-col h-full justify-between mb-10 ">
          {/* Loading...  */}
          <div className="items-center hidden lg:flex w-full justify-center h-full">
            <div className="preloader pr-4 my-1">
              <svg
                className="cart"
                role="img"
                aria-label="Shopping cart line animation"
                viewBox="0 0 128 128"
                width="128px"
                height="128px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="8"
                >
                  <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                    <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                    <circle cx="43" cy="111" r="13" />
                    <circle cx="102" cy="111" r="13" />
                  </g>
                  <g className="cart__lines__gray" stroke="currentColor">
                    <polyline
                      className="cart__top"
                      points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                      stroke-dasharray="338 338"
                      stroke-dashoffset="-338"
                    />
                    <g className="cart__wheel1" transform="rotate(-90,43,111)">
                      <circle
                        className="cart__wheel-stroke"
                        cx="43"
                        cy="111"
                        r="13"
                        stroke-dasharray="81.68 81.68"
                        stroke-dashoffset="81.68"
                      />
                    </g>
                    <g className="cart__wheel2" transform="rotate(90,102,111)">
                      <circle
                        className="cart__wheel-stroke"
                        cx="102"
                        cy="111"
                        r="13"
                        stroke-dasharray="81.68 81.68"
                        stroke-dashoffset="81.68"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          {/*Resumen de la compra - Porductos, Subtotal e Impuestos */}
          <div>
            <div className="flex items-center justify-between">
              <div>
                <div className="h-6 bg-gray-500 rounded-full w-52 mb-1.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3">
              <div className="h-5 bg-gray-300 rounded-full w-28"></div>
              <div className="h-5 bg-gray-300 rounded-full w-20"></div>
            </div>
            <div className="flex items-center justify-between pt-5">
              <div className="h-5 bg-gray-300 rounded-full w-20"></div>
              <div className="h-5 bg-gray-300 rounded-full w-28"></div>
            </div>
            <div className="flex items-center justify-between pt-5">
              <div className="h-5 bg-gray-300 rounded-full w-28"></div>
              <div className="h-5 bg-gray-300 rounded-full w-14"></div>
            </div>
          </div>
        </div>

        {/* Total de la compra - Boton Checkout */}
        <div>
          <div className="lex items-center justify-between pt-2 border-none mb-2">
            <div className="flex gap-2 justify-between">
              <div className="bg-transparent w-32 h-2.5 rounded-full"></div>
              <div className="w-32 h-2.5 bg-gray-100 rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-0 border-none mb-2 mt-3">
            <div className="h-5 bg-gray-500 rounded-full w-16"></div>
            <div className="h-5 bg-gray-500 rounded-full w-32"></div>
          </div>
          <div className="lex items-center justify-between border-none top-0 mt-3">
            <div className="flex gap-2 justify-between">
              <div className="w-20 h-4 bg-gray-100 rounded-full"></div>
              <div className="bg-transparent w-32 h-2.5 rounded-full"></div>
            </div>
          </div>

          {/* Botón */}
          <div className="flex items-center justify-between mt-8 mb-0 p-0">
            <div className="h-10 bg-gray-500 rounded w-full flex items-center overflow-hidden justify-center">
              <span className="text-white">Loading...</span>
            </div>
          </div>

          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
};
