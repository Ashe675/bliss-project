import {TopMenu } from "@/components";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" min-h-screen bg-primaryBrown pt-[47px]">
      <TopMenu />
      {children}
    </div>
  );
}
