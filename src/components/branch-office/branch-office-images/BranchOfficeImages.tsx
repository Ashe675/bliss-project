"use client";

import { deleteImageByUrl } from "@/actions";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import {
  IconAlertTriangleFilled,
  IconSquareRoundedCheckFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  images: {
    publicId: string;
    url: string;
  }[];
}

export const BranchOfficeImages = ({ images }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const toastId = useRef<null | number | string>(null);
  const router = useRouter();

  const handleDeleteImage = async (imageUrl: string) => {
    setIsLoading(true);
    toastId.current = toast.loading(`Eliminando imagen...`);
    const res = await deleteImageByUrl(imageUrl);
    if (!res.ok) {
      toast.update(toastId.current!, {
        render: res.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        icon: <IconAlertTriangleFilled color="#dc2626" />,
      });
    } else {
      toast.update(toastId.current!, {
        render: res.message,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        icon: <IconSquareRoundedCheckFilled className=" text-green-500" />,
      });
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div className=" flex flex-col space-y-1">
      <label className=" text-lg text-center">
        Imágenes subidas de la sucursal
      </label>
      <div className=" flex gap-3 flex-wrap justify-center ">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.url}>
              <Image
                width={120 * (16 / 9)}
                height={120}
                src={image.url}
                alt={`Imagen de sucursal`}
                className=" rounded-t-md"
              />
              <CustomButton
                type="cancel"
                disabled={isLoading}
                className=" rounded-t-none font-light w-full"
                onClick={() => handleDeleteImage(image.url)}
              >
                Eliminar
              </CustomButton>
            </div>
          ))
        ) : (
          <div>Aun no hay imagenes</div>
        )}
      </div>
    </div>
  );
};
