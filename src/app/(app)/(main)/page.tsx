import { BranchOfficeGrid } from "@/components";
import { branchesData } from "@/seed/branch-office";

export default function MainPage() {
  return (
    <div className="p-2 px-3">
      <BranchOfficeGrid branches={branchesData} />
    </div>
  );
}