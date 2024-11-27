"use client";

import { CustomButton } from "@/components/ui/buttons/CustomButton";
import Image from "next/image";
import React from "react";

interface Props {
  images: {
    publicId: string;
    url: string;
  }[];
}

export const BranchOfficeImages = ({ images }: Props) => {
  return (
    <div className=" flex flex-col space-y-1">
      <label className=" text-lg text-center">Imágenes subidas de la sucursal</label>
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
                className=" rounded-t-none font-light w-full"
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
