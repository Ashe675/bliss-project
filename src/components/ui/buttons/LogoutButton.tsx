// src/app/components/LogoutButton.tsx
'use client';
const LogoutButton = () => {
    return (
      <button className="w-full flex items-center justify-center bg-[#FF0E00] text-white py-3 px-4 rounded-md hover:bg-[#e00d00] transition-colors font-roboto font-bold z-[3000]">
        Cerrar Sesión
        <svg
          className="ml-4"
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_117_818)">
            <path
              d="M11.25 9V6.75C11.25 6.15326 11.4871 5.58097 11.909 5.15901C12.331 4.73705 12.9033 4.5 13.5 4.5H21.375C21.9717 4.5 22.544 4.73705 22.966 5.15901C23.3879 5.58097 23.625 6.15326 23.625 6.75V20.25C23.625 20.8467 23.3879 21.419 22.966 21.841C22.544 22.2629 21.9717 22.5 21.375 22.5H13.5C12.9033 22.5 12.331 22.2629 11.909 21.841C11.4871 21.419 11.25 20.8467 11.25 20.25V18"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.875 13.5H3.375L6.75 10.125"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.75 16.875L3.375 13.5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_117_818">
              <rect width="27" height="27" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    );
  };
  
  export default LogoutButton;
  