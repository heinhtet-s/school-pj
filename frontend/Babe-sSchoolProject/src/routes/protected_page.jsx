import React from "react";
import { RequireAuth } from "../auth/auth_provider";

const ProtectedPage = ({ page: Page, path }) => {
  return <RequireAuth path={path}>{<Page />}</RequireAuth>;
};

export default ProtectedPage;
