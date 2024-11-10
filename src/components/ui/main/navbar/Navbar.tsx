import { IconHomeFilled, IconUserFilled } from "@tabler/icons-react";
import { FaCalendarAlt } from "react-icons/fa";
import { NavbarItem } from "./NavbarItem";

const navbarItems = [
  {
    href: "/appointments",
    icon: <FaCalendarAlt size={20} />,
    label: 'Citas'
  },
  {
    href: "/home",
    icon: <IconHomeFilled  />,
    label: 'Inicio'
  },
  {
    href: "/profile",
    icon: <IconUserFilled />,
    label: 'Perfil'
  },
];

export const Navbar = () => {
  return (
    <div className=" bg-black w-full flex h-[70px] justify-center p-3 fixed bottom-0 left-0 z-10 sm:hidden">
      <nav className=" bg-primary w-full rounded-lg mx-4 sm:max-w-sm flex p-1 py-2 justify-evenly h-full">
        {navbarItems.map((item) => (
          <NavbarItem key={item.href} href={item.href} icon={item.icon} />
        ))}
      </nav>
    </div>
  );
};
