export const revalidate = 60 // 60 segundos

import { redirect } from "next/navigation";

import { getPaginatedProductWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";


interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }:Props) {
  //console.log({searchParams}); => { searchParams: { page: '21' } }
  const page = searchParams.page ? parseInt( searchParams.page ) : 1; //No cambio nada este archivo

  const { products, currentPage, totalPages } = await getPaginatedProductWithImages({ page });

  if(products.length === 0){
    redirect('/');
  }
  
  return (
    <>
      <Title 
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2 text-center"
      />

      <ProductGrid products={products}/>
      <Pagination totalPages={totalPages}/>
    </>
  );
}
