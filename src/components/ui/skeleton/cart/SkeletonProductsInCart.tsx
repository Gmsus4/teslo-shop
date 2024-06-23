export const SkeletonProductsInCart = (key: any) => {
  return (
    <div
      key={key}
      role="status"
      className="p4 rounded animate-pulse lg:w-[600px] w-auto md:mx-0"
    >
      <div className="w-full h-0.5 rounded bg-gray-200" />
      <div className="flex justify-between items-center sm:gap-10 mt-0 w-full">
        <div className="flex items-center w-full gap-4">
          {/* Image */}
          <svg
            className="w-20 h-20 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
          <div className="rest w-full">
            <div className="title-size-price-delete w-full md:gap-2 gap-0 flex sm:flex-col">
              {/* Title */}
              <div className="sm:flex items-center justify-between title-btnDelete w-full hidden">
                <div className="h-4 bg-gray-500 rounded-full lg:w-60 md:w-40 sm:w-40 flex"></div>
              </div>

              {/* Size and Price */}
              <div className="flex gap-1 flex-col w-full">
                <div className="h-2.5 bg-gray-300 rounded-full w-[90%] sm:w-12 sm:mt-1 md:mt-0"></div>
                <div className="h-1.5 bg-gray-200 rounded-full w-[60%] sm:w-12 sm:hidden"></div>
                <div className="h-1.5 bg-gray-200 rounded-full w-[30%] sm:w-12 sm:hidden"></div>
                <div className="h-1.5 bg-gray-200 rounded-full w-[50%] sm:w-12 sm:hidden"></div>
                <div className="w-10 flex">
                    <div className="h-4 bg-gray-400 hidden rounded-full w-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Total */}
        <div className="sm:flex gap-2 flex-col-reverse items-end sm:flex-row sm:items-center mr-6 ml-10 hidden">
          <div className="w-10 sm:flex hidden">
            <div className="h-4 bg-gray-500 rounded-full w-20"></div>
          </div>
          <div className="w-10 sm:flex hidden">
            <div className="h-4 bg-gray-500 rounded-full w-20"></div>
          </div>
          <div className="w-10 sm:flex hidden">
            <div className="h-4 bg-gray-500 rounded-full w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
