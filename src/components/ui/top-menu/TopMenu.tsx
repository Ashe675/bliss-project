import Image from "next/image";
import Link from "next/link";
import MenuHamburger from "./MenuHamburger";

export const TopMenu = () => {
  return (
    <div className=" flex items-center justify-between py-2 px-2 bg-[#160900] fixed top-0 left-0 z-10 w-full">
      <Link href={"/"}>
        <Image src={"/ui/letters.svg"} width={70} height={70} alt="logo" />
      </Link>
      <MenuHamburger/>
    </div>
  );
};
