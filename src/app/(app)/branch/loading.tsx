import { SpinnerCube } from "@/components";

export default function Loading() {
  return (
    <div className=" min-h-screen h-full w-full flex items-center">
      <SpinnerCube size={60} />
    </div>
  );
}
