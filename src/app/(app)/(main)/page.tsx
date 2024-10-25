import { BranchOfficeGrid, Search, Title } from "@/components";
import { branchesData } from "@/seed/branch-office";

interface Props {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export default function MainPage({ searchParams }: Props) {
  const search = searchParams.search;
  console.log(search);

  return (
    <div className="p-2 px-3">
      <Title title="Sucursales" />
      <Search />
      <BranchOfficeGrid branches={branchesData} />
    </div>
  );
}
