'use client'

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
    const pathname = usePathname(); // "/"
    const searchParams = useSearchParams();  // ReadonlyURLSearchParams { 'page' => '5' }
    const pageString = searchParams.get('page') ?? 1; //El valor de la busqueda del parametro de page => ?page=2 => 2 | ?page=perro => perro
    const currentPage = isNaN( +pageString ) ? 1 : +pageString;// El valor del pageString sera convertido en numero, pero si este no es un numero retornara 1, si es un numero retornara ese numero
    if(currentPage < 1 || isNaN(+pageString)){
      redirect(pathname)
    }
    //console.log(pathname, searchParams, currentPage, pageString);//   /   ??ReadonlyURLSearchParams { 'page' => '5' }  5 5??

    const allPages = generatePaginationNumbers(currentPage, totalPages);
    // console.log(allPages);

    const createPageUrl = ( pageNumber: number | string ) => {
        const params = new URLSearchParams(searchParams);//    =>    ??URLSearchParams { 'page' => '5' }??
        
        if(pageNumber === '...'){
            return `${pathname}?${params.toString()}`//    =>    /?page=5
        }

        if( +pageNumber <= 0){
            return `${ pathname }`;//    =>    href="/" o href="/kid" Lo que sea que venga en el pathname
        }

        if( +pageNumber > totalPages){ //Next >
            return `${pathname}?${params.toString()}`//    =>    /?page=5
        }

        params.set('page', pageNumber.toString());
        return `${ pathname }?${ params.toString()}`;
    }
  return (
    <div className="flex text-center mt-10 mb-32 justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className={
                clsx(
                  "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                  {
                    'text-gray-500 cursor-default pointer-events-none tabIndex="-1" aria-disabled="true"': currentPage === 1
                  }
                )
              }
              href={ createPageUrl(currentPage - 1) } //El -1 es porque vamos hacia atras, una pagina menos
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {
            allPages.map((page, index) => (
              <li key={index} className="page-item">
                <Link
                  className={
                    clsx(
                      "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                      {
                        'bg-blue-600 shadow-sm text-white hover:bg-blue-700 hover:text-white': page === currentPage
                      }

                    )
                  }
                  href={createPageUrl(page)}
                >
                  {page}
                </Link>
              </li>
            ))
          }

          <li className="page-item">
            <Link
              className={
                clsx(
                  "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                  {
                    'text-gray-500 cursor-default pointer-events-none tabIndex="-1" aria-disabled="true"': currentPage === totalPages
                  }
                )
              }
              href={ createPageUrl(currentPage + 1) } //El +1 es porque vamos hacia adelante, una pagina mas
            >
              <IoChevronForwardOutline size={30}/>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
