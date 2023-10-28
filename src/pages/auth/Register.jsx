import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import Button from "../../components/Button";
import InputBox from "../../components/InputBox";
import AuthCard from "../../components/cards/AuthCard";
import PasswordBox from "../../components/PasswordBox";

const Register = () => {
  const { token } = useSelector((state) => state.auth);
  if (token) {
    // toast.info("You are already logged in.");
    return <Navigate to="/dashboard" />;
  }
  const [btnText, setBtnTxt] = useState("Register");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function registerHandler(data) {
    setBtnTxt("Registering");
    setSpinner(true);
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res?.success) {
          //   console.log(res);
          toast.success(res.message);
          navigate("/login");
        } else {
          //   console.log(res);
          toast.error(res.errors[0].detail);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setBtnTxt("Register");
        setSpinner(false);
      });
  }
  return (
    <div className="flex justify-center">
      <AuthCard title="Register with ExpenseVue" cardClass="shadow-lg">
        <form
          onSubmit={handleSubmit(registerHandler)}
          className="flex flex-col"
        >
          <InputBox
            label="Email"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="field-error-msg">This field is required</p>
          )}
          <PasswordBox
            label="Password"
            {...register("password", {
              required: true,
              minLength: 5,
              maxLength: 25,
            })}
          />
          {errors.password && errors.password.type == "required" && (
            <p className="field-error-msg">This field is required</p>
          )}
          {errors.password && errors.password.type == "minLength" && (
            <p className="field-error-msg">
              Password must be at least 5 characters long
            </p>
          )}
          {errors.password && errors.password.type == "maxLength" && (
            <p className="field-error-msg">
              Password should not be greater than 25 characters
            </p>
          )}
          <Button
            children={btnText}
            type="submit"
            className="btn-primary-outline mt-4"
            spin={spinner}
          />
        </form>
      </AuthCard>
    </div>
  );
};

export default Register;
