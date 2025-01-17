import { Product } from "@/interfaces"
import { ProductGridItem } from "./ProductGridItem";

interface Props {
    products: Product[];
}
export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
        {
            products.map( product => (
                <ProductGridItem 
                    key={product.slug}
                    product={ product }
                  />
            ))
        }
    </div>
  )
}
