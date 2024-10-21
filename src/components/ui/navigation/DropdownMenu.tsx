// src/app/components/DropdownMenu.tsx
'use client';

import React, { useRef } from 'react';
import Logo from "@/components/client/logos/Logo";
import LogoutButton from "@/components/ui/buttons/LogoutButton";

const DropdownMenu = ({
  isOpen,
  toggleMenu,
  menuRef
}: {
  isOpen: boolean;
  toggleMenu: () => void;
  menuRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      ref={menuRef}
      className={` fixed top-0 right-0 w-3/4 h-full bg-[#200D01] bg-opacity-100 text-white p-4 flex flex-col justify-between transition-transform duration-400 ease-in-out ${
        isOpen ? 'translate-x-0 opacity-[96%] z-[3000]' : 'translate-x-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute top-0 left-0 p-4 flex items-center space-x-2">
        <Logo src="/ui/imagotype-white-sm.png" alt="App Logo" width={100} height={100} />
        {/*<Logo src="/logo.png" alt="App Logo" width={90} height={90} />*/}
      </div>

      <nav className="mt-16">
        <ul className="space-y-4">
          <li><a href="#" className="text-lg"></a></li>
          <li><a href="#" className="text-lg"></a></li>
          <li><a href="#" className="text-lg"></a></li>
        </ul>
      </nav>

      <div className="mb-4">
        <LogoutButton />
      </div>
    </div>

  );
};

export default DropdownMenu;
