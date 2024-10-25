import Image from "next/image";

type Props = {
  width: number;
  height: number;
  className? : string;
};

export const LogoWhite = ({ width, height, className }: Props) => {
  return (
    <Image
      src={"/ui/logo-white.svg"}
      width={width}
      height={height}
      priority
      alt="Logo de bliss"
      className={className}
    />
  );
};
