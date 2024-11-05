import { Footer, Sidebar, TopMenu } from "@/components";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primaryBrown pt-[47px] flex flex-col">
      <TopMenu />
      <div className="px-0 sm:px-4 flex-1">
        {children} {/* Contenido dinámico para cada página */}
      </div>
      <Sidebar />
      <div className="py-[76px] sm:pb-0">
        <Footer />
      </div>
    </div>
  );
}
