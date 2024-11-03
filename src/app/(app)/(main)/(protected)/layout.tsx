import { auth } from "@/auth.config";
import { notFound } from "next/navigation";

export default async function ProtectedMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) return notFound();

  return children;
}
