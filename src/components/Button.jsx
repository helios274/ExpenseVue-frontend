import { ImSpinner9 } from "react-icons/im";
const Button = ({
  children,
  className,
  type,
  onClick,
  onSubmit,
  spin = false,
}) => {
  return (
    <button
      className={`${className} flex justify-center items-center`}
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {spin ? <ImSpinner9 className="animate-spin mr-3" /> : null}
      {children}
    </button>
  );
};

export default Button;
