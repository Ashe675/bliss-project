import { Navbar } from "@/components";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className=" pb-10">{children}</div>
      <Navbar />
    </>
  );
}
