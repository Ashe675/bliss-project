import type { Metadata } from "next";

import "./globals.css";
// import Header from "@/app/(Landing)/components/Header";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className="antialiased text-white h-screen bg-black"
      >
        {/* <Header /> */}
        {children}
      </body>
    </html>
  );
}
