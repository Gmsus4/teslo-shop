import { Title } from "@/components";
import { getAllUserAddressById, getCountries, getUserAddress, getUserAllAddress } from "@/actions";
import { auth } from "@/auth.config";
import { EditAddressPage } from "../../(address)/ui/EditAddressPage";
import { redirect } from "next/navigation";

interface Props {
    params: {
      id: string;
    };
}

export default async function EditAddress({ params }: Props) {
  const countries = await getCountries();
  const session = await auth();

  if (!session?.user) {
    return <h3 className="text-5xl">500 - No hay sesión de usuario</h3>;
  }

  const { id } = params;
  const { ok, address, message } = await getUserAllAddress(id);

  const newAddress = {
    ...address,
    country: address?.countryId
  };

  if(!ok){
    redirect("/");
  }

  return (
    <div className="flex flex-col sm:justify-center sm:items-center md:h-[80vh] md:mb-0 md:px-10 p-1 sm:px-0">
      <div className="w-full flex flex-col justify-center text-left">
        <Title title="Editar dirección" />
        <EditAddressPage countries={countries} address={newAddress!} idAddress={id} message={message}/>
      </div>
    </div>
  );
}
