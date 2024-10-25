// components/EditProfileForm/EditProfileForm.tsx
'use client';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ProfileData {
  name: string;
  description: string;
}

const EditProfileForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileData>();
  const onSubmit = (data: ProfileData) => {
    console.log(data);
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input 
          {...register('name', { required: true })} 
          className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea 
          {...register('description', { required: true })}
          className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        ></textarea>
        {errors.description && <span className="text-red-500">Description is required</span>}
      </div>
      
      <button 
        type="submit" 
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Save
      </button>
    </form>
  );
};

export default EditProfileForm;
