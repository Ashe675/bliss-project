"use client";

import { CustomButton } from "@/components/ui/buttons/CustomButton";
import {
  IconSquareXFilled,
  IconEdit,
  IconSquareRoundedCheckFilled,
  IconAlertTriangleFilled,
  IconAlertTriangle,
} from "@tabler/icons-react";
import Link from "next/link";
import CustomModal from "../../ui/modal/CustomModal";
import { useRef, useState } from "react";
import { deleteBranchBySlug } from "@/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
  branchSlug: string;
  officeName?: string;
}

export const AdminActions = ({ branchSlug, officeName }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toastId = useRef<null | number | string>(null);
  const router = useRouter();

  const handleClose = () => {
    if (isLoading) return;
    setIsOpenModal(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    toastId.current = toast.loading(`Eliminando sucursal...`);
    const res = await deleteBranchBySlug(branchSlug);
    if (!res.ok) {
      toast.update(toastId.current!, {
        render: res.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        icon: <IconAlertTriangleFilled color="#dc2626" />,
      });
      setIsLoading(false);
    } else {
      toast.update(toastId.current!, {
        render: res.message,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        icon: <IconSquareRoundedCheckFilled className=" text-green-500" />,
      });
      setIsOpenModal(false);
      setIsLoading(false);
      router.replace("/admin/branches");
    }
  };

  return (
    <>
      <CustomModal isOpen={isOpenModal} closeModal={handleClose}>
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Eliminar la sucursal{" "}
          {officeName && <span>&quot;{officeName}&quot;</span>}
        </h2>
        <p className="text-gray-100 mb-2 text-center">
          <IconAlertTriangle
            size={24}
            className="text-red-500 inline-block mr-2"
          />
          Esta acción no se puede deshacer
          <IconAlertTriangle
            size={24}
            className="text-red-500 inline-block ml-2"
          />
        </p>
        <p className="text-gray-200 mb-6 text-center">
          ¿Está seguro de eliminar a esta sucursal?
        </p>
        <div className=" flex justify-between gap-x-3">
          <CustomButton
            disabled={isLoading}
            type="primary"
            className=" w-full max-w-48"
            onClick={handleClose}
          >
            <span>Cancelar</span>
          </CustomButton>
          <CustomButton
            disabled={isLoading}
            type="cancel"
            className=" w-full max-w-48"
            onClick={handleDelete}
          >
            <span>Eliminar</span>
          </CustomButton>
        </div>
      </CustomModal>
      <div className=" flex gap-3 sm:gap-10 justify-between sm:justify-center">
        <Link href={`/admin/branches/${branchSlug}`}>
          <CustomButton
            type="primary"
            className=" flex gap-x-1 items-center justify-center text-[14px] sm:text-sm px-2"
          >
            <span>Editar Sucursal</span>
            <IconEdit stroke={2} />
          </CustomButton>
        </Link>
        <CustomButton
          type="cancel"
          className=" flex gap-x-1 items-center justify-center text-[14px] sm:text-sm px-2"
          onClick={() => setIsOpenModal(true)}
        >
          <span>Eliminar Sucursal</span>
          <IconSquareXFilled />
        </CustomButton>
      </div>
    </>
  );
};
