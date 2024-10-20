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
          backgroundColor: 'rgba(18, 5, 1, 0.8)', // Un color de fondo para ver el efecto
        }}
      />

      <Container>
        <div className="relative pt-36 ml-auto">

            <div className="flex justify-center">
            <img src="/marca/BlissWhiteLetters.png" alt="" />

            </div>
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-6xl xl:text-7xl">
              ¿Estas buscando una barberia o salón para tí?
            </h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300">
            Transforma la gestión de tu barbería o salón con “Bliss”, la solución SaaS diseñada para optimizar cada aspecto de tu negocio, desde la administración de sucursales hasta la satisfacción del cliente. Nuestra plataforma intuitiva y potente está diseñada para adaptarse a tus necesidades, ya sea que gestiones un pequeño local o una cadena de renombre.
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
            <div className="hidden py-8 mt-16 border-y  dark:border-orange-950 sm:flex justify-between">
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Los mejores precios
                </h6>
                <p className="mt-2 text-orange-200">Para todos</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  El más rapido del mercado
                </h6>
                <p className="mt-2 text-orange-200">Con escalabilidad</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  El mas aclamado
                </h6>
                <p className="mt-2 text-orange-200">Y el más eficaz</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};