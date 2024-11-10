
interface DescriptionProps {
  description: string | undefined;
}

export const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <div className="p-4 shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">Descripción</h2>
        <p className="text-white">{description}</p>
    </div>
  );
};
