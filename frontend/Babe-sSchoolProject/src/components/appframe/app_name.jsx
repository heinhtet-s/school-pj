import React from "react";
import { Link } from "react-router-dom";
import paths from "../../routes/paths";
import AppTitle from "./app_title";
import AppLogo from "./app_logo";

const AppName = (props) => {
  return (
    <Link to={paths.home} aria-current="page" aria-label="Homepage" className="flex-0 btn btn-ghost px-2 ">
      <AppLogo />
      <div className="font-title text-primary inline-flex text-lg md:text-2xl">
        <AppTitle />
      </div>
    </Link>
  );
};

export default AppName;
