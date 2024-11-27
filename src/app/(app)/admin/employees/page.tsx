import React from "react"
import { CustomButton, Navbar, Search, Title } from "@/components";
import { IconPlus } from "@tabler/icons-react";
import { getEmployeesByAdmin } from "@/actions/employee/get-employees-by-admin";
import { EmployeeGrid } from "@/components/employee/EmployeeGrid";
import Link from "next/link";
export const revalidate = 60;

interface Props {
    searchParams: {
        page?: string;
        search?: string;
    };
}

export default async function EmployeesPage({ searchParams }: Props) {

    const search = searchParams.search ?? '';
    
    const employeesData = await getEmployeesByAdmin(search)

    return (
      <>
        <Title title="Empleados" />
        <Search />
        <Link href="/admin/employees/new">
        <CustomButton type="secondary" className="flex items-center mb-4">
            <span>Agregar Empleado</span>
            <IconPlus size={20} stroke={3} className=" ml-1" />
        </CustomButton>
        </Link>

        {
            employeesData.length ? (
            <EmployeeGrid employees={employeesData} />
            ) : (
            <div className=" p-28 text-center text-white/70 ">
                No hay empleados para mostrar.
            </div>
            )
        }
        <Navbar />
      </>
    );
  }
  





// export default async function MainPage({ searchParams }: Props) {
//   const session = await auth();
//   if (session?.user && session.user.role === "employee") {
//     redirect(`/employee/${session.user.id}`);
//   }
//   if (session?.user && session.user.role === "admin") {
//     redirect(`/admin`);
//   }

//   const search = searchParams.search ?? '';
//   const branchesData = await searchBranches(search)

//   return (
//     <div>
//       <Title title="Sucursales" />
//       <Search />
//       {
//         branchesData.length ? (
//           <BranchOfficeGrid branches={branchesData} />
//         ) : (
//           <div className=" p-28 text-center text-white/70 ">
//             No hay sucursales que mostrar.
//           </div>
//         )
//       }
//     </div>
//   );
// }
