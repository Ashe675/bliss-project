export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" min-h-screen bg-primaryBrown w-full ">
      <div className="  w-full max-w-xl mx-auto p-3 h-full">{children}</div>
    </div>
  );
}
