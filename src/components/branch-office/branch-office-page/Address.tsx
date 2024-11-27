
interface AddressProps {
  address: string | undefined;
}

export const Address: React.FC<AddressProps> = ({ address }) => {
  return (
    <div className="p-4 shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">Dirección</h2>
        <p className="text-white">{address}</p>
    </div>
  );
};
