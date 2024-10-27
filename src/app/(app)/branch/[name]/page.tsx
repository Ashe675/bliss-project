"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BranchOfficeData } from "@/interfaces/branch.interface";
import { searchBranchByName } from "@/actions/branch/search-branch-by-name";
import "swiper/css/navigation";
import { Rating, Employees, Header, Images, Address, Description, SeeMore} from "@/components/branch-office/branch-office-page";

export default function BranchPage() {
  const { name } = useParams();
  const decodedName = typeof name === "string" ? decodeURIComponent(name) : ""; // const [branchData, setBranchData] = useState<BranchOfficeData | null>(null);
  const [branchData, setBranchData] = useState<BranchOfficeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBranchData();
  }, [decodedName]);

  return (
    <main className="p-4 sm:p-8 lg:p-12">
      <Header officeType={branchData?.officeType} officeName={branchData?.name} isLoading={isLoading} onBack={() => router.back()} />
      <Images officeImages={branchData?.images} isLoading={isLoading} />
      <Rating rating={branchData?.rating ?? 0} />
      <Address address={branchData?.address} isLoading={isLoading} />
      <Description description={branchData?.description} isLoading={isLoading} />
      <Employees employees={branchData?.employees ?? []} isLoading={isLoading} /> 
      <SeeMore />
    </main>
  );
}
