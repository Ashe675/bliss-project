"use client";

import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  stroke?: number;
}

export const CustomBackButton = ({ className, stroke = 2 }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <IconArrowLeft
      stroke={stroke}
      title="Volver"
      onClick={handleClick}
      className={className}
    />
  );
};
