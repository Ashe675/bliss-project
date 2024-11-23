"use client";

import { postEmployee } from "@/actions/admin/post-employee";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoInformationOutline } from "react-icons/io5";
import { getBranchesByAdmin } from "@/actions/admin/get-branches-by-id";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { putEmployee } from "@/actions/admin/put-employee";
// import { FaCameraRetro } from "react-icons/fa";
// import ImageWidget from "../ui/image-widget/ImageWidget";
// import Avatar from "../profile/Avatar";

interface Branch {
  id: string;
  name: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  phoneNumber?: string | null;
  branchOfficeId?: string;
}

interface UpdateData {
  id?: string;
  firstName?: string;
  lastName?: string;
  user?: string;
  email?: string;
  password?: string;
  profileImage?: string | null;
  phoneNumber?: string | null;
  branchOfficeId?: string | null;
  role?: string;
}

interface Props{
  isCreating: boolean;
  employeeInfo?: UpdateData;
}

export const RegisterEmployeeForm = ({isCreating, employeeInfo}:Props) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBranch, setIsLoadingBranch] = useState(true);
  const [branches, setBranches] = useState<Branch[]>([]);
  const router = useRouter();
  // const [profileImage, setProfileImage] = useState<string | null>(null); // URL de la imagen
  // const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  // const [selectedBranch, setSelectedBranch] = useState('');

  console.log(employeeInfo);
  

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<RegisterData>();

  const password = watch("password");


  useEffect(() => {
    // Llamar a la función para obtener las sucursales
    getBranchesByAdmin()
      .then((data) => {
        setBranches(data);
        setIsLoadingBranch(false);
      })
      .catch((error) => {
        console.error("Error al obtener sucursales:", error);
        setBranches([]);
      });
  }, []);


  // const handleSubmitImage = async (files: File[]) => {
  //   try {
  //     // Simulación de carga de imágenes y obtención de la URL
  //     console.log("Subiendo imágenes:", files);
  //     const uploadedImageUrl = "https://example.com/image.jpg"; // Reemplaza por la URL obtenida
  //     setProfileImage(uploadedImageUrl);
  //     return true; // Retorna true si la carga fue exitosa
  //   } catch (error) {
  //     console.error("Error al subir las imágenes:", error);
  //     return false; // Retorna false si hubo un error
  //   }
  // };

  const handleUpdate = async (data: RegisterData) => {
    setIsLoading(true);

    const employeeData = {
      id: employeeInfo?.id || "",
      ...data,
      profileImage: "/user/user-placeholder.webp", 
      role: "employee",
    };

    console.log("Datos del empleado:", employeeData);

    await toast.promise(
      putEmployee(employeeData),
      {
        pending: "Actualizando...",
        success: "¡Empleado actualizado exitosamente!",
        error: "Error al enviar la información. Inténtalo nuevamente.",
      }
    )
      .then(() => {
        setIsLoading(false);
        router.refresh();
      })
      .catch((error) => {
        console.error(error); 
      });
  };

  const handleRegister = async (data: RegisterData) => {
    setError("");
    setIsLoading(true);

    const employeeData = {
      ...data,
      profileImage: "/user/user-placeholder.webp", 
      role: "employee",
    };

    console.log("Datos del empleado:", employeeData);
    

    // const res = await postEmployee(employeeData);

    // if (!res.ok || !res.user) {
    //   setError(res.message);
    //   setIsLoading(false);
    //   setTimeout(() => setError(""), 3000);
    //   return;
    // }

   


    await toast.promise(
      postEmployee(employeeData),
      {
        pending: "Creando...",
        success: "¡Empleado creado exitosamente!",
        error: "Error al enviar la información. Inténtalo nuevamente.",
      }
    )
      .then(() => {
        setIsLoading(false);
        window.location.replace("/admin/employees"); 
      })
      .catch((error) => {
        console.error(error); 
      });
  };

  return (
    <form
      noValidate
      onSubmit={isCreating ? handleSubmit( handleRegister ) : handleSubmit( handleUpdate )} 
      className=" space-y-6 w-full text-center h-full max-w-md mx-auto"
    >
      <h1 className=" text-2xl sm:text-4xl font-bold mt-3 mb-4 text-center text-white">
        {isCreating ? "Registrar Empleado" : "Actualizar Empleado"}
      </h1>
{/* 
      <Avatar
        src={profileImage}
        alt={"User Profile"}
        className=" mx-auto size-36  md:size-60"
      /> */}


      <div className=" flex flex-col gap-y-1">
        <label htmlFor="firstName" className=" text-xl  ">
          Nombre
        </label>
        <input
          type="text"
          defaultValue={employeeInfo?.firstName}
          className=" bg-primary/50 font-light outline-none text-white/80 rounded-md p-1.5 px-2"
          placeholder="ej. Juan"
          {...register("firstName", {
            required: "El nombre es requerido.",
            pattern: {
              value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/,
              message: "Nombre inválido.",
            },
            maxLength: {
              value: 50,
              message: "Nombre demasiado largo",
            },
          })}
        />
        {errors.firstName && (
          <span className=" text-red-500 text-xs font-light">
            {errors.firstName.message}{" "}
          </span>
        )}
      </div>
      <div className=" flex flex-col gap-y-1">
        <label htmlFor="lastName" className=" text-xl  ">
          Apellido
        </label>
        <input
          type="text"
          defaultValue={employeeInfo?.lastName}
          className=" bg-primary/50 font-light outline-none text-white/80 rounded-md p-1.5 px-2"
          placeholder="ej. Pérez"
          {...register("lastName", {
            required: "El apellido es requerido.",
            pattern: {
              value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/,
              message: "Appellido inválido.",
            },
            maxLength: {
              value: 50,
              message: "Apellido demasiado largo",
            },
          })}
        />
        {errors.lastName && (
          <span className=" text-red-500 text-xs font-light">
            {errors.lastName.message}{" "}
          </span>
        )}
      </div>

      <div className=" flex flex-col gap-y-1">
        <label htmlFor="userName" className=" text-xl  ">
          Nombre de usuario
        </label>
        <input
          type="text"
          defaultValue={employeeInfo?.user}
          className=" bg-primary/50 font-light outline-none text-white/80 rounded-md p-1.5 px-2"
          placeholder="ej. juan_perez"
          {...register("userName", {
            required: "El nombre de usuario es requerido.",
            pattern: {
              value: /^[a-z_]+$/,  
              message: "Nombre de usuario inválido. Solo se permiten letras minúsculas y guiones bajos.",
            },
            maxLength: {
              value: 50,
              message: "Nombre de usuario demasiado largo",
            },
          })}
        />
        {errors.userName && (
          <span className=" text-red-500 text-xs font-light">
            {errors.userName.message}{" "}
          </span>
        )}
      </div>
      <div className=" flex flex-col gap-y-1">
        <label htmlFor="email" className=" text-xl  ">
          Correo Electrónico
        </label>
        <input
          type="email"
          defaultValue={employeeInfo?.email}
          className=" bg-primary/50 font-light outline-none text-white/80 rounded-md p-1.5 px-2"
          placeholder="Ingrese su correo electrónico."
          {...register("email", {
            required: "El correo es requerido.",
            pattern: {
              value:
                /^(?![_.-])([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
              message: "Correo inválido.",
            },
            maxLength: {
              value: 80,
              message: "El email es muy largo.",
            }
          })}
        />
        {errors.email && (
          <span className=" text-red-500 text-xs font-light">
            {errors.email.message}{" "}
          </span>
        )}
      </div>
      <div className=" flex flex-col gap-y-1">
        <label htmlFor="password" className=" text-xl  ">
          Contraseña
        </label>
        <input
          type="password"
          defaultValue={employeeInfo?.password}
          className=" bg-primary/50 font-light outline-none text-white/80 rounded-md p-1.5 px-2"
          placeholder="Ingrese su contraseña."
          {...register("password", {
            required: "La contraseña es requerida.",
            minLength: {
              value: 6,
              message: "La contraseña debe tener más de 6 caracteres.",
            },
            maxLength: {
              value: 80,
              message: "La contraseña es muy larga.",
            }
          })}
        />
        {errors.password && (
          <span className=" text-red-500 text-xs font-light">
            {errors.password.message}{" "}
          </span>
        )}
      </div>
      <div className=" flex flex-col gap-y-1">
        <label htmlFor="passwordConfirmation" className=" text-xl  ">
          Confirmar Contraseña
        </label>
        <input
          type="password"
          defaultValue={employeeInfo?.password}
          className=" bg-primary/50 font-light outline-none text-white/80 rounded-md p-1.5 px-2"
          placeholder="Repita su contraseña."
          {...register("passwordConfirmation", {
            required: "La contraseña de confirmación es requerida.",
            validate: (value) =>
              value === password || "Las contraseñas deben coincidir",
          })}
        />
        {errors.passwordConfirmation && (
          <span className=" text-red-500 text-xs font-light">
            {errors.passwordConfirmation.message}{" "}
          </span>
        )}
      </div>










      <div className="flex flex-col gap-y-1">
        <label htmlFor="branchOfficeId" className="text-xl">
          Sucursal
        </label>
        <select
          id="branchOfficeId"
          value={employeeInfo?.branchOfficeId || ""}
          className="bg-primary/50 font-light outline-none text-white/80 rounded-md p-1.5 px-2"
          {...register("branchOfficeId", {
            required: "Seleccionar una sucursal es obligatorio.",
          })}
        >
          <option className="bg-primary border-primary text-white" value="">{isLoadingBranch ? 'Cargando' : 'Seleccione una sucursal'}</option>
          {branches.map((branch) => (
            <option className="bg-primary" key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
        {errors.branchOfficeId && (
          <span className="text-red-500 text-xs font-light">
            {errors.branchOfficeId.message}
          </span>
        )}
      </div>







      {/* <button
          onClick={() => setIsWidgetOpen(true)}
          className="flex flex-col w-1/2 justify-center items-center bottom-2 right-2 bg-primary text-white rounded-md p-4  hover:scale-105 transition-all duration-100 mx-auto hover:bg-red-950"
          aria-label="Subir Imagen"
        >
          Subir Imagen
          <FaCameraRetro className="mt-2" size={40}/>
      </button> */}

      {/* <ImageWidget
        isWidgetOpen={isWidgetOpen}
        closeWidget={() => setIsWidgetOpen(false)}
        handleSubmitImage={handleSubmitImage}
        maxFiles={5}
        maxSize={2} 
        isSquare={false}
      /> */}

      <div>
        {error && (
          <div className=" flex flex-row mb-2 justify-center">
            <IoInformationOutline className=" h-5 w-5 text-red-500" />
            <p className=" text-sm text-red-500 ">{error}</p>
          </div>
        )}
        <button
          disabled={isLoading}
          type="submit"
          className={` ${isLoading ? "btn-pending" : "btn-primary "} w-full`}
        >
          {isCreating ? "Registrar Cuenta" : "Actualizar Empleado"}
        </button>
      </div>

    </form>
  );
};
