import "./styles.css";

interface Props {
  size: number;
}

export const SpinnerCube = ({ size }: Props) => {
  return (
    <div className={`sk-cube-grid`} style={{width : `${size}px`, height: `${size}px`}}>
      <div className="sk-cube sk-cube1"></div>
      <div className="sk-cube sk-cube2"></div>
      <div className="sk-cube sk-cube3"></div>
      <div className="sk-cube sk-cube4"></div>
      <div className="sk-cube sk-cube5"></div>
      <div className="sk-cube sk-cube6"></div>
      <div className="sk-cube sk-cube7"></div>
      <div className="sk-cube sk-cube8"></div>
      <div className="sk-cube sk-cube9"></div>
    </div>
  );
};
