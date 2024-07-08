"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Address, Country, FormInputs } from "@/interfaces";
import { useState } from "react";
import {
  deleteUserAddress,
  getCodigoPostal,
  setUserAdress,
  updateAllUserAddress,
} from "@/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormAddress, addressSchema } from "@/components";
import { useAddressStore } from "@/store";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

interface Props {
  countries: Country[];
  address?: Partial<Address>;
  idAddress: string;
  message: string | null | undefined;
}

const Schema = addressSchema;

export const EditAddressPage = ({
  countries,
  address = {},
  idAddress,
  message,
}: Props) => {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    // formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm<FormInputs>({
    resolver: yupResolver(Schema),
    defaultValues: {
      ...(address as any),
      rememberAddress: true,
    },
  });

  const { data: session } = useSession({
    required: true, //Si la persona no esta autenticada la va a mandar al login
  });

  const [colonias, setColonias] = useState([]);
  const [isCheckPostalCode, setIsCheckPostalCode] = useState(false);
  const [isLoadingPostalCode, setIsLoadingPostalCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isErrorPostalCode, setIsErrorPostalCode] = useState(false);
  const setAddress = useAddressStore((state) => state.setAddress);

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
    setIsLoading(true);
    const { ...restAddress } = data;
    if (message === "Default") {
      await setUserAdress(restAddress, session!.user.id);
        router.replace("/address"),
        router.refresh()
      await new Promise((resolve) => setTimeout(resolve, 500)); 

      MySwal.fire({
        position: "top-end",
        icon: "success",
        title: "Dirección editada",
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }
    setAddress(restAddress);
    await updateAllUserAddress(restAddress, session!.user.id, idAddress);
    router.replace("/address");
    router.refresh();
    await new Promise((resolve) => setTimeout(resolve, 500)); 
    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Dirección editada",
      toast: true,
      showConfirmButton: false,
      timer: 3000,
    });
    setIsLoading(false);
  };

  const deleteAddress = async () => {
    setIsLoadingDelete(true);
    // await deleteUserAddress(session!.user.id, idAddress);
    // router.replace("/address");
    // router.refresh();
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    });
    if (result.isConfirmed) {
      setIsLoadingDelete(true);
      await deleteUserAddress(session!.user.id, idAddress);
      router.replace("/address");
      router.refresh();
      await MySwal.fire({
        title: "Dirección eliminada!",
        text: `La dirección de ha sido eliminada correctamente`,
        icon: "success",
      });
      setIsLoadingDelete(false);
    }
    setIsLoadingDelete(false);
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
        isLoading={isLoading}
        userStoreAddress={address}
        colonias={colonias}
        countries={countries}
        btnTitle={"Editar dirección"}
        isAddressCheckout={false}
        iconBtn={false}
        btnNameLoading="Editando"
        deleteAddress={deleteAddress}
        isLoadingDelete={isLoadingDelete}
        isAddressUnique={false}
      />
    </>
  );
};
