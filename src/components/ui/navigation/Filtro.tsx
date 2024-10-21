'use client';
import React, { useState } from 'react';

const Filtro = () => {
  const [activeTab, setActiveTab] = useState('Todo');

  const tabs = [
    { label: 'Barberías', value: 'Barberías' },
    { label: 'Salones', value: 'Salones' },
    { label: 'Cerca', value: 'Cerca' },
    { label: 'Calificación', value: 'Calificación' },
    { label: 'Todo', value: 'Todo' },
  ];

  return (
    <div className="sticky w-full mx-auto mt-4 p-2">
      {/* Fila de Tabs con flex-wrap para que se adapten al tamaño de pantalla */}
      <div className="flex justify-between gap-2 flex-wrap">
        {tabs.map((tab) => (
          <div
            key={tab.value}
            className={`flex-1 min-w-[80px] h-[26px] rounded-full flex items-center justify-center cursor-pointer ${
              activeTab === tab.value
                ? 'bg-[#4E1504] text-white font-medium'
                : 'bg-[rgba(78,21,4,0.33)] text-[#D2CFCF]'
            }`}
            onClick={() => setActiveTab(tab.value)}
          >
            <span className="text-sm">{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filtro;
