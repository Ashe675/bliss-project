"use client";

import { useForm } from "react-hook-form";
import { CustomButton } from "../ui/buttons/CustomButton";
import { OfficeType } from "@prisma/client";
import { ErrorMessageSmall } from "../ui/error-message/ErrorMessageSmall";
import { BranchWithServices } from "@/interfaces";

import { BranchOfficeImages } from "./branch-office-images/BranchOfficeImages";
import ImageInput from "../ui/image-input/ImageInput";
import { useEffect, useRef, useState } from "react";
import { createUpdateBranch } from "@/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  IconAlertTriangleFilled,
  IconSquareRoundedCheckFilled,
} from "@tabler/icons-react";

interface FormInputs {
  name: string;
  description: string;
  address: string;
  longevityYear: number;
  officeType: OfficeType;
}

interface Props {
  branch?: BranchWithServices;
}

export const BranchForm = ({ branch }: Props) => {
  const [images, setImages] = useState<File[]>([]);
  const [errorImages, setErrorImages] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toastId = useRef<null | number | string>(null);
  const router = useRouter();

  useEffect(() => {
    if (images.length > 0) {
      setErrorImages("");
    }
  }, [images]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: {
      name: branch?.name,
      address: branch?.address,
      description: branch?.description,
      longevityYear: branch?.longevityYear,
      officeType: branch?.officeType,
    },
  });

  const onSubmit = async (data: FormInputs) => {
    setErrorImages("");
    if (!branch && images.length <= 0) {
      setErrorImages("Se debe de subir al menos una imagen de la sucursal.");
    }
    const formData = new FormData();
    if (branch) {
      formData.append("id", branch.id);
    }
    formData.append("name", data.name.trim().replace(/\s+/g, " "));
    formData.append("address", data.address.trim().replace(/\s+/g, " "));
    formData.append(
      "description",
      data.description.trim().replace(/\s+/g, " ")
    );
    formData.append("longevityYear", data.longevityYear.toString());
    formData.append("officeType", data.officeType);
    for (const image of images) {
      formData.append("images", image);
    }
    setIsLoading(true);
    toastId.current = toast.loading(
      `${branch ? "Actualizando sucursal..." : "Creando sucursal..."}`
    );
    const res = await createUpdateBranch(formData);
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
      if (!branch) {
        router.replace("/admin/branches");
      } else {
        router.refresh();
      }
      setImages([]);
    }
    setIsLoading(false);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="gap-6 w-full h-full grid grid-cols-1 sm:grid-cols-2 mx-auto max-w-screen-lg"
    >
      <div className="space-y-6">
        <div className=" flex flex-col space-y-1">
          <label htmlFor="name" className=" text-lg">
            Nombre de la sucursal
          </label>
          <input
            disabled={isLoading}
            type="text"
            className="input"
            placeholder="Ingrese el nombre de su sucursal"
            {...register("name", {
              required: "El nombre de la sucursal es obligatorio.",
              maxLength: {
                value: 100,
                message: "El nombre no puede tener más de 100 caracteres.",
              },
              minLength: {
                value: 2,
                message: "El nombre debe tener más de 2 caracteres.",
              },
            })}
          />
          {errors?.name && (
            <ErrorMessageSmall>{errors.name.message}</ErrorMessageSmall>
          )}
        </div>
        <div className=" flex flex-col space-y-1">
          <label htmlFor="description" className=" text-lg">
            Descripción
          </label>
          <textarea
            disabled={isLoading}
            className="input resize-none"
            rows={3}
            placeholder="Ingrese una descripción de su sucursal"
            {...register("description", {
              required: "La descripción de la sucursal es obligatorio.",
              maxLength: {
                value: 300,
                message: "La descripción no puede tener más de 300 caracteres.",
              },
              minLength: {
                value: 5,
                message: "La descripción debe tener más de 5 caracteres.",
              },
            })}
          />
          {errors?.description && (
            <ErrorMessageSmall>{errors.description.message}</ErrorMessageSmall>
          )}
        </div>
        <div className=" flex flex-col space-y-1">
          <label htmlFor="address" className=" text-lg">
            Dirección
          </label>
          <textarea
            disabled={isLoading}
            rows={3}
            className="input resize-none"
            placeholder="Ingrese la dirección de su sucursal"
            {...register("address", {
              required: "La dirección de la sucursal es obligatorio.",
              maxLength: {
                value: 250,
                message: "La dirección no puede tener más de 250 caracteres.",
              },
              minLength: {
                value: 10,
                message: "La dirección debe tener más de 10 caracteres.",
              },
            })}
          />
          {errors?.address && (
            <ErrorMessageSmall>{errors.address.message}</ErrorMessageSmall>
          )}
        </div>
        <div className=" flex flex-col space-y-1">
          <label htmlFor="longevityYear" className=" text-lg">
            Año de inaguración
          </label>
          <input
            type="number"
            min={1900}
            disabled={isLoading}
            max={new Date().getFullYear()}
            className="input max-w-20 text-center"
            placeholder="Año"
            {...register("longevityYear", {
              required: "El año de inaguración de la sucursal es obligatorio.",
              max: {
                value: new Date().getFullYear(),
                message: `El año de inaguración no debe ser mayor a ${new Date().getFullYear()}.`,
              },
              min: {
                value: 1900,
                message: "El año de inaguración no debe ser menor a 1900.",
              },
              validate: (value) =>
                value.toString().includes(".")
                  ? "Año de inaguración inválido."
                  : true,
            })}
          />
          {errors?.longevityYear && (
            <ErrorMessageSmall>
              {errors.longevityYear.message}
            </ErrorMessageSmall>
          )}
        </div>
        <div className=" flex flex-col space-y-1">
          <label className=" text-lg">Tipo de sucursal</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="barbershop"
                disabled={isLoading}
                {...register("officeType", {
                  required: "El tipo de sucursal es obligatorio.",
                  validate: (value) =>
                    value === "barbershop" ||
                    value === "salon" ||
                    "Tipo de sucursal inválido.",
                })}
              />
              <span>Barbería</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="salon"
                disabled={isLoading}
                {...register("officeType", {
                  required: "El tipo de sucursal es obligatorio.",
                  validate: (value) =>
                    value === "barbershop" ||
                    value === "salon" ||
                    "Tipo de sucursal inválido.",
                })}
              />
              <span>Salón</span>
            </label>
          </div>
          {errors?.officeType && (
            <ErrorMessageSmall>{errors.officeType.message}</ErrorMessageSmall>
          )}
        </div>
      </div>
      <div className="space-y-6">
        {branch && <BranchOfficeImages images={branch.images} />}

        {branch && branch?.images?.length < 4 && (
          <div className=" flex flex-col space-y-1">
            <label className=" text-lg">Subir imágenes de la sucursal</label>
            <ImageInput
              disabled={isLoading}
              maxFiles={4 - branch?.images?.length}
              maxSize={5}
              isSquare={false}
              selectedImages={images}
              setSelectedImages={setImages}
            />
            {errorImages && (
              <ErrorMessageSmall>{errorImages}</ErrorMessageSmall>
            )}
          </div>
        )}
        {!branch && (
          <div className=" flex flex-col space-y-1">
            <label className=" text-lg">Subir imágenes de la sucursal</label>
            <ImageInput
              disabled={isLoading}
              maxFiles={4}
              maxSize={5}
              isSquare={false}
              selectedImages={images}
              setSelectedImages={setImages}
            />
            {errorImages && (
              <ErrorMessageSmall>{errorImages}</ErrorMessageSmall>
            )}
          </div>
        )}
      </div>
      <CustomButton
        isSubmit={true}
        disabled={isLoading}
        type="primary"
        className=" w-full sm:col-span-2 mx-auto max-w-lg mt-4"
      >
        Guardar
      </CustomButton>
    </form>
  );
};
