import Image from "next/image";

type Props = {
  width: number;
  height: number;
};

export const LogoType = ({ width, height }: Props) => {
  return (
    <Image
      src={"/ui/logotype-white.svg"}
      width={width}
      height={height}
      style={{ width: width, height: height }}
      alt="Logotipo de bliss"
    />
  );
};
