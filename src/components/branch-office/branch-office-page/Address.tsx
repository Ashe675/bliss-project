
interface AddressProps {
  address: string | undefined;
  isLoading: boolean;
}

export const Address: React.FC<AddressProps> = ({ address, isLoading }) => {
  return (
    <div className="p-4 shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">Dirección</h2>
      {isLoading ? (
        <div className="animate-pulse bg-gradient-to-r from-primary to-red-950 h-10 w-full rounded-lg"></div>
      ) : (
        <p className="text-white">{address}</p>
      )}
    </div>
  );
};
