"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Address, Country, FormInputs } from "@/interfaces";
import { useState } from "react";
import { createNewAddress, getCodigoPostal, setUserAdress } from "@/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormAddress, addressSchema } from "@/components";
import { useAddressStore } from "@/store";

interface Props {
  countries: Country[];
  userStoreAddress?: Partial<Address>;
}

const Schema = addressSchema;

export const NewAddressPage = ({ countries, userStoreAddress = {} }: Props) => {
  const router = useRouter();
  const { handleSubmit, register, getValues, setValue } = useForm<FormInputs>({
    resolver: yupResolver(Schema),
  });

  const { data: session } = useSession({
    required: true, //Si la persona no esta autenticada la va a mandar al login
  });

  const [colonias, setColonias] = useState([]);
  const [isCheckPostalCode, setIsCheckPostalCode] = useState(false);
  const [isLoadingPostalCode, setIsLoadingPostalCode] = useState(false);
  const [isErrorPostalCode, setIsErrorPostalCode] = useState(false);
  const setAddress = useAddressStore(state => state.setAddress);

  const validatedCodigoPostal = async () => {
    setIsLoadingPostalCode(true);
    const postalCode = getValues("postalCode");
    const data = await getCodigoPostal(postalCode);
    if (!data) {
      setIsErrorPostalCode(true);
      setIsLoadingPostalCode(false);
      return;
    }
    setValue("state", data.estado);
    setValue("city", data.municipio);
    setColonias(data.colonias);
    setIsCheckPostalCode(true);
    setIsLoadingPostalCode(false);
    setIsErrorPostalCode(false);
  };

  const onSubmit = async (data: FormInputs) => {
    const { ...restAddress } = data;
    if (!userStoreAddress) {
      await setUserAdress(restAddress, session!.user.id);
    }

    await createNewAddress(restAddress, session!.user.id);
    
    setAddress(restAddress);

    router.push("/address");
  };

  return (
    <>
      <FormAddress
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        validatedCodigoPostal={validatedCodigoPostal}
        isLoadingPostalCode={isLoadingPostalCode}
        isErrorPostalCode={isErrorPostalCode}
        isCheckPostalCode={isCheckPostalCode}
        userStoreAddress={userStoreAddress}
        colonias={colonias}
        countries={countries}
        btnTitle={"Crear dirección"}
        isAddressCheckout={false}
        iconBtn={false}
      />
    </>
  );
};
