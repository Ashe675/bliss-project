import { auth } from "@/auth.config";
import { Navbar } from "@/components";
import { notFound } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  if (!isAuthenticated || session.user.role !== "admin") notFound();

  return (
    <div>
      {children}
      <Navbar />
    </div>
  );
}
