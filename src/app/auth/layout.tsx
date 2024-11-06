import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if(session?.user) redirect('/')

  return (
    <div className=" min-h-screen bg-primaryBrown w-full flex flex-col justify-center">
      <div className="  w-full max-w-xl mx-auto p-3 h-full">{children}</div>
    </div>
  );
}
