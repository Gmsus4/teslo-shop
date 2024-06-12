'use client'

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
    const pathname = usePathname(); // "/"
    const searchParams = useSearchParams();  // ReadonlyURLSearchParams { 'page' => '5' }
    const currentPage  = Number(searchParams.get('page')) ?? 1;// 5

    //console.log(pathname, searchParams, currentPage);//   /   ??ReadonlyURLSearchParams { 'page' => '5' }   5??
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
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={ createPageUrl(currentPage - 1) } //El -1 es porque vamos hacia atras, una pagina menos
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          <li className="page-item">
            <a
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              1
            </a>
          </li>
          <li className="page-item active">
            <a
              className="page-link relative block py-1.5 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
              href="#"
            >
              2 <span className="visually-hidden"></span>
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              3
            </a>
          </li>
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
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
