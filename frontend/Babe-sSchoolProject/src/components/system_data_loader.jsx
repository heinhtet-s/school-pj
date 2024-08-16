import React, { useEffect } from "react";
//import { storeCssVariables } from "../helpers/css_helpers";
//import { storeMenus } from "../helpers/menu_helpers";

const SystemDataLoader = ({ children }) => {
  //storeMenus();
  //storeCssVariables();

  // useEffect(() => {
  //   console.log("Pre Data Loading");
  //   storeMenus();
  //   storeCssVariables();
  // }, []);

  return <>{children}</>;
};

export default SystemDataLoader;
