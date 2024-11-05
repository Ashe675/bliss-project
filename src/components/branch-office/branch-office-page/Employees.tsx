'use client';
import { EmployeeData } from "@/interfaces";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "../../../../swiper.css";
import { Navigation } from "swiper/modules";

type Props = {
  employees: EmployeeData[];
  isLoading: boolean; 
};

export const Employees: React.FC<Props> = ({ employees, isLoading }) => {
  return (
    <div className="p-4 shadow-md">
      <h2 className="text-2xl font-semibold mb-2">Empleados</h2>
      {isLoading ? (
        <div className="animate-pulse bg-gradient-to-r from-primary to-red-950 h-64 w-full rounded-lg"></div>
      ) : (
        employees.length > 0 ? (
          <Swiper
            navigation={true}
            modules={[Navigation]}
            slidesPerView={2}
            spaceBetween={10}
            className="rounded-lg shadow-md"
            breakpoints={{
              "@0.00": {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
          >
            {employees.map((employee) => (
              <SwiperSlide
                key={employee.id}
                className="bg-primary shadow-md rounded-lg flex flex-col items-center text-center"
              >
                {employee.profileImage ? (
                  <img
                    src={employee.profileImage}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="w-24 h-24 rounded-md object-cover mb-4"
                  />
                ) : (
                  <img
                    src={"/landing/Salon.jpg"}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="w-full h-full rounded-md object-cover mb-4"
                  />
                )}
                <h2 className="text-lg font-semibold">
                  {employee.firstName} {employee.lastName}
                </h2>
                <p
                  className={`text-sm font-medium mb-6 ${
                    employee.isActive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {employee.isActive ? "Activo" : "Inactivo"}
                </p>
                {employee.phoneNumber && (
                  <p className="text-gray-500 text-sm mt-2">
                    Teléfono: {employee.phoneNumber}
                  </p>
                )}
                {employee.description && (
                  <p className="text-gray-600 text-sm mt-2">
                    {employee.description}
                  </p>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No hay empleados</p>
        )
      )}
    </div>
  );
};
