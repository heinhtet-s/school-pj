import React from "react";
import { Outlet } from "react-router-dom";
import AppRoutes from "../../routes";
import Footer from "./footer";

const EmptyLayout = () => {
  console.log("EmptyLayout");
  return (
    <>
      <div className="p-2 lg:p-4 h-[calc(100vh-22px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default EmptyLayout;
