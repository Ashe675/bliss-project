import { getAppointmentsByUser } from "@/actions";
import { AppointmentSection } from "@/components";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Citas",
  description: "Citas agendadas",
};

export default async function AppointmentPage() {
  const res = await getAppointmentsByUser(new Date());
  if (!res || !res.appointments) notFound();

  return (
    <div>
      <h1 className="  text-center text-2xl sm:text-3xl pt-2 ">Mis citas</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2">
        <AppointmentSection initialAppointments={res.appointments} />
      </div>
    </div>
  );
}
