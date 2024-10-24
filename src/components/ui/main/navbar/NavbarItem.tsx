"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  icon: React.ReactNode;
}

export const NavbarItem = ({ href, icon }: Props) => {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={clsx(
        "  flex flex-col justify-evenly  items-center w-[24px] ",
        {
          "border-b-2 border-white pb-1 text-white ": href === pathName,
          "hover:text-white/80 text-white/50": href !== pathName,
        }
      )}
    >
      {icon}
    </Link>
  );
};
