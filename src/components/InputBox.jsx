import React, { useId } from "react";

const InputBox = React.forwardRef(function Input(
  { label, type = "text", placeholder, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="flex flex-col my-2">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <input id={id} ref={ref} type={type} className="input" {...props} />
    </div>
  );
});

export default InputBox;
