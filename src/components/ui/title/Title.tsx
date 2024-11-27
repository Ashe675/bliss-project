
interface Props {
  title: string;
  className? : string;
}

export const Title = ({ title, className }: Props) => {
  return <h1 className={`py-2 text-2xl sm:text-3xl ${className}`}>{title}</h1>;
};
