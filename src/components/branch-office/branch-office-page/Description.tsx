import React from 'react';

interface DescriptionProps {
  description: string | undefined;
  isLoading: boolean;
}

export const Description: React.FC<DescriptionProps> = ({ description, isLoading }) => {
  return (
    <div className="p-4 shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">Descripción</h2>
      {isLoading ? (
        <div className="animate-pulse bg-gradient-to-r from-primary to-red-950 h-10 w-full rounded-lg"></div>
      ) : (
        <p className="text-white">{description}</p>
      )}
    </div>
  );
};
