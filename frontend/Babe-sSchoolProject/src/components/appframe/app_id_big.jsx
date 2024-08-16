import React from "react";
import AppName from "./app_name";
import AppVersion from "./app_version";

const AppIdBig = () => {
  //bg-base-100 sticky top-0 z-20 hidden items-center gap-0 bg-opacity-90 px-4 py-0 backdrop-blur lg:flex lg:flex-col
  return (
    <div className="bg-base-100 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex ">
      <AppName />
      <AppVersion />
    </div>
  );
};

export default AppIdBig;
