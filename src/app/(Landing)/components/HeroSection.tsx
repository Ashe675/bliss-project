import { Container } from "@/app/(Landing)/components/Container"; // Asegúrate de que la ruta sea correcta

export const HeroSection = () => {
  return (
    <div className="relative" id="home">
      <img
        src="/landing/Hero.png" 
        alt="Hero Background"
        className="absolute inset-0 object-cover w-full h-full"
        style={{
          maskImage: 'linear-gradient(to bottom, black 20%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)', // Para compatibilidad con navegadores WebKit
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)', // Para compatibilidad con navegadores WebKit
          backgroundColor: 'rgba(18, 5, 1, 0.6)', // Un color de fondo para ver el efecto
        }}
      />

      <Container>
        <div className="relative pt-36 ml-auto">

            <img src="/marca/BlissWhiteLetters.png" alt="" />
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-6xl xl:text-7xl">
              ¿Estas buscando una barberia o salón para tí?
            </h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              incidunt nam itaque sed eius modi error totam sit illum. Voluptas
              doloribus asperiores quaerat aperiam. Quidem harum omnis beatae
              ipsum soluta!
            </p>
            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
              <a
                href="#"
                className="relative flex h-11 w-60 items-center justify-center px-6 before:absolute before:inset-0 before:rounded-md before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-red-700 dark:before:bg-red-800 sm:w-max"
              >
                <span className="relative text-base font-semibold text-primary dark:text-white">
                  Ir a la aplicación
                </span>
              </a>
              <a
                href="#"
                className="relative flex h-11 w-60 items-center justify-center px-6 before:absolute before:inset-0 before:rounded-md before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
              >
                <span className="relative text-base font-semibold text-primary dark:text-white">
                Ver planes
                </span>
              </a>
            </div>
            <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  The lowest price
                </h6>
                <p className="mt-2 text-gray-500">Some text here</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  The fastest on the market
                </h6>
                <p className="mt-2 text-gray-500">Some text here</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  The most loved
                </h6>
                <p className="mt-2 text-gray-500">Some text here</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
