"use client";

import { login } from "@/actions/auth/login";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoInformationOutline } from "react-icons/io5";

type loginData = {
  user: string;
  password: string;
};

export default function LoginForm() {
  const [errorCredentials, setErrorCredentials] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginData>();

  const handleLogin = async (data: loginData) => {
    setIsLoading(true);
    setErrorCredentials("");
    const res = await login(data.user, data.password);
    setIsLoading(false);
    if (!res.ok && res.message === "Credenciales inválidas.") {
      setErrorCredentials(res.message);
      setTimeout(() => {
        setErrorCredentials("");
      }, 3000);
      return
    }

    window.location.replace("/home");
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
      <div className=" flex flex-col gap-y-1 pb-3">
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
        {errorCredentials && (
          <div className=" flex flex-row mb-2 justify-center">
            <IoInformationOutline className=" h-5 w-5 text-red-500" />
            <p className=" text-sm text-red-500 ">{errorCredentials}</p>
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={` ${isLoading ? "btn-pending" : "btn-primary "} w-full`}
        >
          Iniciar Sesión
        </button>

        <Link
          href="/auth/signup"
          className=" text-sm text-gray-400  hover:underline inline-block mt-2"
        >
          ¿Aún no tienes una cuenta? Resgístrate
        </Link>
        <Link
          href="/"
          className=" text-sm text-gray-400  hover:underline block m-0 mt-2"
        >
          ¿Que es Bliss? Ver más información
        </Link>
      </div>
    </form>
  );
}
