import React from "react";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h1>Copyright © 2023 ExpenseVue</h1>
      <span className="mx-2">|</span>
      <Link to="https://github.com/helios274" target="_blank">
        <div className="flex items-center">
          <BsGithub />
          <span className="ml-1">Adithya Prasad</span>
        </div>
      </Link>
    </div>
  );
};

export default Footer;
