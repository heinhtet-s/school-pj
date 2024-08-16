import _ from "lodash";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import paths from "../../routes/paths";
import { useAuth } from "../../auth/auth_provider";
import EmptyLayout from "./empty_layout";
import FullLayout from "./full_layout";

const barePages = [paths.getHomeFullPath(paths.login)];

const DefaultPageLayout = () => {

    return (
      <FullLayout>
        <Outlet />
      </FullLayout>
    );
  
};

export default DefaultPageLayout;
