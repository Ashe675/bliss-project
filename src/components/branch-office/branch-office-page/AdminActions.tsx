import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { IconSquareXFilled , IconEdit } from "@tabler/icons-react";
import Link from "next/link";

interface Props {
    branchSlug : string
}


export const AdminActions = ({branchSlug} : Props) => {
  return (
    <div className=" flex gap-3 sm:gap-10 justify-between sm:justify-center">
     <Link href={`/admin/branches/${branchSlug}`}>
     <CustomButton type="primary" className=" flex gap-x-1 items-center justify-center text-[14px] sm:text-sm px-2">
        <span>Editar Sucursal</span>
        <IconEdit stroke={2} />
      </CustomButton>
     </Link>
      <CustomButton type="cancel" className=" flex gap-x-1 items-center justify-center text-[14px] sm:text-sm px-2">
        <span>Eliminar Sucursal</span>
        <IconSquareXFilled  />
      </CustomButton>
    </div>
  );
};
