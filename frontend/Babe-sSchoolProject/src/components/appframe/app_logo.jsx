import React from "react";
import logo from "../../assets/images/logo.png";
import { twMerge } from "tailwind-merge";

const AppLogo = (props) => {
  const { className } = props;
  return <img className={twMerge("w-6 h-6", className)} src={logo} alt="Logo" />;
};

export default AppLogo;
