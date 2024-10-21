import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  columns?: number;  // Número de columnas en pantallas grandes
  gap?: string;      // Tamaño del espacio entre los elementos
};

export const ResponsiveGrid = ({ children, columns = 4, gap = "4" }: Props) => {
  return (
    <div
      className={`
        grid 
        gap-${gap}
        grid-cols-2  // Mínimo de 2 columnas en pantallas pequeñas
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-${columns} 
        xl:grid-cols-${columns} 
        p-4
      `}
    >
      {children}
    </div>
  );
};
