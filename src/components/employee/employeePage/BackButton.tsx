'use client';

import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
    firstName: string | undefined;
    lastName: string | undefined;
  }

export const BackButton: React.FC<HeaderProps> = ({ firstName, lastName }) => {
  
    const router = useRouter();

    return (
    <div className=" relative mb-4 flex items-center justify-between ">
    <button onClick={router.back} className="left-0 ">
      <IconArrowLeft
        stroke={2}
        className="text-white size-12 lg:size-20 hover:text-red-800 transition"
      />
    </button>

    <h1 className="lg:text-5xl text-2xl sm:text-3xl font-semibold truncate text-white">
      {firstName} {lastName}
    </h1>
    <div className='size-12 lg:size-20'></div>
  </div>  )
}
