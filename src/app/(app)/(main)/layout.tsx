import { auth } from "@/auth.config";
import { Navbar } from "@/components";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <>
    
      <div className={` pb-10`}>{children}</div>
      {isAuthenticated && <Navbar />}
    </>
  );
}
