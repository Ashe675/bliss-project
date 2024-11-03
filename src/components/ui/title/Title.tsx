
interface Props {
  title: string;
}

export const Title = ({ title }: Props) => {
  return <h1 className="py-2 text-2xl sm:text-3xl ">{title}</h1>;
};
