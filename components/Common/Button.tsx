import s from "./common.module.scss";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  varients?: "secondary" | "black";
  type?: "submit" | "reset" | "button" | undefined;
  dir?: string | undefined;
};

const Button: React.FC<Props> = ({
  children,
  onClick,
  varients,
  type,
  dir,
}) => {
  return (
    <button
      dir={dir}
      type={type}
      data-varients={varients}
      className={s.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
