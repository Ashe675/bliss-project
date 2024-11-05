interface Props {
  children: React.ReactNode;
}

export const ErrorMessageSmall = ({ children }: Props) => {
  return <div className=" text-red-500 text-xs font-light">{children}</div>;
};
