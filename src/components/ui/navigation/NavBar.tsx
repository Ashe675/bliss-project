'use client';

// Definimos las constantes de los paths
const CHAT_PATH = "M7.27625 6.13742C12.15 2.68117 19.1112 2.96367 23.6175 6.80617C28.2012 10.7174 28.8275 17.1037 25.0575 21.6787C21.5062 25.9874 15.1012 27.4074 9.76875 25.1849L9.4775 25.0587L4.01 26.2224L3.96 26.2299L3.91625 26.2387H3.89375L3.86625 26.2449H3.81875L3.7775 26.2499L3.75125 26.2487L3.7225 26.2499L3.68125 26.2462H3.6375L3.61 26.2412L3.5825 26.2387L3.53875 26.2299L3.49625 26.2237L3.47625 26.2187L3.44625 26.2124L3.385 26.1924L3.355 26.1862L3.34125 26.1799L3.31375 26.1712L3.2575 26.1462L3.22 26.1312L3.20625 26.1237L3.18875 26.1162L3.15 26.0937L3.09375 26.0637L3.07375 26.0499L3.0275 26.0174L2.9775 25.9837L2.975 25.9787L2.95875 25.9674L2.905 25.9174L2.87375 25.8924L2.86625 25.8837L2.79625 25.8062L2.78 25.7887L2.76625 25.7712L2.7175 25.7012L2.7 25.6774L2.69375 25.6649L2.64125 25.5737L2.6325 25.5587L2.6275 25.5487L2.61875 25.5337L2.60125 25.4862L2.57625 25.4337L2.57125 25.4137L2.56625 25.4012L2.545 25.3249L2.53625 25.3024L2.53375 25.2837L2.5275 25.2599L2.52125 25.2187L2.51125 25.1662L2.50875 25.1274L2.505 25.1149V25.0949L2.5 25.0274L2.50125 24.9824L2.5025 24.9537L2.505 24.8874L2.51 24.8562V24.8324L2.52 24.7887L2.52625 24.7462L2.5325 24.7212L2.5375 24.6962L2.56 24.6212L2.56375 24.6049L4.00125 20.2924L3.97375 20.2462C1.21125 15.5624 2.4625 9.75742 6.99 6.34742L7.27625 6.13742Z";
const HOME_PATH = "M16.6179 3.11476L27.8679 14.3648C28.6554 15.1523 28.0979 16.4985 26.9841 16.4985H25.7341V23.9985C25.7341 24.9931 25.339 25.9469 24.6358 26.6502C23.9325 27.3534 22.9787 27.7485 21.9841 27.7485H20.7341V18.9985C20.7342 18.042 20.3687 17.1216 19.7125 16.4257C19.0563 15.7298 18.159 15.3109 17.2041 15.2548L16.9841 15.2485H14.4841C13.4896 15.2485 12.5357 15.6436 11.8325 16.3469C11.1292 17.0501 10.7341 18.004 10.7341 18.9985V27.7485H9.48412C8.48956 27.7485 7.53573 27.3534 6.83247 26.6502C6.12921 25.9469 5.73412 24.9931 5.73412 23.9985V16.4985H4.48412C3.37162 16.4985 2.81287 15.1523 3.60037 14.3648L14.8504 3.11476C15.0848 2.88042 15.4027 2.74878 15.7341 2.74878C16.0656 2.74878 16.3835 2.88042 16.6179 3.11476ZM16.9841 17.7485C17.3156 17.7485 17.6336 17.8802 17.868 18.1146C18.1024 18.349 18.2341 18.667 18.2341 18.9985V27.7485H13.2341V18.9985C13.2342 18.6923 13.3466 18.3968 13.55 18.168C13.7535 17.9393 14.0338 17.7931 14.3379 17.7573L14.4841 17.7485H16.9841Z";
const USER_PATH = "M15.1611 2.5C16.3973 2.5 17.6056 2.86656 18.6334 3.55332C19.6613 4.24007 20.4623 5.21619 20.9354 6.35823C21.4084 7.50027 21.5322 8.75693 21.291 9.96932C21.0499 11.1817 20.4546 12.2953 19.5806 13.1694C18.7065 14.0435 17.5928 14.6388 16.3804 14.8799C15.1681 15.1211 13.9114 14.9973 12.7694 14.5243C11.6273 14.0512 10.6512 13.2501 9.96445 12.2223C9.27769 11.1945 8.91113 9.98613 8.91113 8.75L8.91738 8.47875C8.98728 6.86969 9.67564 5.34972 10.8389 4.23582C12.0022 3.12193 13.5506 2.50009 15.1611 2.5Z M17.6611 17.5C19.3187 17.5 20.9084 18.1585 22.0806 19.3306C23.2527 20.5027 23.9111 22.0924 23.9111 23.75V25C23.9111 25.663 23.6477 26.2989 23.1789 26.7678C22.7101 27.2366 22.0742 27.5 21.4111 27.5H8.91113C8.24809 27.5 7.61221 27.2366 7.14337 26.7678C6.67452 26.2989 6.41113 25.663 6.41113 25V23.75C6.41113 22.0924 7.06956 20.5027 8.24173 19.3306C9.4139 18.1585 11.0036 17.5 12.6611 17.5H17.6611Z";
const USER_PATH2="M17.6611 17.5C19.3187 17.5 20.9084 18.1585 22.0806 19.3306C23.2527 20.5027 23.9111 22.0924 23.9111 23.75V25C23.9111 25.663 23.6477 26.2989 23.1789 26.7678C22.7101 27.2366 22.0742 27.5 21.4111 27.5H8.91113C8.24809 27.5 7.61221 27.2366 7.14337 26.7678C6.67452 26.2989 6.41113 25.663 6.41113 25V23.75C6.41113 22.0924 7.06961 20.5027 8.24172 19.3306C9.41382 18.1585 11.0035 17.5 12.6611 17.5H17.6611Z"


