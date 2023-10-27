import React, { useId, useState } from "react";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";

const PasswordBox = React.forwardRef(function Input(
  { label, placeholder, ...props },
  ref
) {
  const id = useId();
  const [icon, setIcon] = useState(<BsEyeSlashFill />);
  const [type, setType] = useState("password");

  const togglePasswordVisibility = () => {
    if (type === "password") {
      setType("text");
      setIcon(<BsEyeFill />);
    } else {
      setType("password");
      setIcon(<BsEyeSlashFill />);
    }
  };
  return (
    <div className="flex flex-col my-2">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <div className="flex items-center">
        <input
          id={id}
          ref={ref}
          type={type}
          className="input-password peer"
          {...props}
        />
        <div
          className="peer-focus:bg-primary dark:peer-focus:bg-quaternary password-toggle-btn"
          onClick={togglePasswordVisibility}
        >
          {icon}
        </div>
      </div>
    </div>
  );
});

export default PasswordBox;
