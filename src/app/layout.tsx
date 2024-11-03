import type { Metadata } from "next";

import "./globals.css";
import { robotoFont } from "@/config/fonts/fonts";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s - Bliss",
    default: "Bliss",
  },
  description: "Generated by create next app",
  icons: ["/ui/logo-principal.webp"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" style={{ scrollBehavior: "smooth" }}>
      <body
        className={`antialiased text-white min-h-screen ${robotoFont.className}`}
        style={{ backgroundColor: "#100000" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
