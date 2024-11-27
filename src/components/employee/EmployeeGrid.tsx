import { EmployeeGridItem } from "./EmployeeGridItem";
import { EmployeeGridData } from "@/interfaces";

interface Props {
  employees: EmployeeGridData[]; 
}

export const EmployeeGrid = ({ employees }: Props) => {
  return (
    <div className=" grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {employees.map((employee) => (
        <EmployeeGridItem key={employee.id} employee={employee} />
      ))}
    </div>
  );
};
