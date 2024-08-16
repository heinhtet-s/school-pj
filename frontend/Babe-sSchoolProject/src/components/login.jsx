"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ApiReq } from "../hooks/apiService";

const defaultFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(defaultFormData);

  const inputStyles =
    "border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginHandler = async () => {
    try {
      const data = await ApiReq.post("/auth/login", {
        ...formData,
      });
      localStorage.setItem("user", JSON.stringify(data?.data?.data));
      localStorage.setItem("auth_token", data?.data?.data?.access_token);
      if (data?.data?.data?.role === "ADMIN") {
        window.location.href = "/room";
      } else {
        window.location.href = "/";
      }
    } catch (error) {}
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginHandler();
  };

  return (
    <section className="container mx-auto">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto">
        <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Login
          </h1>
        </div>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="name@company.com"
            required
            className={inputStyles}
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            minLength={6}
            className={inputStyles}
            value={formData.password}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            className="w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign Up
          </button>
        </form>
        <button
          type="submit"
          className="w-full bg-green focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          go to login
        </button>
      </div>
    </section>
  );
};

export default Login;
