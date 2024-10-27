import { IconCarambola, IconCarambolaFilled } from "@tabler/icons-react";

type Props = {
    rating: number | null;
};

export const Rating: React.FC<Props> = ({ rating }) => {

    const starCount = rating ? Math.max(0, Math.min(5, rating)) : 0;

    return (
        <div className="p-4 shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-2">Valoración</h2>
            <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, index) => {
                    return index < starCount ? (
                        <IconCarambolaFilled key={index} size={16} className="text-yellow-400" />
                    ) : (
                        <IconCarambola key={index} size={16} className="text-yellow-400" />
                    );
                })}
            </div>
        </div>
    );
};
