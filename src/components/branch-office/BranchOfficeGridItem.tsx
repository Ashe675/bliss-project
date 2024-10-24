import { BranchOffice } from "@/interfaces";
import Image from "next/image";
import { IconCarambola, IconCarambolaFilled } from "@tabler/icons-react";
import Link from "next/link";

interface Props {
  branch: BranchOffice;
}

export const BranchOfficeGridItem = ({ branch }: Props) => {
  const starsEmpty = 5 - branch.rating;

  return (
    <Link
      href={`/branch/${branch.name.replace(/ /g, "_").toLowerCase().trim()}`}
      key={branch.name}
      className=" relative  flex flex-col rounded-md hover:scale-105 transition-all shadow-sm"
    >
      {branch.officeType === "BARBERSHOP" ? (
        <span className=" bg-secondary text-xs px-2 p-1 top-1 left-0 absolute z-[5] rounded-r-md uppercase font-semibold">
          Barbería
        </span>
      ) : (
        <span className="bg-[#472020] text-xs px-2 p-1  top-1 left-0 absolute z-[5]  rounded-r-md uppercase font-semibold">
          Salón
        </span>
      )}
      <div className=" relative">
        <div className=" absolute bg-secondary opacity-15 h-full w-full"></div>
        <Image
          src={branch.imageUrl}
          width={300}
          height={250}
          alt={branch.name}
          className=" object-cover  rounded-t-md "
        />
      </div>
      <div
        className={` text-sm p-2 rounded-b-md  h-full ${
          branch.officeType === "BARBERSHOP" ? "bg-secondary" : "bg-[#472020]"
        }`}
      >
        <h2 className=" font-semibold  sm:text-lg pb-1">{branch.name}</h2>
        <div className=" space-x-2 flex w-full ">
          {Array.from({ length: branch.rating }).map((_, index) => (
            <IconCarambolaFilled
              key={index}
              size={12}
              className=" text-yellow-400"
            />
          ))}
          {Array.from({ length: starsEmpty }).map((_, index) => (
            <IconCarambola key={index} size={12} className=" text-yellow-400" />
          ))}
        </div>
        <h2 className=" pt-2">Dirección:</h2>
        <p className=" font-light "> {branch.address} </p>
      </div>
    </Link>
  );
};
