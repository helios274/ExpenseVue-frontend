import React, { useEffect } from "react";
import home1 from "../assets/images/home1.jpeg";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const { token } = useSelector((state) => state.auth);
  if (token) {
    return <Navigate to="/dashboard" />;
  }
  // min-[420px]:top-28 min-[522px]:top-36 sm:top-40 md:top-72
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center mt-4">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-quaternary ">
          ExpenseVue
        </h1>
        <h4 className="mt-4 text-lg sm:text-2xl font-bold md:font-extrabold text-quaternary">
          Where Money Meets Management
        </h4>
        <h4 className="text-md sm:text-xl md:text-2xl font-bold font-mono mt-8">
          Spend Smart, Live Well with ExpenseVue.
        </h4>
        <div className="text-lg font-mono font-semibold text-center mt-10">
          <h6 className="my-3">
            ExpenseVue is your all-in-one solution for seamless expense tracking
            and financial management
          </h6>
          <h6>Say goodbye to the stress of managing your finances</h6>
        </div>
      </div>
    </div>
  );
};

export default Home;
