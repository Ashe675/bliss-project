import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className=" w-full h-full min-h-screen flex justify-center items-center flex-col">
      <Image
        src={"/ui/notFound.webp"}
        height={320}
        width={320}
        alt="Error Image"
      />
      <p className=" text-lg sm:text-xl p-3 px-6">
        Página no encontrada,{" "}
        <Link href={"/home"} className=" underline hover:text-white/70">
          clic aquí para ir a inicio
        </Link>.
      </p>
    </div>
  );
}
