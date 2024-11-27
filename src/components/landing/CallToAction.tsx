import React from "react";
import { Container } from "./Container"; 
import Image from "next/image";
import Link from "next/link";

export const CallToAction: React.FC = () => {
  return (
    <div className="z-0 relative py-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 "></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300"></div>
      </div>
      <Container>
        <div className="relative">
          <div className="flex items-center justify-center -space-x-2">
          <Image
              loading="lazy"
              width="400"
              height="400"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="member photo"
              className="h-8 w-8 rounded-full object-cover"
            />
            <Image
              loading="lazy"
              width="200"
              height="200"
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="member photo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <Image
              loading="lazy"
              width="200"
              height="200"
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="member photo"
              className="z-10 h-16 w-16 rounded-full object-cover"
            />
            <Image
              loading="lazy"
              width="200"
              height="200"
              src="https://randomuser.me/api/portraits/women/23.jpg"
              alt="member photo"
              className="relative h-12 w-12 rounded-full object-cover"
            />
            <Image
              loading="lazy"
              width="200"
              height="200"
              src="https://randomuser.me/api/portraits/men/51.jpg"
              alt="member photo"
              className="h-8 w-8 rounded-full object-cover"
            />
          </div>
          <div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
            <h1 className="text-center text-4xl font-bold text-white md:text-5xl">
              Comienza ahora
            </h1>
            <p className="text-center text-xl text-gray-300">
              Se parte de millones de personas alrededor del mundo utilizando
              bliss en sus negocios.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/home"
                className=" before:border-red-700 before:bg-red-800 relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-base font-semibold text-white">
                  Ir a la aplicación
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
