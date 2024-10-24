import Image from "next/image";

type Props = {
  width: number;
  height: number;
};

export const LogoWhite = ({ width, height }: Props) => {
  return (
    <Image
      src={"/ui/logo-white.svg"}
      width={width}
      height={height}
      priority
      alt="Logo de bliss"
    />
  );
};
