import { Navbar } from "@/components";
import { IconUserShield } from "@tabler/icons-react";

export default function AdminPage() {
  return (
    <>
      <div className=" flex w-full h-full  my-28 justify-center items-center flex-col gap-y-2">
        <h1 className=" font-bold text-xl sm:text-2xl">BIENVENIDO ADMIN</h1>
        <IconUserShield size={200} stroke={2} />
      </div>
      <Navbar />
    </>
  );
}
