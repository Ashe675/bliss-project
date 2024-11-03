import { IconArrowLeft } from '@tabler/icons-react';

interface HeaderProps {
  officeType: string | undefined;
  officeName: string | undefined;
  isLoading: boolean;
  onBack: () => void;
}

export const HeaderBranchOffice: React.FC<HeaderProps> = ({ officeType, officeName, isLoading, onBack }) => {
  return (
    <section className="flex items-center gap-3 mb-6">
      <button
        onClick={onBack}
        className="p-2 rounded-full"
      >
        <IconArrowLeft
          stroke={2}
          className="text-white sm:size-10 lg:size-20 hover:text-red-800 transition"
        />
      </button>
      <p className="lg:text-5xl sm:text-3xl text-lg font-semibold text-white">
        {officeType
          ? officeType.charAt(0).toUpperCase() + officeType.slice(1).toLowerCase()
          : ""}
      </p>
      <p className="text-lg sm:text-3xl lg:text-5xl font-semibold text-white">
        {isLoading ? "Cargando" : `"${officeName}"`}
      </p>
    </section>
  );
};
