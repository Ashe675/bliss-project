'use client';

import React, { useEffect, useState } from "react";
import { searchBranches } from "@/actions";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../../../swiper.css";
import { Navigation } from "swiper/modules";
import { BranchOfficeGridItem } from "@/components";
import { BranchOfficeGridData } from "@/interfaces/branch.interface";

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
            <SwiperSlide key={branch.name}>
              <BranchOfficeGridItem branch={branch} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
