"use client";
import { login, registerUser } from "@/actions";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoInformationOutline } from "react-icons/io5";

type registerData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const SignupForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<registerData>();

  const password = watch("password");

  const handleRegister = async (data: registerData) => {
    setError("");
    setIsLoading(true);
    const res = await registerUser(data);

    if (!res.ok || !res.user) {
      setError(res.message);
      setIsLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    await login(res.user.user.toLowerCase(), password);
    setIsLoading(false);
    window.location.replace("/");
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleRegister)}
      className=" space-y-6 w-full text-center h-full max-w-md mx-auto"
    >
      <div className=" flex flex-col gap-y-1">
        <label htmlFor="firstName" className=" text-xl  ">
          Nombres
        </label>
        <input
          type="text"
          className=" bg-tertiary font-light outline-none text-white/80 rounded-md p-1.5 px-2"
          placeholder="Ingrese sus nombres."
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
          Apellidos
        </label>
        <input
          type="text"
          className=" bg-tertiary font-light outline-none text-white/80 rounded-md p-1.5 px-2"
          placeholder="Ingrese su apellido."
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
        <label htmlFor="email" className=" text-xl  ">
          Correo Electrónico
        </label>
        <input
          type="email"
          className=" bg-tertiary font-light outline-none text-white/80 rounded-md p-1.5 px-2"
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
          className=" bg-tertiary font-light outline-none text-white/80 rounded-md p-1.5 px-2"
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
          className=" bg-tertiary font-light outline-none text-white/80 rounded-md p-1.5 px-2"
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
          Registrar Cuenta
        </button>
      </div>

      <Link
        href="/auth/login"
        className=" text-sm text-gray-400  hover:underline"
      >
        ¿Ya tienes una cuenta? Inicia sesión.
      </Link>
    </form>
  );
};
