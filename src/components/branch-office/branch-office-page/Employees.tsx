'use client';
import { EmployeeData } from "@/interfaces";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../../../swiper.css";
import Link from "next/link";

const LoadingSkeleton = () => (
  <div className="flex justify-center items-center">
    <div className="w-16 h-16 border-4 border-t-transparent border-primary border-solid rounded-full animate-spin"></div>
  </div>
);

type Props = {
  employees: EmployeeData[];
};

export const Employees: React.FC<Props> = ({ employees }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  
  return (
    <section className="ml-4">
      <h2 className="text-2xl font-semibold mb-2">Empleados</h2>

      {isLoading ? (
        <LoadingSkeleton />
      ) : employees.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-primary border-red-950/50 via-red-600/50 to-primary rounded-lg shadow-md text-center">
          <h4 className="text-xl font-semibold text-white mb-4">
            ¡No hay empleados aún!
          </h4>
        </div>
      ) : (
        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            512: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {employees.map((employee) => (
            <SwiperSlide
              key={employee.id}
              className="bg-gradient-to-r flex flex-col items-start justify-start from-red-950 border-red-950 border via-orange-800/80 to-primary/80 rounded-lg"
            >
              <Link href={`/employee/${employee.id}`} passHref>
                <div className="relative w-full rounded-t-md h-48 overflow-hidden group">
                  <img
                    src={employee.profileImage || "/marca/WhiteLetters.png"}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
                  />
                </div>
                <div className="w-full ml-6 flex flex-col justify-start items-start p-4 rounded-md">
                  <h4 className="font-semibold text-lg mb-1 truncate">
                    {employee.firstName} {employee.lastName}
                  </h4>
                  <p className="text-sm text-gray-200">
                    {employee.isActive ? "Activo" : "Inactivo"}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};
