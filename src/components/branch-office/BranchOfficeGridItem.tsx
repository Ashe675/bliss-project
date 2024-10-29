import { BranchOfficeGridData } from "@/interfaces";
import Image from "next/image";
import { IconCarambola, IconCarambolaFilled } from "@tabler/icons-react";
import Link from "next/link";

interface Props {
  branch: BranchOfficeGridData;
}

export const BranchOfficeGridItem = ({ branch }: Props) => {
  return (
    <Link
      href={`/branch/${branch.name.replace(/ /g, "_").toLowerCase().trim()}`}
      key={branch.name}
      className="relative flex flex-col rounded-md hover:scale-105 transition-all shadow-sm"
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
      
      <div className="relative w-full h-[200px] overflow-hidden rounded-t-md">
        <Image
          src={branch.images[0]?.url ? branch.images[0].url : "/ui/imagotype-white.png"}
          alt={branch.name}
          fill
          sizes="100%"
          style={{ objectFit: "cover" }}
        />
      </div>
      
      <div
        className={`text-sm p-3 rounded-b-md flex flex-col flex-1 ${
          branch.officeType === "barbershop" ? "bg-secondary" : "bg-[#472020]"
        }`}
      >
        <h2 className="font-semibold text-base sm:text-lg pb-1 truncate">{branch.name}</h2>
        <div className="space-x-1 flex items-center">
          {branch.rating ? (
            <>
              {Array.from({ length: branch.rating }).map((_, index) => (
                <IconCarambolaFilled
                  key={index}
                  size={14}
                  className="text-yellow-400"
                />
              ))}
              {Array.from({ length: 5 - branch.rating }).map((_, index) => (
                <IconCarambola
                  key={index}
                  size={14}
                  className="text-yellow-400"
                />
              ))}
            </>
          ) : (
            <span>Sin valoraciones</span>
          )}
        </div>
        <h2 className="pt-2 text-sm">Dirección:</h2>
        <p className="font-light text-xs">{branch.address}</p>
      </div>
    </Link>
  );
};
