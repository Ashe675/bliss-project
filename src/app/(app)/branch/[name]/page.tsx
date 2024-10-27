'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BranchOfficeData } from "@/interfaces/branch.interface";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../../../../swiper.css';
import { Navigation } from 'swiper/modules';
import { searchBranchByName } from '@/actions/branch/search-branch-by-name';
import { Rating } from '@/components/branch-office/branch-office-page/Rating';
import { IconArrowLeft } from '@tabler/icons-react'
import { Employees } from '@/components/branch-office/branch-office-page/Employees';

export default function BranchPage() {
  const { name } = useParams();
  const decodedName = typeof name === 'string' ? decodeURIComponent(name) : '';  // const [branchData, setBranchData] = useState<BranchOfficeData | null>(null);
  const [branchData, setBranchData] = useState<BranchOfficeData | null>(null);
  const router = useRouter(); 
  useEffect(() => {
    console.log("Decoded name:", decodedName);
  }, [decodedName]);

  
  useEffect(() => {
    const fetchBranchData = async () => {
      if (decodedName) {
        try {
          const data = await searchBranchByName(decodedName);
          if (data) {
            setBranchData(data);
            console.log("Branch data:", data);
          } else {
            console.warn("No branch office found with the specified name.");
          }
        } catch (error) {
          console.error("Error fetching branch data:", error);
        }
      }
    };

    fetchBranchData();
  }, [decodedName]);

return (
    <main className="p-4 sm:p-8 lg:p-12">
      <section className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-primary transition">
          <IconArrowLeft stroke={2} className="text-white lg:size-20" />
        </button>
          <p className="lg:text-5xl text-lg font-semibold text-white"> {branchData?.officeType ? 
            branchData.officeType.charAt(0).toLocaleUpperCase() + branchData.officeType.slice(1).toLocaleLowerCase() 
            : ''
          }</p>
          <p className="text-lg lg:text-5xl font-semibold text-white"> &quot;{branchData?.name}&quot;</p>
      </section>

      <div className='flex justify-center'>
      <div className="w-full lg:w-2/4 mb-8">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="rounded-lg shadow-md"
        >
          {branchData?.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image.url} alt={`Image ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
            </SwiperSlide>
          ))}
          {branchData?.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image.url} alt={`Image ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>


      <div className="p-4 shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-2">Valoración</h2>
        <Rating rating={branchData?.rating ?? 0} />
      </div>

      <div className="p-4 shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-2">Dirección</h2>
        <p className="text-white">{branchData?.address}</p>
      </div>

      <div className="p-4 shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-2">Descripción</h2>
        <p className="text-white">{branchData?.description}</p>
      </div>

      <div className="p-4 shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Empleados</h2>
        <Employees employees={branchData?.employees ?? []} />
      </div>
    </main>
  );
}