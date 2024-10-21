import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bliss': '#4E1504',
        'bliss-dark': '#100000',
        primary: {
          DEFAULT: "#4E1504", // Color primario por defecto
        },
        secondary: {
          DEFAULT: "#311502", // Color secundario por defecto
        },
        tertiary: {
          DEFAULT: "#2F251F", // Color terciario por defecto
        },
      },
      backgroundImage: {
        primaryBrown: "linear-gradient(180deg, #180A00, #000000)",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Roboto fuente personalizada
       
      },
    },
  },
  plugins: [],
};
export default config;
