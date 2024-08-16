import React from "react";
import AppName from "./app_name";
import AppVersion from "./app_version";

const AppIdSmall = () => {
  return (
    <div className="flex items-center gap-2 lg:hidden">
      <AppName />
      <AppVersion />
    </div>
  );
};

export default AppIdSmall;
