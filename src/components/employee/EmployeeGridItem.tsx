import Image from "next/image";
import Link from "next/link";
import { EmployeeGridData } from "@/interfaces";
import EmployeeRating from "./EmployeeRating";

interface Props {
    employee: EmployeeGridData; 
  }

export const EmployeeGridItem = ({ employee }: Props) => {
  return (
    <Link
      href={`/employee/${employee.id}`}
      key={employee.id}
      className="relative flex flex-col rounded-md hover:scale-105 transition-all shadow-sm max-w-[290px]"
    >
      
      <div className="bg-black relative w-full h-[140px] sm:h-[200px] overflow-hidden rounded-t-md">
        <Image
          src={employee.profileImage ? employee.profileImage : "/user/user-placeholder.webp"}
          alt={employee.firstName}
          fill
          sizes="100%"
          style={{ objectFit: "cover" }}
        />
      </div>
      
      <div
        className={`bg-primary text-sm p-3  rounded-b-md flex flex-col flex-1`}
      >
        <h2 className="font-semibold text-base sm:text-lg pb-1 truncate">{employee.firstName} {employee.lastName}</h2>
        <div className="space-x-1 flex items-center">
          {employee.rating ? (
            <EmployeeRating rating={employee.rating || 0} />
          ) : (
            <span>Sin valoraciones</span>
          )}
        </div>
        <h2 className="pt-2 text-sm">{employee.branchOfficeName}</h2>
      </div>
    </Link>
  );
};
