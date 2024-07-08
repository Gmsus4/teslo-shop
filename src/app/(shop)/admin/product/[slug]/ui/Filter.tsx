"use client";

import { filterProduct } from "@/actions/product/filter-products";
import clsx from "clsx";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { TableProducts } from "./TableProducts";
import { Gender, Size } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  categories: string[]
  genders: string[]
  tallas: string[]
  precios: string[]
  initialTotalPages: number
  allProducts: ({
    ProductImage: {
        id: number;
        url: string;
        productId: string;
    }[];
} & {
    id: string;
    title: string;
    description: string;
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    gender: Gender;
    categoryId: string;
})[]
}

export function FilterProducts({ categories, genders, tallas, precios, allProducts, initialTotalPages }:Props) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedTallas, setSelectedTallas] = useState<string[]>([]);
  const [selectedPrecios, setSelectedPrecios] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>(allProducts);
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, type: string, value: string) => {
    const updateState = (selectedItems: string[], setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>) => {
      if (event.target.checked) {
        setSelectedItems([...selectedItems, value]);
      } else {
        setSelectedItems(selectedItems.filter(item => item !== value));
      }
    };

    switch (type) {
      case 'category':
        updateState(selectedCategories, setSelectedCategories);
        break;
      case 'gender':
        updateState(selectedGenders, setSelectedGenders);
        break;
      case 'talla':
        updateState(selectedTallas, setSelectedTallas);
        break;
      case 'precio':
        updateState(selectedPrecios, setSelectedPrecios);
        break;
      default:
        break;
    }
  };

  const filter = async() => {
    let genders = selectedGenders.map(gender => gender.toLowerCase());
    let categoriesName = selectedCategories.map(category => category);
    let sizes = selectedTallas.map(sizes => sizes);





    const {totalPages, products} = await filterProduct({genders, categoriesName, sizes});
    setTotalPages(totalPages);
    if(!products[0]){
      alert('No se encontron productos')
      setProducts(allProducts);
      window.location.reload();
    }
    // console.log({category});
    setProducts(products);
    console.log({products});

    // console.log('Selected Categories:', selectedCategories);
    // console.log('Selected Genders:', selectedGenders);
    // console.log('Selected Tallas:', selectedTallas);
    // console.log('Selected Precios:', selectedPrecios);
    // Aquí puedes agregar la lógica para aplicar los filtros
  };

  return (
    <>
      <div>
        <div className={
          clsx(
            "w-full flex justify-between px-2 rounded-xl rounded-b-none shadow-2xl",
            {
              'mb-6 rounded-b-2xl': !isVisible
            }
          )
        }>
          <div className="flex items-center gap-4 p-4 cursor-pointer" onClick={toggleVisibility}> 
            <FaFilter size={20} className="text-gray-500"/>
            <span>
              2 Filters
            </span>
          </div>
          <button type="button" className="bg-blue-600 text-white inline-block px-6 m-4 py-2 rounded-md" onClick={filter}>Filtrar</button>
        </div>
        {isVisible && (
          <div className="grid grid-cols-4 gap-4 p-4 bg-white shadow-2xl rounded-xl rounded-t-none mb-6">
            <div className="flex items-center flex-col justify-start">
              <span className="font-bold mb-4 flex">Categoría</span>
              <div className="flex flex-col gap-4">
                {
                  categories.map((category, idx) => (
                    <div key={idx}>
                      <input 
                        id={`category-${idx}`} 
                        type="checkbox" 
                        className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        onChange={(e) => handleCheckboxChange(e, 'category', category)}
                      />
                      <label htmlFor={`category-${idx}`} className="ms-2 text-sm font-medium text-gray-900">{category}</label>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="flex items-center flex-col justify-start">
              <span className="font-bold mb-4 flex">Género</span>
              <div className="flex flex-col gap-4">
                {
                  genders.map((gender, idx) => (
                    <div key={idx}>
                      <input 
                        id={`gender-${idx}`} 
                        type="checkbox" 
                        className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        onChange={(e) => handleCheckboxChange(e, 'gender', gender)}
                      />
                      <label htmlFor={`gender-${idx}`} className="ms-2 text-sm font-medium text-gray-900">{gender}</label>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="flex items-center flex-col justify-start">
              <span className="font-bold mb-4 flex">Tallas</span>
              <div className="flex flex-col gap-4">
                {
                  tallas.map((talla, idx) => (
                    <div key={idx}>
                      <input 
                        id={`talla-${idx}`} 
                        type="checkbox" 
                        className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        onChange={(e) => handleCheckboxChange(e, 'talla', talla)}
                      />
                      <label htmlFor={`talla-${idx}`} className="ms-2 text-sm font-medium text-gray-900">{talla}</label>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="flex items-center flex-col justify-start">
              <span className="font-bold mb-4 flex">Precio</span>
              <div className="flex flex-col gap-4">
                {
                  precios.map((precio, idx) => (
                    <div key={idx}>
                      <input 
                        id={`precio-${idx}`} 
                        type="checkbox" 
                        className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        onChange={(e) => handleCheckboxChange(e, 'precio', precio)}
                      />
                      <label htmlFor={`precio-${idx}`} className="ms-2 text-sm font-medium text-gray-900">{precio}</label>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        )}
      </div>
      <TableProducts products={products} totalPages={totalPages}/>
    </>
  );  
}
