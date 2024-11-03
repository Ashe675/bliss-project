import React from "react";
import { Container } from "./Container"; 
import Image from "next/image";
import Link from "next/link";

export const plans = [
  {
    id: 1,
    title: "Plan principiante",
    subtitle: "Para emprendedores",
    description:
      "Simplifica tareas administrativas para que puedas centrarte en ofrecer un excelente servicio.",
    features: [
      "Hasta 1 sucursal",
      "Gestión de citas",
      "Gestión de clientes",
      "Gestión de personal (5 empleados)",
    ],
    imageUrl: "/landing/BeautySalon.png",
    price: "10",
  },
  {
    id: 2,
    title: "Plan avanzado",
    subtitle: "Plan grandes cadenas",
    description:
      "Gestiona más sucursales y empleados permitiendo tener un mayor alcance, “Bliss” crece contigo.",
    features: [
      "Hasta 5 sucursales",
      "Gestión de citas",
      "Gestión de clientes",
      "Gestión de personal (30 empleados)",
    ],
    imageUrl: "/landing/salon.jpg",
    price: "40",
  },
];

export const Plans: React.FC = () => {
  return (
    <div id="plans" className="w-full">
      <Container>
        <div className="md:w-2/3 lg:w-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-red-800"
          >
            <path
              fillRule="evenodd"
              d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
              clipRule="evenodd"
            />
          </svg>

          <h2 className="text-center md:text-left my-8 text-2xl font-bold text-white md:text-4xl">
            Planes de suscripción
          </h2>
        </div>

        <div className="grid gap-8  md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-none border-orange-950/20 shadow-gray-600/10"
            >
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={plan.imageUrl}
                  alt="art cover"
                  loading="lazy"
                  width="1000"
                  height="667"
                  className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 relative">
                <div className="flex justify-between">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {plan.title}
                  </h3>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    ${plan.price}
                  </h3>
                </div>
                <h3 className="text-1xl font-semibold text-gray-700">
                  {plan.subtitle}
                </h3>
                <p className="mt-6 mb-8 text-gray-900">{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center space-x-2 before:content-['•'] before:mr-2 before:text-gray-800"
                    >
                      <span className="text-gray-800">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <Link href="/auth/login">
                  <button className="relative flex h-11 w-60 items-center justify-center px-6 before:absolute before:inset-0 before:rounded-md before:border before:border-transparent bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 before:border-black before:bg-black sm:w-max">
                    <span className="relative text-base font-semibold text-white">
                      Adquirir
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-center mt-16 text-2xl font-bold text-white md:text-4xl">
          ¡Elige el plan perfecto para tu negocio y transforma tu gestión hoy
          mismo!
        </h2>
      </Container>
    </div>
  );
};
