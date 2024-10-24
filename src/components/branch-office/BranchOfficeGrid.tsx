import { BranchOffice } from "@/interfaces";
import { BranchOfficeGridItem } from "./BranchOfficeGridItem";

interface Props {
  branches: BranchOffice[];
}

export const BranchOfficeGrid = ({ branches }: Props) => {
  return (
    <div className=" grid grid-cols-2  gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {branches.map((branch) => (
        <BranchOfficeGridItem key={branch.name} branch={branch} />
      ))}
    </div>
  );
};
