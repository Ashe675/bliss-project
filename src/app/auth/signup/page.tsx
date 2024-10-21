import { Imagotype, SignupForm } from "@/components";
import Link from "next/link";

export const metadata = {
  title: "Resgistrarse",
  description: "Registrar nueva cuenta en Bliss",
};

export default function RegisterPage() {
  return (
    <div className=" text-white pb-3">
      <div>
        <Link href={"/"}>
          <Imagotype width={111} height={48} />
        </Link>
      </div>
      <h1 className=" text-2xl sm:text-4xl font-bold mt-3 mb-4 text-center">Resgitrarse</h1>
      <SignupForm/>
    </div>
  );
}
