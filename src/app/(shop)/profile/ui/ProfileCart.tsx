"use client";

import { Session } from "next-auth";
import { ProductImage } from "@/components";
import { useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { deleteProfileUserImage, uploadImageUser } from "@/actions";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";
import clsx from "clsx";

interface Props {
  session: Session;
  userData: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    password: string;
    role: Role;
    image: string | null;
} | undefined
}

interface Inputs {
  image: FileList;
}

export const ProfileCart = ({ session, userData }: Props) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    await deleteProfileUserImage(userData?.image ?? '');
    const formData = new FormData();
    const { image } = data;
    // const urlImg = image[0].name;
    
    formData.append("image", image[0]);
    // const { ok } = await uploadImageUser(formData, session.user.id);
    const { ok } = await uploadImageUser(formData, userData!.id);

    if (!ok) {
      alert("Foto de perfil no se pudo actualizar");
      return;
    }


    router.replace(`/profile`);
    console.log("Subiendo imagen...");
    setIsLoading(false);
    // console.log(data.images[0].name)
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center py-10">
          <div
            className="mb-4 rounded-full cursor-pointer relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isLoading ? (
              <div className="inset-0 flex items-center justify-center h-24 w-24 pl-[5px]">
                <div className="spinner">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <>
              <div>
                <ProductImage
                  height={300}
                  width={300}
                  className="w-24 h-24 rounded-full shadow-lg"
                  src={
                    userData!.image 
                      ? userData!.image 
                        : "https://res.cloudinary.com/dozzu7xhx/image/upload/v1719806561/perfil/p8osbgzrxslbx2bygvft.png"
                  }
                  alt="Bonnie image"
                />
                {isHovered && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full">
                    <RiImageAddLine size={40} />
                  </div>
                )}
                <input
                  {...register("image")}
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              </>
            )}
          </div>
          <div className="flex flex-col-reverse gap-4">
            <div className="flex items-center flex-col">
              <h5 className="mb-1 text-xl font-medium text-gray-900">
                {/* {session.user.name} */}
                {userData?.name}
              </h5>
              <p className="text-start text-gray-500 text-sm">
                {/* {session.user.email} */}
                {userData?.email}
              </p>
            </div>
            <span className="text-sm text-gray-500 text-center">{userData?.role === 'admin' ? 'Administrador' : 'Usuario'}</span>
          </div>
          <div className="flex mt-4 md:mt-6">
            <button
              type="submit"
              className={
                clsx(
                  "inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg",
                  {
                    "bg-gray-400 cursor-none disabled": isLoading
                  }
                )
              }
            >
              Subir imagen
            </button>
            <a
              href="#"
              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Message
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
