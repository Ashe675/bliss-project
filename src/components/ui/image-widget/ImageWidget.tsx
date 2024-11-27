"use client";
import { FileRejection, useDropzone } from "react-dropzone";
import CustomModal from "../modal/CustomModal";
import { CustomButton } from "../buttons/CustomButton";
import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { SpinnerCircle } from "../loaders/spinner-circle/SpinnerCircle";

interface Props {
  isWidgetOpen: boolean;
  closeWidget: () => void;
  handleSubmitImage: (files: File[]) => Promise<boolean>;
  maxFiles: number;
  maxSize: number;
  isSquare: boolean;
  classNameImageItem?: string;
  children?: React.ReactNode;
  isError?: boolean;
}

export default function ImageWidget({
  isWidgetOpen,
  closeWidget,
  handleSubmitImage,
  maxFiles,
  maxSize,
  isSquare,
  classNameImageItem,
  children,
  isError,
}: Props) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setErrorMessage("");
    if (fileRejections.length > 0) {
      const error = fileRejections[0].errors[0];
      let message = "";

      switch (error.code) {
        case "file-too-large":
          message = `Uno de los archivos es demasiado grande. El tamaño máximo permitido es de ${maxSize}MB.`;
          break;
        case "file-invalid-type":
          message = "Tipo de archivo no permitido. Solo se permiten imágenes.";
          break;
        case "too-many-files":
          message = `Demasiados archivos. Solo puedes subir hasta ${maxFiles} archivos a la vez.`;
          break;
        default:
          message =
            "Ocurrió un error al cargar los archivos. Inténtalo nuevamente.";
      }

      setErrorMessage(message);

      // Elimina el mensaje de error después de 5 segundos
      setTimeout(() => {
        setErrorMessage(null);
      }, 7000);
    } else {
      setSelectedImages((prevImages) => {
        // Combina las imágenes previamente seleccionadas con las nuevas
        const newImages = [...prevImages, ...acceptedFiles];

        // Si el total excede maxFiles, corta para mantener solo las últimas maxFiles
        if (newImages.length > maxFiles) {
          return newImages.slice(-maxFiles); // Mantiene solo las últimas maxFiles imágenes
        }

        return newImages;
      });
      setErrorMessage(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: maxFiles > 1,
    maxFiles: maxFiles,
    maxSize: maxSize * 1024 * 1024,
    onDrop,
  });

  const handleClickAccept = async () => {
    setErrorMessage("");
    if (selectedImages.length <= 0)
      return setErrorMessage("Debes subir al menos una imagen.");
    setIsLoading(true);
    const isSuccess = await handleSubmitImage(selectedImages);
    if (isSuccess) {
      setSelectedImages([]);
      closeWidget();
    }
    return setIsLoading(false);
  };

  const handleClickCancel = () => {
    if (isLoading) return;
    setSelectedImages([]);
    setErrorMessage("");
    closeWidget();
  };

  const handleQuitImage = (index: number) => {
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  return (
    <CustomModal
      closeModal={handleClickCancel}
      onClickBackDrop={handleClickCancel}
      isOpen={isWidgetOpen}
      className=" bg-secondary"
    >
      {!isLoading ? (
        <>
          <section className=" space-y-6">
            {selectedImages.length < maxFiles && (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed mx-auto p-6 transition-colors 
                    ${
                      isDragActive
                        ? " border-white bg-white/10"
                        : "border-gray-400 "
                    }`}
              >
                <input {...getInputProps()} />
                <p className="text-white/60">
                  {isDragActive
                    ? maxFiles > 1
                      ? "¡Suelta las imagenes aquí!"
                      : "¡Suelta la imagen aquí!"
                    : maxFiles > 1
                    ? "Arrastra y suelta las imagenes aquí, o haz clic para seleccionar las imagenes."
                    : "Arrastra y suelta la imagen aquí, o haz clic para seleccionar la imagen."}
                </p>{" "}
                <p className="text-xs text-white/60 mt-1">
                  Solo imágenes, tamaño máximo de {maxSize}MB por imagen.
                </p>
                {maxFiles > 1 && (
                  <p className="text-xs text-white/60 mt-1">
                    Máximo de imágenes {maxFiles}.
                  </p>
                )}
              </div>
            )}

            {selectedImages.length > 0 && (
              <div
                className={` flex gap-3 flex-wrap items-center  border-2 p-6 border-dashed border-gray-400 justify-evenly `}
              >
                {selectedImages.map((image, index) => (
                  <div key={index} className=" relative  ">
                    <IconX
                      stroke={3}
                      className=" bg-red-500 text-white rounded-full size-5 p-0.5 absolute -right-1.5 -top-1.5 shadow-sm hover:cursor-pointer hover:bg-red-600 transition-colors"
                      onClick={() => {
                        handleQuitImage(index);
                      }}
                    />

                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      className={` h-32 object-cover ${
                        !isSquare ? `aspect-[16/9]` : "w-32"
                      } ${classNameImageItem}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
          {errorMessage && (
            <p className="error-message text-red-500 text-sm pt-1">
              *{errorMessage}
            </p>
          )}
        </>
      ) : (
        <div className=" mb-10">
          <h2 className=" text-white text-center pb-10">
            Subiendo {maxFiles > 1 ? "imágenes" : "imagen"}, por favor espere...
          </h2>
          <SpinnerCircle size={60} />
        </div>
      )}
      {children}
      <div className=" flex gap-2 pt-6">
        <CustomButton
          type="cancel"
          disabled={isLoading}
          onClick={handleClickCancel}
          className=" w-full"
        >
          Cancelar
        </CustomButton>
        <CustomButton
          type="success"
          onClick={handleClickAccept}
          className=" w-full"
          disabled={!!errorMessage || isLoading || isError}
        >
          Subir
        </CustomButton>
      </div>
    </CustomModal>
  );
}
