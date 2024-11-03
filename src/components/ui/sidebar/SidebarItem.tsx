"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const SidebarItem = ({ href, icon, label, onClick }: Props) => {
  const pathName = usePathname();

  return (
    <Link
      onClick={() => onClick()}
      href={href}
      className={` w-full flex p-2.5 ${
        pathName === href
          ? " text-white bg-primary shadow-sm"
          : "text-white/80 hover:bg-white/5 hover:text-white"
      }  transition-all rounded`}
    >
      <span className="mr-2 text-center flex items-center">{icon}</span>
      <span className=" font-semibold flex items-center">{label}</span>
    </Link>
  );
};
