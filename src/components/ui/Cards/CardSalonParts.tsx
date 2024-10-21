import React from 'react';

const STARSPATH ="M17.8207 23.0053C16.502 22.9345 14.7749 22.1105 12.5385 20.5522L12.4968 20.524L12.4582 20.5522C10.2218 22.1115 8.49574 22.9355 7.17491 23.0063L6.98949 23.0115C4.12804 23.0115 3.76345 20.2615 5.19991 15.4657L5.25616 15.2803L5.15199 15.2022C-1.15634 10.3709 -0.104257 7.02716 7.81241 6.80008L8.02283 6.79487L8.14262 6.45529C9.37595 2.98654 10.6697 1.15841 12.3374 1.04696L12.4999 1.04175C14.2437 1.04175 15.5801 2.87508 16.8562 6.45529L16.9749 6.79487L17.1874 6.80008C25.1041 7.02716 26.1562 10.3709 19.8468 15.2011L19.7405 15.2792L19.7978 15.4647C21.2041 20.1647 20.8812 22.899 18.177 23.0063L18.0072 23.0095L17.8207 23.0053Z";

// Sección de la imagen superior
export const ImageSection = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div
      className="absolute top-0 w-[185px] h-[110px] bg-no-repeat bg-center bg-contain rounded-t-lg"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${imageUrl})`,
        backgroundSize: 'cover',  // Asegura que la imagen cubra todo el contenedor
        backgroundPosition: 'center',
        borderRadius: '10px 10px 0 0',  // Esto redondea solo la parte superior
      }}
    />
  );
};

// Etiqueta en la parte superior
export const Label = ({ text }: { text: string }) => {
  return (
    <div className="absolute top-1 left-0 w-[80px] h-[18px] bg-[#472020] rounded-r-lg flex items-center justify-center z-20">
      <p className="text-xs font-semibold text-white leading-[18px]">{text}</p>
    </div>
  );
};

// Sección del texto con estrellas y dirección
export const TextSection = ({
  title,
  stars,
  address,
  additionalAddress,
}: {
  title: string;
  stars: number;
  address: string;
  additionalAddress: string;
}) => {
  return (
    <div className="absolute top-[110px] w-[185px] h-[120px] bg-[#472020] rounded-b-lg p-2 z-10">
      <p className="text-white font-bold text-sm">{title}</p>
      <Stars count={stars} />
      <p className="text-white text-[11px] font-normal mt-2">Direccion</p>
      <p className="text-white text-[11px] font-normal mt-2">{address}</p>
      <p className="text-white text-[11px] font-light">{additionalAddress}</p>
    </div>
  );
};

// Estrellas
export const Stars = ({ count }: { count: number }) => {
  return (
    <div className="flex mt-2 space-x-1">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_100_797)">
            <path
              d={STARSPATH}
              fill="#FEC120"
            />
          </g>
          <defs>
            <clipPath id="clip0_100_797">
              <rect width="25" height="25" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ))}
    </div>
  );
};
