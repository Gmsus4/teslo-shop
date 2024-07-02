import { getUserAddress } from "@/actions";
import { auth } from "@/auth.config";
import { Title } from "@/components";
import { AddressCard } from "./ui/AddressCard";

export default async function Address() {
    const session = await auth();
  
    if(!session?.user){
      return (
        <h3 className='text-5xl'>500 - No hay sesión de usuario</h3>
      )
    }
  
    const userAddress = await getUserAddress(session.user.id) ?? undefined;
  return (
    <>
      <Title title="Mis direcciones" />
        <AddressCard userAddress={userAddress} />
    </>
  );
}
