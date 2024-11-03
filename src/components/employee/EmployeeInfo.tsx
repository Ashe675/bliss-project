// components/EmployeeInfo.tsx
'use client';
import Avatar from '@/components/profile/Avatar';
import EmployeeRating from '@/components/employee/EmployeeRating';

import { EmployeeInfoProps } from '@/interfaces';

const EmployeeInfo = ({ name, photoUrl, specialty, rating }: EmployeeInfoProps) => {
  return (
    <div className="flex flex-col items-center md:flex-row md:items-start">
      <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
        <Avatar 
          alt=''
          src={'/ui/profile/default-avatar.jpg'}
          key={1}
          onImageChange={()=>console.log('hola mundo')} 
        />
      </div>

      <div className="md:w-2/3 md:pl-8 text-center md:text-left">
        <h1 className="text-3xl font-bold text-white-800">{name}</h1>
        <p className="text-gray-400 mt-2">{specialty}</p>
        
        <div className="mt-4 flex justify-center md:justify-start">
          <EmployeeRating rating={5} />
        </div>

        <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-red-950 transition duration-300">
          SUBIR CORTE
        </button>
      </div>
    </div>
  );
};

export default EmployeeInfo;