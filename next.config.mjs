/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',  // o 'http' si quieres permitir ambos
            hostname: '**',    // permite cualquier hostname
          },
        ],
      },
};

export default nextConfig;
