/* eslint-disable react/display-name */
import React from "react";
import useUserStore from "../store/user_store";
import { shallow } from "zustand/shallow";

const withUser = (WrappedComponent) => {
  return (props) => {
    const user = useUserStore((state) => state.user, shallow);
    return <WrappedComponent {...props} user={user} />;
  };
};

export default withUser;
