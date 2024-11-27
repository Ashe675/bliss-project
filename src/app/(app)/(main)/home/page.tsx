export const revalidate = 60;

import { searchBranches } from "@/actions";
import { auth } from "@/auth.config";
import { BranchOfficeGrid, Search, Title } from "@/components";
import { redirect } from "next/navigation";
interface Props {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export const metadata = {
 title: 'Home',
 description: 'Barberías y salones de belleza disponibles.',
};

export default async function MainPage({ searchParams }: Props) {
  const session = await auth();
  if (session?.user && session.user.role === "employee") {
    redirect(`/employee/${session.user.id}`);
  }
  if (session?.user && session.user.role === "admin") {
    redirect(`/admin`);
  }

  const search = searchParams.search ?? '';
  const branchesData = await searchBranches(search)

  return (
    <div>
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
