import { SearchPage } from "./ui/SearchPage";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default function Search() {
    return (
        <div>
          <SearchPage />
        </div>
    );
}




// import { getProductByName } from '@/actions';
// import { IoSearchOutline } from 'react-icons/io5';

// export default async function SearchPage() {


//   const products = await getProductByName('Zero');

//   return (
//     <div className='h-[700px] flex justify-between flex-col bg-slate-400'>
//       <div className="h-auto py-2 px-4 rounded flex items-center gap-2 shadow-lg bg-white justify-between">
//         <input className='p-2 outline-none' type="text" placeholder='Buscar productos'/>
//         <div className='btn-primary cursor-pointer'>
//           <IoSearchOutline size={20}/>
//         </div>
//       </div>
//       <div className='h-auto'> 
//         {products ? (
//             <ul>
//               {products.map(product => (
//                 <li key={product.id} className="p-4 border-b border-gray-300">
//                   <h3 className="text-xl font-bold">{product.title}</h3>
//                   <p>{product.description}</p>
//                   <p className="text-lg font-semibold">{`$${product.price}`}</p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="p-4">No se encontraron productos.</p>
//         )}
//       </div>
//     </div>
//   );
// }