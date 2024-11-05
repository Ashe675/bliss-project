import { Footer, Sidebar, ToastNotification, TopMenu } from "@/components";

import { UserProvider } from "@/context/UserContext"; // Importa el contexto de usuario

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserProvider>
        {" "}
        {/* Envolvemos el layout con el UserProvider */}
        <div className="min-h-screen bg-primaryBrown pt-[47px] flex flex-col">
          <TopMenu />
          <div className="px-0 sm:px-4 flex-1">{children}</div>
          <Sidebar />
          <div className="py-[76px] sm:pb-0">
            <Footer />
          </div>
        </div>
      </UserProvider>
      <ToastNotification />
    </>
  );
}