import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NavBar = () => {
    const pathname = usePathname(); 
  // Estado para rastrear el icono seleccionado
  const [selectedIcon, setSelectedIcon] = useState<string>('home'); // Cambia 'home' por el icono inicial

  // Función para manejar el clic en el icono
  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-center mb-10 z-[1000]">
      <div className="bg-[#4E1504] rounded-2xl w-[75vw] h-[7.3vh] flex justify-around items-center px-4">
        
        {/* Icono de Chat */}
        <div className="flex flex-col items-center">
          <a
            href="/client/chat"
            aria-label="Chat"
            className="text-white flex justify-center items-center"
            onClick={() => handleIconClick('chat')}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_51_725)">
                <path
                  d={CHAT_PATH}
                  fill="#9B9B9B"
                  fillOpacity={pathname === '/client/chat' ? 1 : 0.5} // Opacidad dinámica según selección
                />
              </g>
              <defs>
                <clipPath id="clip0_51_725">
                  <rect width="30" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          {/* Línea de selección */}
          {pathname === '/client/chat' && (
            <svg
              width="45"
              height="2"
              viewBox="0 0 44 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-2"
            >
              <rect width="44" height="2" fill="#E7E7E7" />
            </svg>
          )}
        </div>

        {/* Icono de Home */}
        <div className="flex flex-col items-center">
          <a
            href="/client/home"
            aria-label="Home"
            className="text-white flex justify-center items-center"
            onClick={() => handleIconClick('home')}
          >
            <svg
              width="31"
              height="31"
              viewBox="0 -3 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              
            >
              <path
                d={HOME_PATH}
                fill="#9B9B9B"
                fillOpacity={pathname === '/client/home' ? 1 : 0.1} // Opacidad dinámica según selección

              />
            </svg>
          </a>
          {/* Línea de selección */}
          {selectedIcon === 'home' && (
            <svg
              width="45"
              height="2"
              viewBox="0 0 44 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-2"
              opacity={pathname === '/client/home' ? 1 : 0}
            >
              <rect width="44" height="2" fill="#E7E7E7" />
            </svg>
          )}
        </div>

        {/* Icono de Usuario */}
        <div className="flex flex-col items-center">
          <a
            href="/client/profile"
            aria-label="Profile"
            className="text-white flex justify-center items-center"
            onClick={() => handleIconClick('user')}
          >
            <svg
              width="31"
              height="30"
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_51_721)">
                <path
                  d={USER_PATH}
                  fill="#FFFFFF"
                  fillOpacity={selectedIcon === '/client/profile' ? 1.5 : 0.5} // Opacidad dinámica según selección
                />
                <path
                  d={USER_PATH2}
                  fill="#FFFFFF"
                  fillOpacity={pathname === '/client/profile' ? 1 : 0.1}
                />
              </g>
              <defs>
                <clipPath id="clip0_51_721">
                  <rect width="30" height="30" fill="white" transform="translate(0.161133)" />
                </clipPath>
              </defs>
            </svg>
          </a>
          {/* Línea de selección */}
          {pathname === '/client/profile' && (
            <svg
              width="45"
              height="2"
              viewBox="0 0 44 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-2"
              opacity={pathname === '/client/profile' ? 1 : 0}
            >
              <rect width="44" height="2" fill="#E7E7E7" />
            </svg>
          )}
        </div>

      </div>
    </nav>
  );
};

export default NavBar;
