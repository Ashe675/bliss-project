import { IconMenu2 } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export const TopMenu = () => {
  return (
    <div className=" flex items-center justify-between py-1 px-2 bg-[#160900] fixed top-0 left-0 z-10 w-full">
      <Link href={"/"}>
        <Image src={"/ui/letters.svg"} width={70} height={70} alt="logo" />
      </Link>
      <IconMenu2 stroke={2} size={30} />
    </div>
  );
};
