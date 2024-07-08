import { getProductByName } from "@/actions";
import { Pagination, ProductImage } from "@/components"
import { SearchProducts } from "@/components/ui/search/SearchProducts";
import type { ProductImage as pImage, Size } from "@/interfaces";
import { currencyFormat } from "@/utils"
import { Gender } from "@prisma/client";
import Link from "next/link"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

interface Product {
  id: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  sizes: string[]; // Asumiendo que $Enums.Size es un tipo que se puede convertir a un array de strings
  slug: string;
  tags: string[];
  gender: string; // Asumiendo que $Enums.Gender es un tipo que se puede convertir a un string
  categoryId: string;
  ProductImage: pImage[]; // Arreglo de imágenes de producto
}
interface Props {
    products: ({
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
    totalPages: number
}

export const TableProducts = ({totalPages, products}:Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsTerm, setProductsTerm] = useState<Product[]>([]);

  const productsToDisplay = productsTerm.length > 0 ? productsTerm : products;

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const products = await getProductByName(searchTerm);
      setProductsTerm(products || []); // Si products es null, establece un arreglo vacío []
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  return (
    <>
      <div className='flex justify-start md:justify-between items-center mb-5 gap-4 w-full flex-col md:flex-row'>
        <div className="md:w-3/4 w-full">
          <SearchProducts handleSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </div>
        <div className="w-full md:w-1/4 flex items-center md:justify-center justify-start">
          <Link href="/admin/product/new" className='btn-primary flex items-center gap-2 justify-start w-40'>
            Nuevo producto
          </Link> 
        </div>
      </div>

      <div className="mb-10 overflow-auto">
        <table className="min-w-full ">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Título
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Género
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Inventario
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {
              productsToDisplay.map(product => (
                <tr key={product.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link href={`/product/${product.slug}`}>    
                      <ProductImage
                        src={product.ProductImage[0]?.url ?? 'https://res.cloudinary.com/dozzu7xhx/image/upload/v1720374544/teslo-shop/tools/wil2eqzpwgsnuaa2dvvf.png'}
                        width={80}
                        height={80}
                        alt={product.title}
                        className='w-20 h-20 object-cover rounded'
                      />
                    </Link>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link 
                      href={`/admin/product/${product.slug}`}
                      className='hover:underline'
                    >
                      {product.title}
                    </Link>
                  </td>
                  <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    { currencyFormat(product.price )}
                  </td>
                  <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    { product.gender }
                  </td>
                  <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    { product.inStock }
                  </td>
                  <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    { product.sizes.join(', ') }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
