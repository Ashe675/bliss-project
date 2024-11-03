import React from "react";
import { Container } from "@/components/landing/Container";

export const Features: React.FC = () => {
  return (
    <div id="features">
      <Container>
        <div className="md:w-2/3 lg:w-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-red-800"
          >
            <path
              fillRule="evenodd"
              d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
              clipRule="evenodd"
            />
          </svg>

          <h2 className="my-8 text-2xl font-bold text-white md:text-4xl">
            ¿Eres dueño de un negocio y deseas dar el siguiente paso?{" "}
          </h2>
          <p className="text-gray-300">
            Transforma la gestión de tu barbería o salón con “Bliss”, la
            solución SaaS diseñada para optimizar cada aspecto de tu negocio,
            desde la administración de sucursales hasta la satisfacción del
            cliente. Nuestra plataforma intuitiva y potente está diseñada para
            adaptarse a tus necesidades, ya sea que gestiones un pequeño local o
            una cadena de renombre.{" "}
          </p>
        </div>

        <div className="mt-16 grid divide-x divide-y divide-orange-700/30  overflow-hidden rounded-3xl border  text-white border-orange-800/50 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-primary/60"
            >
              <div className="relative space-y-8 py-12 p-8">
                <div className="space-y-2">
                  <h5 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h5>
                  <p className="text-white/80">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

const featuresData = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/4341/4341134.png",
    title: "Optimización Operativa",
    description:
      "Simplifica tareas administrativas para que puedas centrarte en ofrecer un excelente servicio.",
    alt: "Optimización Operativa",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/4341/4341134.png",
    title: "Experiencia del Cliente Mejorada",
    description:
      "Ofrece un servicio más eficiente y personalizado que mantiene a los clientes regresando.",
    alt: "Experiencia del Cliente Mejorada",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/4341/4341160.png",
    title: "Crecimiento Escalable",
    description:
      "Desde una única barbería o salón hasta una cadena de sucursales, “Bliss” crece contigo.",
    alt: "Crecimiento Escalable",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/4341/4341025.png",
    title: "Gestion en tiempo real",
    description:
      "Monitorea y gestiona todos los aspectos de tu barbería o salón en tiempo real desde cualquier dispositivo.",
    alt: "Gestion en tiempo real",
  },
];
