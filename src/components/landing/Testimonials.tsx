import React from 'react';
import {Container} from './Container'; 
import Image from 'next/image';

const testimonials = [
  {
    name: 'Carlos Pérez',
    role: 'Barbero en Las Maquinas',
    image: 'https://avatars.githubusercontent.com/u/117692862?v=4',
    review: 'Ahora la gestión de citas y clientes en mi barbería ha mejorado considerablemente. Ahora puedo organizar mejor mi tiempo y ofrecer un servicio más eficiente a mis clientes. ¡Recomiendo Bliss a cualquier barbero que quiera optimizar su negocio!',
  },
  {
    name: 'Julio Gómez',
    role: 'Estilista en Salón Glamour',
    image: 'https://avatars.githubusercontent.com/u/108470207?v=4',
    review: 'Para mi Bliss ha sido una herramienta increíble para mi salón. Me ha permitido gestionar las citas de mis clientes sin errores y ofrecer una experiencia más personalizada. Gracias a Bliss, mi salón ha crecido y mis clientes están más felices que nunca.',
  },
  {
    name: 'Marcos Martínez',
    role: 'Barbero en La Esquina del Corte',
    image: 'https://avatars.githubusercontent.com/u/29416461?v=4',
    review: 'Usar Bliss en mi barbería ha sido un antes y un después. Puedo llevar el control de todo, desde las citas hasta el inventario, sin complicaciones. Mis clientes también disfrutan de la facilidad para reservar sus citas online. ¡Bliss es esencial para cualquier negocio de barbería!',
  },
];


export const Testimonials: React.FC = () => {
  return (
    <Container>
      <div className="text-gray-300 lg:mx-14" id="reviews">

      <div className="md:w-2/3 lg:w-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-800">
          <path
            fillRule="evenodd"
            d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
            clipRule="evenodd"
          />
        </svg>

        <h2 className=" my-8 text-2xl font-bold text-white md:text-4xl">
        Conoce lo que dicen nuestros clientes
        </h2>
      </div>
        
        <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="aspect-auto p-8 border  rounded-3xl  bg-gray-800 border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none"
            >
              <div className="flex gap-4">
                <Image
                  className="w-12 h-12 rounded-full"
                  src={testimonial.image}
                  alt={`${testimonial.name} avatar`}
                  width="400"
                  height="400"
                />
                <div>
                  <h6 className="text-lg font-medium text-white">{testimonial.name}</h6>
                  <p className="text-sm text-gray-300">{testimonial.role}</p>
                </div>
              </div>
              <p className="mt-8">{testimonial.review}</p>
            </div>
          ))}
        </div>
    </div>
      </Container>
  );
};

