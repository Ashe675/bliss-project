import { IconHomeFilled, IconUserFilled } from "@tabler/icons-react";
import { FaCalendarAlt } from "react-icons/fa";
import { NavbarItem } from "./NavbarItem";

const navbarItems = [
  {
    href: "/appoinments",
    icon: <FaCalendarAlt size={20} />,
  },
  {
    href: "/",
    icon: <IconHomeFilled  />,
  },
  {
    href: "/profile",
    icon: <IconUserFilled />,
  },
];

export const Navbar = () => {
  return (
    <div className=" bg-black w-full flex h-[70px] justify-center p-3 fixed bottom-0 z-10">
      <div className=" bg-primary w-full rounded-lg mx-4 sm:max-w-sm flex p-1 py-2 justify-evenly h-full">
        {navbarItems.map((item) => (
          <NavbarItem key={item.href} href={item.href} icon={item.icon} />
        ))}
      </div>
    </div>
  );
};
