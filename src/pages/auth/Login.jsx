import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

import Button from "../../components/Button";
import InputBox from "../../components/InputBox";
import AuthCard from "../../components/cards/AuthCard";
import PasswordBox from "../../components/PasswordBox";

const Login = () => {
  const { token } = useSelector((state) => state.auth);
  const [btnText, setBtnTxt] = useState("Login");
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function loginHandler(data) {
    setBtnTxt(`Logging in`);
    setSpinner(true);
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res?.success) {
          // console.log(res);
          dispatch(
            login({
              userData: res.data.user,
              token: res.data.tokens.access,
            })
          );
          toast.success(res.message);
          navigate("/dashboard");
        } else {
          dispatch(logout());
          toast.error(res.message);
        }
      })
      .finally(() => {
        setBtnTxt("Login");
        setSpinner(false);
      });
  }
  if (token) {
    // toast.info("You are already logged in.");
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex justify-center">
      <AuthCard title="Login" cardClass="shadow-lg">
        <div className="dark:text-primary">
          <div>Test credentials:</div>
          <div>
            email: <span className="font-medium">test1@mail.com</span>
          </div>
          <div>
            password: <span className="font-medium">test123</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(loginHandler)} className="flex flex-col">
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
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="field-error-msg">This field is required</p>
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

export default Login;
