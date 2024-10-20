import React from 'react';
import {Container} from './Container'; // Asegúrate de que la ruta sea correcta

const testimonials = [
  {
    name: 'Daniella Doe',
    role: 'Mobile dev',
    image: 'https://avatars.githubusercontent.com/u/117692862?v=4',
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquid quo eum quae quos illo earum ipsa doloribus nostrum minus libero aspernatur laborum cum, a suscipit, ratione ea totam ullam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.',
  },
  {
    name: 'Jane Doe',
    role: 'Marketing',
    image: 'https://avatars.githubusercontent.com/u/108470207?v=4',
    review: 'Lorem ipsum dolor laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.',
  },
  {
    name: 'Yanick Doe',
    role: 'Developer',
    image: 'https://avatars.githubusercontent.com/u/29416461?v=4',
    review: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.',
  },
 
];

export const Testimonials: React.FC = () => {
  return (
    <div className="text-gray-600 dark:text-gray-300" id="reviews">
      <Container>
        <div className="mb-20 space-y-4 px-6 md:px-0">
          <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
            Conoce lo que dicen nuestros clientes
          </h2>
        </div>
        <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none"
            >
              <div className="flex gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src={testimonial.image}
                  alt={`${testimonial.name} avatar`}
                  width="400"
                  height="400"
                  loading="lazy"
                />
                <div>
                  <h6 className="text-lg font-medium text-gray-700 dark:text-white">{testimonial.name}</h6>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{testimonial.role}</p>
                </div>
              </div>
              <p className="mt-8">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
