"use client";

import React, { useEffect, useState } from "react";
import { searchBranches } from "@/actions";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../../../swiper.css";
import { Navigation } from "swiper/modules";

import { BranchOfficeGridItem } from "@/components";
import { BranchOfficeGridData } from "@/interfaces/branch.interface";

export const SeeMore: React.FC = () => {
  const [branchesData, setBranchesData] = useState<BranchOfficeGridData[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
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
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-4 shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">Ver más Sucursales</h2>
      {loading ? (
        <div className="animate-pulse bg-gradient-to-r from-primary to-red-950 h-10 w-full rounded-lg"></div>
      ) : branchesData.length > 0 ? (
        <Swiper
          modules={[Navigation]}
          loop={true}
          spaceBetween={10}
          slidesPerView={2}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {branchesData.map((branch) => (
            <SwiperSlide key={branch.name}>
              <BranchOfficeGridItem branch={branch} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="p-28 text-center text-white/70">
          No hay sucursales que mostrar.
        </div>
      )}
    </div>
  );
};
