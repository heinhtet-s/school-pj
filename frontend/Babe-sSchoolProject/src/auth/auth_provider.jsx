import React, { useState, useContext, createContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import paths from "../routes/paths";
import _ from "lodash";
import useUserStore from "../store/user_store";
// import { logIn, logOut } from "../data";
import { logIn, logOut } from "./helpers";
import { isLogin } from "../hooks/apiService";

const AuthContext = createContext(null);
let accessToken = "";

export const getAccessToken = () => accessToken;
export const setAccessToken = (token) => {
  accessToken = token;
};

const AuthProvider = ({ children }) => {
  // get setUser from zustand store
  const userStore = useUserStore();

  const setStoreUser = userStore.setUser;

  const signIn = async (signInUser) => {
    console.log("In SignIn");
    try {
      const loginUser = await logIn(signInUser);
      console.log(loginUser);
      if (loginUser) {
        setStoreUser(loginUser);
        return loginUser;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  const signOut = async () => {
    console.log("In SignOut");

    await logOut();
    setStoreUser(null);
  };
  const updateUser = (user) => {
    if (user) {
      setStoreUser(user);
    }
  };

  const value = {
    user: userStore.user,
    accessToken,
    updateUser,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const RequireAuth = ({ children }) => {
  // let auth = useAuth();
  // let location = useLocation();
  if (!isLogin()) {
    return <Navigate to={paths.login} state={{ from: location }} />;
  } else {
    return children;
  }
};

export default AuthProvider;
