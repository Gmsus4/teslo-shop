import { Title } from "@/components";
import { NewAddressPage } from "./ui/NewAddressPage";
import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";

export default async function NewAddress() {
  const countries = await getCountries();
  const session = await auth();

  if (!session?.user) {
    return <h3 className="text-5xl">500 - No hay sesión de usuario</h3>;
  }

  const userAddress = (await getUserAddress(session.user.id)) ?? undefined;
  console.log(userAddress);
  return (
    <div className="flex flex-col sm:justify-center sm:items-center md:h-[80vh] md:mb-0 md:px-10 p-1 sm:px-0">
      <div className="w-full flex flex-col justify-center text-left">
        <Title title="Nueva dirección"/>
        <NewAddressPage countries={countries} userStoreAddress={userAddress} />
      </div>
    </div>
  );
}
