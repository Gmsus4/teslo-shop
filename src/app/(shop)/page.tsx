import { getPaginatedProductWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";

interface Props {
  searchParams: {
    page: string;
  }
}

export default async function Home({ searchParams }:Props) {
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  //console.log({searchParams}); => { searchParams: { page: '21' } }

  const { products } = await getPaginatedProductWithImages({ page });
  
  return (
    <>
      <Title 
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products}/>
    </>
  );
}
