"use client";
import { IconSearch } from "@tabler/icons-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm === "") return router.push(pathName);

    // Usar el valor directamente del input (newSearchTerm)
    const params = new URLSearchParams(searchParams);
    params.set("search", newSearchTerm);
    console.log(params.toString());

    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className=" bg-tertiary  flex w-full md:w-1/2 xl:w-1/3 mb-4 rounded relative items-center">
      <IconSearch
        stroke={2}
        size={20}
        className=" absolute left-1 text-slate-100"
      />
      <input
        type="text"
        onChange={handleSearch}
        value={searchTerm}
        className=" p-1 border-b border-transparent focus:border-white outline-none bg-tertiary rounded w-full pl-7 font-light text-slate-100"
        placeholder="Buscar"
      />
    </div>
  );
};
