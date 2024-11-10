import { searchBranchByName } from "@/actions/branch/search-branch-by-name";
import { Address, Description, Employees, HeaderBranchOffice, Images, Rating, SeeMore } from "@/components";

interface BranchProps {
  params: {
    slug: string;
  };
}

const BranchPage = async ({ params }: BranchProps) => {
  const { slug } = params;

  const decodedName = typeof slug === "string" ? decodeURIComponent(slug) : "";
  const data = await searchBranchByName(decodedName);

  const transformedEmployees = data?.employees.map((employee) => ({
    branchOfficeId: "defaultBranchId", 
    description: null,
    email: employee.email,
    firstName: employee.firstName,
    id: employee.id,  
    isActive: true,
    lastName: employee.lastName,
    password: employee.password,
    phoneNumber: null,
    profileImage: null,
    role: employee.role,
    user: employee.user,
    verified: employee.verified,
  })) || [];

  console.log(data?.images);
  

  return (
     <main className="p-4 sm:p-8 lg:p-12">
      <HeaderBranchOffice officeType={data?.officeType} officeName={data?.name} />
      <Images officeImages={data?.images}/>
      <Rating rating={data?.rating ?? 0} />
      <Address address={data?.address}/>
      <Description description={data?.description}/>
      <Employees employees={transformedEmployees} />
      <SeeMore />
     </main>
  );
};

export default BranchPage;


