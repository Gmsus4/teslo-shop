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
    <div className="flex flex-col sm:justify-center sm:items-center mb-4 md:mb-0 px-4 md:px-10">
      <div className="w-full flex flex-col justify-center text-left mb-10">
        <Title title="Mis direcciones" />
        <AddressCard allAddress={allAddress} userAddress={userAddress}/>
      </div>
    </div>
  );
}
