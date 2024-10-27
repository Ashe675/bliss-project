import { IconCarambola, IconCarambolaFilled } from "@tabler/icons-react";

type Props = {
    rating: number | null; // Aceptar null para evitar errores si no hay calificación.
};

export const Rating: React.FC<Props> = ({ rating }) => {

    const starCount = rating ? Math.max(0, Math.min(5, rating)) : 0;

    return (
        <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, index) => {
                // Comprobar si el índice es menor que el número de estrellas llenas
                return index < starCount ? (
                    <IconCarambolaFilled key={index} size={16} className="text-yellow-400" />
                ) : (
                    <IconCarambola key={index} size={16} className="text-yellow-400" />
                );
            })}
        </div>
    );
};
