import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";

const Private = () => {
  const { token } = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);
  const checkForAuthentication = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res?.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (token) checkForAuthentication();
  }, [token]);

  return isAuthenticated ? <Outlet /> : <Spinner />;
};

export default Private;
