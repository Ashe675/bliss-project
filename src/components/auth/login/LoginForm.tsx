"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

type loginData = {
  user: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginData>();

  const handleLogin = (data: loginData) => {
    console.log(data);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleLogin)}
      className=" space-y-6 w-full text-center h-full max-w-md mx-auto"
    >
      <div className=" flex flex-col gap-y-1">
        <label htmlFor="user" className=" text-xl  ">
          Usuario
        </label>
        <input
          type="text"
          className=" bg-tertiary font-light outline-none text-white/80 rounded-md p-1.5 px-2"
          placeholder="Ingrese su usuario o correo electrónico."
          {...register("user", {
            required: "El usuario es requerido.",
          })}
        />
        {errors.user && (
          <span className=" text-red-500 text-xs font-light">
            {errors.user.message}{" "}
          </span>
        )}
      </div>
      <div className=" flex flex-col gap-y-1 pb-4">
        <label htmlFor="password" className=" text-xl  ">
          Contraseña
        </label>
        <input
          type="password"
          className=" bg-tertiary font-light outline-none text-white/80 rounded-md p-1.5 px-2"
          placeholder="Ingrese su contraseña."
          {...register("password", {
            required: "La contraseña es requerida.",
          })}
        />
        {errors.password && (
          <span className=" text-red-500 text-xs font-light">
            {errors.password.message}{" "}
          </span>
        )}
        <Link
          href="/auth/forgot-password"
          className=" text-sm text-gray-400  hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <div>
        <button type="submit" className=" btn-primary w-full">
          Iniciar Sesión
        </button>
        <Link
          href="/auth/signup"
          className=" text-sm text-gray-400  hover:underline"
        >
          ¿Aún no tienes una cuenta? Resgístrate
        </Link>
        <Link
          href="/landing"
          className=" text-sm text-gray-400  hover:underline block m-0 mt-2"
        >
          ¿Que es Bliss? Ver más información
        </Link>
      </div>
    </form>
  );
}
