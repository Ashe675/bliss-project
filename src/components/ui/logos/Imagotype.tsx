import Image from "next/image";

type Props = {
  width: number;
  height: number;
};

export const Imagotype = ({ width, height }: Props) => {
  return (
    <Image
      src={"/ui/imagotype-white-sm.png"}
      width={width}
      height={height}
      alt="Logotipo de bliss"
    />
  );
};
