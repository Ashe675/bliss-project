export const revalidate = 60;

import { searchBranches } from "@/actions";
import { BranchOfficeGrid, Search, Title } from "@/components";
interface Props {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export default async function MainPage({ searchParams }: Props) {
  const search = searchParams.search ?? '';
  const branchesData = await searchBranches(search)
  console.log("branches data: ",branchesData);
  

  return (
    <div className="p-2 px-3">
      <Title title="Sucursales" />
      <Search />
      {
        branchesData.length ? (
          <BranchOfficeGrid branches={branchesData} />
        ) : (
          <div className=" p-28 text-center text-white/70 ">
            No hay sucursales que mostrar.
          </div>
        )
      }
    </div>
  );
}
