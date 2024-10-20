'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Container } from '../app/(Landing)/components/Container';

interface Link {
  to: string;
  label: string;
}

interface HeaderProps {
  links: Link[];
}

export const Header: React.FC<HeaderProps> = ({ links }) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleNavlinks = () => {
    setIsToggled(!isToggled);
  };

  return (
    <header>
      <nav className="absolute z-10 w-full border-b border-black/5 dark:border-white/5 lg:border-transparent">
        <Container>
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 md:gap-0 md:py-4">
            <div className="relative z-20 flex w-full justify-between md:px-0 lg:w-max">
              <Link href="/#home" className="flex items-center space-x-2">
                {/* Reemplaza el texto "Bliss" por la imagen */}
                <img
                  src="/marca/WhiteLetters.png" // Cambia la ruta según sea necesario
                  alt="Bliss Logo"
                  className="h-10" // Ajusta el tamaño de la imagen según sea necesario
                />
              </Link>

              <div className="relative flex max-h-10 items-center lg:hidden">
                <button aria-label="hamburger" onClick={toggleNavlinks} className="relative -mr-6 p-6">
                  <div className={`m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300 ${isToggled ? "rotate-45 translate-y-1.5" : ""}`}></div>
                  <div className={`m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300 ${isToggled ? "-rotate-45 -translate-y-1" : ""}`}></div>
                </button>
              </div>
            </div>

            <div className={`fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0  backdrop-blur-2xl transition duration-500 bg-orange-950/20 lg:hidden ${isToggled ? "scale-y-100" : "scale-y-0"}`}></div>

            <div className={`absolute top-full left-0 z-20 w-full origin-top-right translate-y-1 scale-90 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-bliss/60 p-8 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 dark:border-orange-950 bg-orange-950/80 dark:shadow-none lg:visible lg:relative lg:flex lg:w-7/12 lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none ${isToggled ? "!visible !scale-100 !opacity-100 !lg:translate-y-0" : ""}`}>
              <ul className="flex flex-col gap-6 tracking-wide lg:flex-row lg:gap-0 lg:text-sm">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link href={link.to} passHref className="hover:text-primary block transition dark:hover:text-white md:px-4">
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
                {/* <li>
                  <a href="https://tailus.gumroad.com/l/astls-premium" target="_blank" className="flex gap-2 font-semibold text-gray-700 transition hover:text-primary dark:text-white dark:hover:text-white md:px-4">
                    <span>Premium</span>
                    <span className="flex rounded-full bg-primary/20 px-1.5 py-0.5 text-xs tracking-wider text-purple-700 dark:bg-white/10 dark:text-orange-300"> new</span>
                  </a>
                </li> */}
              </ul>

              <div className="mt-12 lg:mt-0">
                <Link href="/register" className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
                  <span className="relative text-sm font-semibold text-white"> Get Started</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
};