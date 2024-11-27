import { searchAdminBranches } from "@/actions";
import {
  BranchOfficeGrid,
  CustomButton,
  Navbar,
  Search,
  Title,
} from "@/components";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export const metadata = {
  title: "Admin - Branches",
  description: "Administra tus sucursales.",
};

export default async function BranchesPage({ searchParams }: Props) {
  const search = searchParams.search ?? "";
  const res = await searchAdminBranches(search);
  if (!res.ok) notFound();

  const branchesData = res.data?.branches;

  return (
    <>
      <Title title="Sucursales" />
      <Search />
      {res.data?.branches && res.data?.branches.length < 5 && (
        <Link href="/admin/branches/new">
          <CustomButton type="secondary" className="flex items-center mb-4">
            <span>Agregar Sucursal</span>
            <IconPlus size={20} stroke={3} className=" ml-1" />
          </CustomButton>
        </Link>
      )}
      {branchesData && branchesData.length ? (
        <BranchOfficeGrid branches={branchesData} />
      ) : (
        <div className=" p-28 text-center text-white/70 ">
          No hay sucursales que mostrar.
        </div>
      )}
      <Navbar />
    </>
  );
}
