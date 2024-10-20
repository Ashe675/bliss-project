import React from 'react';
import {Container} from './Container'; // Asegúrate de que la ruta sea correcta

export const articles = [
  {
    id: 1,
    title: 'Optimización Operativa',
    description: 'Simplifica tareas administrativas para que puedas centrarte en ofrecer un excelente servicio.',
    imageUrl: 'https://images.unsplash.com/photo-1661749711934-492cd19a25c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
  },
  {
    id: 2,
    title: 'Experiencia del Cliente Mejorada',
    description: 'Ofrece un servicio más eficiente y personalizado que mantiene a los clientes regresando.',
    imageUrl: 'https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
  },
  {
    id: 3,
    title: 'Crecimiento Escalable',
    description: 'Desde una única barbería o salón hasta una cadena de sucursales, “Bliss” crece contigo.',
    imageUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
  },
  {
    id: 4,
    title: 'Gestion en tiempo real',
    description: 'Monitorea y gestiona todos los aspectos de tu barbería o salón en tiempo real desde cualquier dispositivo.',
    imageUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
  },
];

export const Articles: React.FC = () => {
  return (
    <div id="blog">
      <Container>
        <div className="mb-12 space-y-2 text-center">
          <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">Beneficios para tu negocio</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article.id} className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-orange-950/20 dark:bg-orange-950/30 bg-opacity-50 shadow-2xl shadow-gray-600/10">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={article.imageUrl}
                  alt="art cover"
                  loading="lazy"
                  width="1000"
                  height="667"
                  className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 relative">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{article.title}</h3>
                <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

