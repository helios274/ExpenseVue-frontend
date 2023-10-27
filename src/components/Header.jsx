import React from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";
import { useSelector, useDispatch } from "react-redux";
import { logout } from ".././store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    return navigate("/");
  };
  return (
    <header className="header">
      <div className="flex items-center">
        <Link to="/" className="nav-brand">
          ExpenseVue
        </Link>
        <div className="flex items-center ml-auto">
          {token !== "" ? (
            <>
              <NavLink to="expenses" className="nav-link">
                Expense
              </NavLink>
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="register" className="nav-link">
                Register
              </NavLink>
            </>
          )}
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};

export default Header;
