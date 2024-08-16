import React from "react";
import axios from "axios";
const token = localStorage.getItem("auth_token");
export const ApiReq = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 50000,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const isLogin = () => {
  return !!token;
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const getUserInfo = () => {
  const user = localStorage.getItem("user");
  return JSON.parse(user);
};
