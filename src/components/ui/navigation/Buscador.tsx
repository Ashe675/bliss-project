'use client';
import React from 'react';

interface BuscadorProps {
  placeholder?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  borderRadius?: string;
}

const Buscador: React.FC<BuscadorProps> = ({
  placeholder = 'Buscar',
  width = 'w-[382px]',
  height = 'h-[34px]',
  backgroundColor = 'bg-white/10',
  textColor = 'text-white/80',
  iconColor = 'stroke-white/90',
  borderRadius = 'rounded-md',
}) => {
  return (
    <div
      className={`relative flex items-center z-5 ${width} ${height} ${backgroundColor} ${borderRadius} px-5`}
    >
      {/* Icono de búsqueda */}
      <div className="w-[22px] h-[22px] flex items-center justify-center">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={iconColor}
        >
          <g clipPath="url(#clip0_307_401)">
            <path
              d="M2.68115 9.15356C2.68115 9.95791 2.84297 10.7544 3.15736 11.4975C3.47176 12.2406 3.93257 12.9158 4.5135 13.4846C5.09442 14.0534 5.78408 14.5045 6.5431 14.8123C7.30211 15.1201 8.11562 15.2786 8.93717 15.2786C9.75872 15.2786 10.5722 15.1201 11.3312 14.8123C12.0903 14.5045 12.7799 14.0534 13.3608 13.4846C13.9418 12.9158 14.4026 12.2406 14.717 11.4975C15.0314 10.7544 15.1932 9.95791 15.1932 9.15356C15.1932 8.34922 15.0314 7.55275 14.717 6.80963C14.4026 6.06651 13.9418 5.39129 13.3608 4.82254C12.7799 4.25378 12.0903 3.80261 11.3312 3.4948C10.5722 3.18699 9.75872 3.02856 8.93717 3.02856C8.11562 3.02856 7.30211 3.18699 6.5431 3.4948C5.78408 3.80261 5.09442 4.25378 4.5135 4.82254C3.93257 5.39129 3.47176 6.06651 3.15736 6.80963C2.84297 7.55275 2.68115 8.34922 2.68115 9.15356Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.7681 18.7786L13.4058 13.5286"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_307_401">
              <rect width="22" height="22" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      {/* Texto de placeholder */}
      <span className={`ml-[20px] text-[17px] leading-[22px] ${textColor}`}>
        {placeholder}
      </span>
    </div>
  );
};

export default Buscador;
