import { RegisterEmployeeForm } from "@/components/admin/RegisterEmployeeForm";

export const metadata = {
  title: "Crear Empleado",
  description: "Registrar un nuevo empleado en la plataforma.",
};

export default function RegisterPage() {
  return (
    <div className="sm:min-h-screen bg-primaryBrown w-full flex flex-col justify-center">
      <div className="  w-full max-w-xl mx-auto p-3 max-sm:px-5 h-full">
          <div className=" text-white pb-3">
            <RegisterEmployeeForm isCreating={true}/>
          </div>
      </div>
    </div>
  );
}



