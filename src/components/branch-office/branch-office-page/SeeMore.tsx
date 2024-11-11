"use client";

import React, { useEffect, useState } from "react";
import { searchBranches } from "@/actions";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../../../swiper.css";
import { Navigation } from "swiper/modules";
import { BranchOfficeGridData } from "@/interfaces/branch.interface";
import { IconCarambola, IconCarambolaFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const LoadingSkeleton = () => (
  <div className="flex justify-center items-center">
    <div className="w-16 h-16 border-4 border-t-transparent border-primary border-solid rounded-full animate-spin"></div>
  </div>
);

export const SeeMore: React.FC = () => {
  const [branchesData, setBranchesData] = useState<BranchOfficeGridData[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await searchBranches("");
        console.log("Branches data:", data);

        const mappedData: BranchOfficeGridData[] = data.map((branch) => ({
          name: branch.name,
          description: branch.description,
          address: branch.address,
          rating: branch.rating,
          longevityYear: branch.longevityYear,
          registerDate: new Date(branch.registerDate),
          slug: branch.slug,
          officeType: branch.officeType,
          images: branch.images.map((image) => ({
            imageType: image.imageType,
            publicId: image.publicId,
            url: image.url,
          })),
        }));

        setBranchesData(mappedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching branches:", error);
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, []);

  return (
    <div className="p-4 shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">Ver más Sucursales</h2>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <Swiper
          modules={[Navigation]}
          style={{ padding: "10px" }}
          loop={true}
          spaceBetween={50}
          slidesPerView={2}
          navigation
          breakpoints={{
            1: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            856: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {branchesData.map((branch) => (
            <SwiperSlide
              key={branch.name}
              className=" flex justify-center items-center"
            >
              <Link
                href={`/branch/${branch.name
                  .replace(/ /g, "_")
                  .toLowerCase()
                  .trim()}`}
                key={branch.name}
                className="relative flex flex-col rounded-md hover:scale-105 transition-all shadow-sm max-w-[290px]"
              >
                {branch.officeType === "barbershop" ? (
                  <span className="bg-secondary text-xs px-2 p-1 top-1 left-0 absolute z-[5] rounded-r-md uppercase font-semibold">
                    Barbería
                  </span>
                ) : (
                  <span className="bg-[#472020] text-xs px-2 p-1 top-1 left-0 absolute z-[5] rounded-r-md uppercase font-semibold">
                    Salón
                  </span>
                )}

                <div className="relative w-full h-[140px] sm:h-[200px] overflow-hidden rounded-t-md">
                  <Image
                    src={
                      branch.images[0]?.url
                        ? branch.images[0].url
                        : "/ui/imagotype-white.png"
                    }
                    alt={branch.name}
                    fill
                    sizes="100%"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div
                  className={`text-sm p-3  rounded-b-md flex flex-col flex-1 ${
                    branch.officeType === "barbershop"
                      ? "bg-secondary"
                      : "bg-[#472020]"
                  }`}
                >
                  <h2 className="font-semibold text-base sm:text-lg pb-1 truncate">
                    {branch.name}
                  </h2>
                  <div className="space-x-1 flex justify-center items-center">
                    {branch.rating ? (
                      <>
                        {Array.from({ length: branch.rating }).map(
                          (_, index) => (
                            <IconCarambolaFilled
                              key={index}
                              size={14}
                              className="text-yellow-400"
                            />
                          )
                        )}
                        {Array.from({ length: 5 - branch.rating }).map(
                          (_, index) => (
                            <IconCarambola
                              key={index}
                              size={14}
                              className="text-yellow-400"
                            />
                          )
                        )}
                      </>
                    ) : (
                      <span>Sin valoraciones</span>
                    )}
                  </div>
                  <h2 className="pt-2 text-sm">Dirección:</h2>
                  <p className="font-light text-xs">{branch.address}</p>
                </div>
              </Link>{" "}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
