import { getAppointmentsByUser } from "@/actions";
import { getEmployeeById } from '@/actions'; 
import { auth } from "@/auth.config";
import { AppointmentSection } from '@/components';
import { AdminToEmployeeActions } from "@/components/employee/employeePage/AdminToEmployeeActions";
import { ClientToEmployeeActions } from "@/components/employee/employeePage/ClientToEmployeeActions";
import Comments from "@/components/employee/employeePage/Comments";
import Posts from "@/components/employee/employeePage/Posts";
import { SelfEmployeeActions } from "@/components/employee/employeePage/SelfEmployeeActions";
import EmployeeRating from "@/components/employee/EmployeeRating";
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { notFound } from "next/navigation";

interface EmployeeProfileProps {
  params: {
    id: string;
  };
}

// interface Review {
//   id: string;
//   raiting: number;
//   comment: string | null;
//   date: string | Date; 
//   reviewerId: string;
//   reviewer: {
//     firstName: string;
//     lastName: string;
//     profileImage: string | null;
//   };
// }

// interface Post {
//   id: string;
//   title: string;
//   createdAt: string | Date; 
//   images: Image[];
// }

// interface Image{
//   id: string;
//   url: string;
//   publicId: string;
//   imageType: string;
// }

const EmployeeProfile = async ({ params }: EmployeeProfileProps) => {
  const { id } = params; 
  const { data } = await getEmployeeById(id);
  if(!data?.user?.id) notFound();
  if(!data?.user.branchOffice?.userOwnerId) notFound();

  const session = await auth(); 
  
  const res = await getAppointmentsByUser(new Date());
  if(!res || !res.appointments) notFound()
    

  return (
    <main className='m-6 mx-3 lg:m-10  2xl:grid 2xl:grid-flow-col '>

      <div className="grid-cols-9">

      <section id='info-employee' className=" items-center mb-6">

        <div className=" relative mb-4 flex items-center justify-between ">
          <Link href="/" className="left-0 ">
            <IconArrowLeft
              stroke={2}
              className="text-white size-12 lg:size-20 hover:text-red-800 transition"
            />
          </Link>

          <h1 className="lg:text-5xl text-3xl font-semibold truncate text-white">
            {data?.user?.firstName} {data?.user?.lastName}
          </h1>
          <div className='size-12 lg:size-20'></div>
        </div>


        <div className="justify-self-center w-32 h-32 md:w-60 md:h-60 overflow-hidden rounded-full border-2 border-gray-300">
          <img
            className="w-full h-full object-cover"
            src={data?.user?.profileImage || "/user/user-placeholder.webp"}
            alt={data?.user?.firstName || "User Profile"}
          />
        </div>

        <div className="flex justify-center mt-4">
          <EmployeeRating rating={data?.user?.averageRating || 0} />
        </div>
        <div className="flex justify-center my-4">

          <span
            className={`w-48 h-10 border-none rounded-md flex items-center justify-center gap-2 text-sm font-semibold relative shadow-md ${
              data?.user?.averageRating >=4
                ? "bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-[#796703]" 
                : data?.user?.averageRating >= 3
                ? "bg-gradient-to-r from-[#c0c0c0] via-[#e0e0e0] to-[#b0b0b0] text-[#4a4a4a]"
                : "bg-gradient-to-r from-red-950 via-orange-800/80 to-primary text-white"
            }`}
          >
            {data?.user?.branchOffice?.officeType === "barbershop" ? "Barbero" : "Estilista"}
          </span>
        </div>

        <div className="sm:flex sm:justify-center    transition-transform duration-300 hover:scale-105 hover:bg-right">
        <Link href={`/branch/${data?.user?.branchOffice?.name}`}>          <div className="bg-primary space-x-3 text-white items-center flex rounded-lg">
            <div className="justify-self-center w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-lg border-2 border-primary">
              <img className="w-full h-full object-cover" src={data?.user?.branchOffice?.images[0].url} alt={data?.user?.branchOffice?.name} />
            </div>

            <div className="w-auto md:w-80 truncate flex flex-col h-full justify-evenly">
              <div className='flex text-2xl space-x-1'>
                <p>{data?.user?.branchOffice?.officeType == "barbershop" ? "Barbería":"Salon"} </p>
                <p className="truncate">&quot;{data?.user?.branchOffice?.name}&quot;</p>
              </div>
              <p className="truncate">{data?.user?.branchOffice?.address}</p>
            </div>
          </div>
          </Link>
        </div>

      </section>

      { session?.user.id === data?.user.id ? 
        <SelfEmployeeActions employeeId={data?.user?.id} /> : null 
      }

      { session?.user.id === data.user.branchOffice.userOwnerId ? 
        <AdminToEmployeeActions employeeId={data?.user?.id}  /> : null 
      }
      
      { session?.user.id && session.user.role !== "admin" && session.user.role !== "employee" ? 
        <ClientToEmployeeActions employeeId={data?.user?.id} /> : null 
      }

      <Posts posts={data?.posts || []} /> 

      <Comments
        totalRatings={data?.user?.totalRatings || 0}
        reviews={data?.reviews || []}
      />
    </div>

    <div className="hidden 2xl:flex justify-center grid-cols-3 mx-40  pb-40 mb-40">
      <div className="fixed  pb-40 mb-40 min-h-screen 2xl:border-l-4 2xl:ml-20 2xl:px-5  2xl:border-primary/50">
        <AppointmentSection initialAppointments={res.appointments} />
      </div>
    </div>

    </main>
  );
};

export default EmployeeProfile;
