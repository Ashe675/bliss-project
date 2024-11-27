// components/EmployeeInfo.tsx
'use client';
import Avatar from '@/components/profile/Avatar';
import EmployeeRating from '@/components/employee/EmployeeRating';
import { EmployeeInfoProps } from '@/interfaces';

const EmployeeInfo = ({ name, photoUrl, specialty, rating }: EmployeeInfoProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start p-4 rounded-lg">
      <div className="flex justify-center mb-4 md:mb-0 md:w-1/3">
      <Avatar 
        alt={name || 'Avatar'} // Alternativa para el atributo alt
        src={photoUrl && photoUrl.trim() !== '' ? photoUrl : '/ui/profile/default-avatar.jpg'}
        key={1}
        onImageChange={() => console.log('hola mundo')} 
      />
      </div>

      <div className="md:w-2/3 md:pl-8 text-center md:text-center">
        <h1 className="text-3xl font-bold text-white">{name}</h1>
        <div className="font-semibold bg-[#311502] w-1/3 mx-auto px-4 py-2 mt-2"> {/* Cambia aquí */}
          <p className="text-gray-300">{specialty}</p>
        </div>
        
        <div className="mt-4 flex justify-center md:justify-start">
          <EmployeeRating rating={rating} />
        </div>

        <button className="mt-6 btn-primary font-light py-2 px-4">
          Publicar Trabajo
        </button>
      </div>

    </div>
  );
};

export default EmployeeInfo;
