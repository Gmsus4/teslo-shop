import { getAllUserAddressById, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";
import { Title } from "@/components";
import { AddressCard } from "./ui/AddressCard";

export default async function Address() {
  const session = await auth();

  if (!session?.user) {
    return <h3 className="text-5xl">500 - No hay sesión de usuario</h3>;
  }

  const allAddress = (await getAllUserAddressById(session.user.id)) ?? undefined;
  const userAddress = await getUserAddress(session.user.id) ?? undefined;
  return (
    <div className="flex flex-col sm:justify-center sm:items-center md:h-[88vh] mb-72 md:mb-0 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Mis direcciones" />
        <AddressCard allAddress={allAddress} userAddress={userAddress}/>
      </div>
    </div>
  );
}
