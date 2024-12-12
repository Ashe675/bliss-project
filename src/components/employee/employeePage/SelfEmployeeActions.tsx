"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import {
  IconAlertTriangleFilled,
  IconCirclePlus,
  IconSquareRoundedCheckFilled,
} from "@tabler/icons-react";

import { useSession } from "next-auth/react";
import ImageWidget from "@/components/ui/image-widget/ImageWidget";
import { ErrorMessageSmall } from "@/components/ui/error-message/ErrorMessageSmall";
import { createPost } from "@/actions";
import { toast } from "react-toastify";

interface Props {
  employeeId: string;
}

export const SelfEmployeeActions: React.FC<Props> = ({ employeeId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toastId = useRef<null | number | string>(null);

  const { data: session } = useSession();

  const userId = session?.user?.id;

  const closeModal = () => {
    setIsOpen(false);
    setTitle("");
    setError("");
  };

  useEffect(() => {
    if (userId === employeeId) {
      setCanRender(true);
    } else {
      setCanRender(false);
    }
  }, [userId, employeeId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.trim().replace(/\s+/g, " ") === "") {
      return setError("El título es obligatiorio.");
    }
    if (e.target.value.trim().replace(/\s+/g, " ").length < 4) {
      return setError("El título debe contener más de 4 caracteres.");
    }
    setError("");
  };

  const handleSubmitPost = async (images: File[]) => {
    if (error || title === "") {
      setError("El título es obligatiorio.");
      return false;
    }
    const formData = new FormData();

    formData.append("title", title);

    for (const image of images) {
      formData.append("images", image);
    }

    toastId.current = toast.loading(`${"Subiendo publicación..."}`);
    setIsLoading(true);
    const res = await createPost(formData);
    setIsLoading(false);

    if (!res.ok) {
      toast.update(toastId.current!, {
        render: res.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        icon: <IconAlertTriangleFilled color="#dc2626" />,
      });

      return false;
    } else {
      toast.update(toastId.current!, {
        render: res.message,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        icon: <IconSquareRoundedCheckFilled className=" text-green-500" />,
      });

      return true;
    }
  };

  if (!canRender) {
    return <></>;
  }
  return (
    <div>
      <div className="flex space-x-10 justify-between sm:justify-center ">
        <CustomButton
          type="secondary"
          className="w-32"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex justify-center items-center">
            <p>Subir Corte</p>
            <IconCirclePlus size={20} className="ml-2" />
          </div>
        </CustomButton>
      </div>

      <div>
        <ImageWidget
          title="Nueva Publicación"
          closeWidget={closeModal}
          isWidgetOpen={isOpen}
          maxFiles={5}
          isSquare
          maxSize={10}
          handleSubmitImage={handleSubmitPost}
          isError={!!error}
        >
          <div className=" flex flex-col mt-3">
            <label htmlFor="title" className="">
              Título
            </label>
            <input
              value={title}
              onChange={handleChange}
              disabled={isLoading}
              type="text"
              id="title"
              className=" input"
              placeholder="Ingrese un título para su publicación"
            />
            {error && <ErrorMessageSmall>{error}</ErrorMessageSmall>}
          </div>
        </ImageWidget>
      </div>
    </div>
  );
};
