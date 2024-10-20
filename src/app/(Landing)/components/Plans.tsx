import React from 'react';
import {Container} from './Container'; // Asegúrate de que la ruta sea correcta

export const plans = [
  {
    id: 1,
    title: 'Plan principiante',
    description: 'Simplifica tareas administrativas para que puedas centrarte en ofrecer un excelente servicio.',
    imageUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
    price: '10',
    
},
//   {
//     id: 2,
//     title: 'Plan intermedio',
//     description: 'Ofrece un servicio más eficiente y personalizado que mantiene a los clientes regresando.',
//     imageUrl: 'https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
// price: '10',
//   
// },
  {
    id: 3,
    title: 'Plan avanzado',
    description: 'Desde una única barbería o salón hasta una cadena de sucursales, “Bliss” crece contigo.',
    imageUrl: 'https://images.unsplash.com/photo-1661749711934-492cd19a25c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    price: '40',
    },

];

export const Plans: React.FC = () => {
  return (
    <div id="blog">
      <Container>
        <div className="mb-12 space-y-2 text-center">
          <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">Planes de suscripción</h2>
        </div>
        <div className="grid gap-8  md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.id} className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-orange-950/20 dark:bg-white bg-opacity-50 shadow-2xl shadow-gray-600/10">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={plan.imageUrl}
                  alt="art cover"
                  loading="lazy"
                  width="1000"
                  height="667"
                  className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 relative">
                <div className='flex justify-between'>
                <h3 className="text-2xl font-semibold text-gray-800">{plan.title}</h3>
                <h3 className="text-2xl font-semibold text-gray-800">${plan.price}</h3>
                </div>
                <p className="mt-6 mb-8 text-gray-900">{plan.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

