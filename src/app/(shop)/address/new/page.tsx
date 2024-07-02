import { Title } from "@/components";
import { NewAddressPage } from "./ui/NewAddressPage";
import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";

export default async function NewAddress(){
    const countries = await getCountries();
    const session = await auth();
  
    if(!session?.user){
      return (
        <h3 className='text-5xl'>500 - No hay sesión de usuario</h3>
      )
    }
  
    const userAddress = await getUserAddress(session.user.id) ?? undefined;
  return (
    <>
        <Title title="Nueva dirección" />
        <NewAddressPage countries={countries} userStoreAddress={ userAddress } />
    </>
  )
}
