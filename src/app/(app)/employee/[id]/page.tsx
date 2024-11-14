import { getAppointmentsByUser } from "@/actions";
import { getEmployeeById } from "@/actions";
import { auth } from "@/auth.config";
import { AppointmentSection, Navbar } from "@/components";
import { AdminToEmployeeActions } from "@/components/employee/employeePage/AdminToEmployeeActions";
import { BackButton } from "@/components/employee/employeePage/BackButton";
import { ClientToEmployeeActions } from "@/components/employee/employeePage/ClientToEmployeeActions";
import Comments from "@/components/employee/employeePage/Comments";
import Posts from "@/components/employee/employeePage/Posts";
import { SelfEmployeeActions } from "@/components/employee/employeePage/SelfEmployeeActions";
import EmployeeRating from "@/components/employee/EmployeeRating";
import Avatar from "@/components/profile/Avatar";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EmployeeProfileProps {
  params: {
    id: string;
  };
}

const EmployeeProfile = async ({ params }: EmployeeProfileProps) => {
  const { id } = params;
  const session = await auth();
  const { data } = await getEmployeeById(id);
  const isTheSameEmployee = id === session?.user.id;
  const isAdminEmployeeBranch =
    data?.user?.branchOffice?.userOwnerId === session?.user.id;

  if (
    (session?.user.role === "employee" && !isTheSameEmployee) ||
    (session?.user.role === "admin" && !isAdminEmployeeBranch)
  ) {
    notFound();
  }

  if (!data?.user?.id) notFound();
  if (!data?.user.branchOffice?.userOwnerId) notFound();

  const res = await getAppointmentsByUser(new Date());

  const canReview = !data?.reviews?.some(
    (review) => review.reviewerId === session?.user.id
  );

  return (
    <>
      <main className="m-6 mx-3 lg:m-10  2xl:grid 2xl:grid-flow-col ">
        <div className="grid-cols-9">
          <section id="info-employee" className=" items-center mb-6">
            {!isTheSameEmployee && (
              <BackButton
                firstName={data?.user?.firstName}
                lastName={data?.user?.lastName}
              />
            )}

            {isTheSameEmployee ? (
              <>
                <h1 className="lg:text-5xl text-2xl sm:text-3xl font-semibold truncate text-white mx-auto text-center mb-5">
                  {data?.user?.firstName} {data?.user?.lastName}
                </h1>
                <Avatar
                  src={data?.user?.profileImage}
                  alt={data?.user?.firstName || "User Profile"}
                  className=" mx-auto size-36  md:size-60"
                />
              </>
            ) : (
              <div className=" relative mx-auto size-36   md:size-60 rounded-full border-2 border-white/90 hover:scale-105 transition-transform duration-300 ">
                <Image
                  className="mx-auto  size-36  md:size-60 object-cover rounded-full"
                  fill
                  src={
                    data?.user?.profileImage || "/user/user-placeholder.webp"
                  }
                  alt={data?.user?.firstName || "User Profile"}
                />
              </div>
            )}

            <div className="flex justify-center mt-4">
              <EmployeeRating rating={data?.user?.averageRating || 0} />
            </div>
            <div className="flex justify-center my-4">
              <span
                className={`w-48 h-10 border-none rounded-md flex items-center justify-center gap-2 text-sm font-semibold relative shadow-md ${
                  data?.user?.averageRating >= 4
                    ? "bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-[#796703]"
                    : data?.user?.averageRating >= 3
                    ? "bg-gradient-to-r from-[#c0c0c0] via-[#e0e0e0] to-[#b0b0b0] text-[#4a4a4a]"
                    : "bg-gradient-to-r from-red-950 via-orange-800/80 to-primary text-white"
                }`}
              >
                {data?.user?.branchOffice?.officeType === "barbershop"
                  ? "Barbero"
                  : "Estilista"}
              </span>
            </div>

            <div className="sm:flex sm:justify-center   transition-transform duration-300 hover:scale-105 hover:bg-right">
              {isTheSameEmployee ? (
                <div>
                  {" "}
                  <div className="bg-primary space-x-3 text-white items-center flex rounded-lg">
                    <div className="justify-self-center w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-lg border-2 border-primary">
                      <img
                        className="w-full h-full object-cover"
                        src={data?.user?.branchOffice?.images[0].url}
                        alt={data?.user?.branchOffice?.name}
                      />
                    </div>

                    <div className="w-auto md:w-80 truncate flex flex-col h-full justify-evenly">
                      <div className="flex text-base  sm:text-2xl space-x-1">
                        <p>
                          {data?.user?.branchOffice?.officeType == "barbershop"
                            ? "Barbería"
                            : "Salon"}{" "}
                        </p>
                        <p className="truncate">
                          &quot;{data?.user?.branchOffice?.name}&quot;
                        </p>
                      </div>
                      <p className="truncate text-sm sm:text-base">
                        {data?.user?.branchOffice?.address}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href={`/branch/${data?.user?.branchOffice?.name}`}>
                  {" "}
                  <div className="bg-primary space-x-3 text-white items-center flex rounded-lg">
                    <div className="justify-self-center w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-lg border-2 border-primary">
                      <img
                        className="w-full h-full object-cover"
                        src={data?.user?.branchOffice?.images[0].url}
                        alt={data?.user?.branchOffice?.name}
                      />
                    </div>

                    <div className="w-auto md:w-80 truncate flex flex-col h-full justify-evenly">
                      <div className="flex text-base  sm:text-2xl space-x-1">
                        <p>
                          {data?.user?.branchOffice?.officeType == "barbershop"
                            ? "Barbería"
                            : "Salon"}{" "}
                        </p>
                        <p className="truncate">
                          &quot;{data?.user?.branchOffice?.name}&quot;
                        </p>
                      </div>
                      <p className="truncate text-sm sm:text-base">
                        {data?.user?.branchOffice?.address}
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </section>

          {session?.user.id === data?.user.id ? (
            <SelfEmployeeActions employeeId={data?.user?.id} />
          ) : null}

          {session?.user.id === data.user.branchOffice.userOwnerId ? (
            <AdminToEmployeeActions employeeId={data?.user?.id} />
          ) : null}

          {session?.user.id &&
          session.user.role !== "admin" &&
          session.user.role !== "employee" ? (
            <ClientToEmployeeActions
              employeeId={data?.user?.id}
              canReview={canReview || false}
            />
          ) : null}

          <Posts posts={data?.posts || []} />

          <Comments
            totalRatings={data?.user?.totalRatings || 0}
            reviews={data?.reviews || []}
          />
        </div>

        {!!res.appointments && !isAdminEmployeeBranch && (
          <div className="hidden 2xl:flex justify-center grid-cols-3 mx-40  pb-40 mb-40">
            <div className="fixed  pb-40 mb-40 min-h-screen 2xl:border-l-4 2xl:ml-20 2xl:px-5  2xl:border-primary/50">
              <AppointmentSection initialAppointments={res.appointments} />
            </div>
          </div>
        )}
      </main>
      {isTheSameEmployee && <Navbar />}
    </>
  );
};

export default EmployeeProfile;
