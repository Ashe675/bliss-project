import CardSalon from '@/components/ui/Cards/CardSalon';
import Buscador from '@/components/ui/navigation/Buscador';
import Filtro from '@/components/ui/navigation/Filtro';
import { ResponsiveGrid } from '@/components/ui/grids/ResponsiveGrid';

const cardData = [
    {
        name: "Barbería Estilo",
        stars: 4,
        address: "Colonia 'Loma Linda'",
        additionalAddress: "Frente a la pulpería Lisa.",
        label: "BARBERÍA",
        imageUrl: "https://www.peluker.com/blog/wp-content/uploads/2024/03/%C2%BFcuanto-cuesta-una-barberia.jpeg"
    },
    {
        name: "Barbería Estilo",
        stars: 4,
        address: "Colonia 'Loma Linda'",
        additionalAddress: "Frente a la pulpería Lisa.",
        label: "BARBERÍA",
        imageUrl: "https://www.peluker.com/blog/wp-content/uploads/2024/03/%C2%BFcuanto-cuesta-una-barberia.jpeg"
    },
    {
        name: "Barbería Estilo",
        stars: 4,
        address: "Colonia 'Loma Linda'",
        additionalAddress: "Frente a la pulpería Lisa.",
        label: "SALON",
        imageUrl: "https://www.peluker.com/blog/wp-content/uploads/2024/03/%C2%BFcuanto-cuesta-una-barberia.jpeg"
    },
    {
        name: "Barbería Estilo",
        stars: 4,
        address: "Colonia 'Loma Linda'",
        additionalAddress: "Frente a la pulpería Lisa.",
        label: "BARBERÍA",
        imageUrl: "https://www.peluker.com/blog/wp-content/uploads/2024/03/%C2%BFcuanto-cuesta-una-barberia.jpeg"
    },
    {
        name: "Barbería Estilo",
        stars: 4,
        address: "Colonia 'Loma Linda'",
        additionalAddress: "Frente a la pulpería Lisa.",
        label: "BARBERÍA",
        imageUrl: "https://www.peluker.com/blog/wp-content/uploads/2024/03/%C2%BFcuanto-cuesta-una-barberia.jpeg"
    },
    {
        name: "Barbería Estilo",
        stars: 4,
        address: "Colonia 'Loma Linda'",
        additionalAddress: "Frente a la pulpería Lisa.",
        label: "BARBERÍA",
        imageUrl: "https://www.peluker.com/blog/wp-content/uploads/2024/03/%C2%BFcuanto-cuesta-una-barberia.jpeg"
    },
    {
        name: "Barbería Estilo",
        stars: 4,
        address: "Colonia 'Loma Linda'",
        additionalAddress: "Frente a la pulpería Lisa.",
        label: "BARBERÍA",
        imageUrl: "https://www.peluker.com/blog/wp-content/uploads/2024/03/%C2%BFcuanto-cuesta-una-barberia.jpeg"
    },
    {
        name: "Barbería Estilo",
        stars: 4,
        address: "Colonia 'Loma Linda'",
        additionalAddress: "Frente a la pulpería Lisa.",
        label: "BARBERÍA",
        imageUrl: "https://www.peluker.com/blog/wp-content/uploads/2024/03/%C2%BFcuanto-cuesta-una-barberia.jpeg"
    },
    // Agrega más objetos aquí si es necesario
];

export default function Home() {
    return (
        <div className="">
            <div className="fixed top-16 left-2 z-20 flex flex-col">
                <Buscador 
                    placeholder="Buscar" 
                    width="w-[95vw]" 
                    height="h-10" 
                    backgroundColor="bg-[#30251E]" 
                    textColor="text-white" 
                    iconColor="stroke-gray-300" 
                    borderRadius="rounded-lg" 
                />
                <Filtro />
            </div>

            <div className="h-[70vh] w-full overflow-y-auto z-10 items-center relative top-44 p-4">
                <ResponsiveGrid columns={5} gap="6">
                    {cardData.map((card, index) => (
                        <CardSalon 
                            key={index} // Usa un ID único en producción
                            name={card.name}
                            stars={card.stars}
                            address={card.address}
                            additionalAddress={card.additionalAddress}
                            label={card.label}
                            imageUrl={card.imageUrl}
                        />
                    ))}
                </ResponsiveGrid>
            </div>
        </div>
    );
}
