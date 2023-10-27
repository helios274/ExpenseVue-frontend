import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ImSpinner4 } from "react-icons/im";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((value) => --value);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div className="d-flex flex-col justify-center mt-24 sm:mt-32">
        <h1 className="text-center text-2xl sm:text-4xl font-bold md:font-extrabold text-quaternary dark:text-primary">
          You are not authenticated
        </h1>
        <div className="flex justify-center text-4xl mt-5 mb-3 text-quaternary dark:text-primary">
          <ImSpinner4 className="animate-spin" />
        </div>
        <h2 className="text-center text-lg font-semibold text-quaternary dark:text-primary">
          Redirecting in {count}s
        </h2>
      </div>
    </>
  );
};

export default Spinner;
