import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../auth/auth_provider";
import paths from "../../routes/paths";
import logo from "../../assets/images/logo_login.png";
import AppTitle from "../../components/appframe/app_title";
import { LegendsIcon } from "../../assets/icons/svg_icons";

const LoginPage = () => {
  const [loginError, setLoginError] = useState();
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();


  //console.log(location);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // clearErrors("sigin");
    navigate(paths.home_base)
    // console.log(data.name);
    // const user = await auth.signIn({ name: data.name, pwd: data.password });
    // if (user) {
    //   console.log("User", user);
    //   let to = paths.home;
    //   if (location.state && location.state.from) {
    //     to = location.state.from;
    //   }
    //   navigate(to, { replace: true });
    // } else {
    //   setLoginError("Invalid Name or Password!");
    //   setError("sigin", {
    //     type: "manual",
    //     message: "Invalid username or password.",
    //   });
    // }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <div className="card lg:w-96 w-80 bg-base-100 shadow-xl border-[1px]">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <figure className="pt-5">
            {/* <img src={logo} alt="Logo" width="256px" /> */}
            <LegendsIcon />
          </figure>
          <div className="card-body">
            <h2 className="card-title gap-0">
              {/* Login to <span className="text-primary px-1">0xCommunityCard</span>Admin */}
              {/* Login to <span className="text-[#285680] text-md pl-1">0x</span> <span className="text-[#4482C3] text-md pr-1">CommunityCard</span>Admin */}
              Login to <AppTitle className="px-1" />
            </h2>
            <div className="flex flex-col"></div>
            <div className="w-full p-2 grid grid-cols-2">
              <label htmlFor="name" className="w-32 inline-block pr-2">
                Name
              </label>
              {/* <input
                name="name"
                type="text"
                placeholder="User Name"
                className="input input-error input-sm"
                {...register("name", { required: "Name is required.", maxLength: 20 })}
                onChange={(e) => {
                  clearErrors("sigin");
                }}
              /> */}
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Nameis required.", maxLength: 20 }}
                render={({ field }) => (
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    className="input input-error input-sm"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      clearErrors("sigin");
                    }}
                  />
                )}
              />
            </div>
            {errors.name && <span className="font-thin text-xs text-red-500">{errors.name.message}</span>}
            <div className="w-full p-2 grid grid-cols-2">
              <label htmlFor="password" className="w-24 inline-block pr-2">
                Password
              </label>
              {/* <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="input input-error input-sm"
                {...register("password", { required: "Password is required.", maxLength: 20 })}
                onChange={(e) => {
                  clearErrors("sigin");
                }}
              /> */}
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: "Password is required.", maxLength: 20 }}
                render={({ field }) => (
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="input input-error input-sm"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      clearErrors("sigin");
                    }}
                  />
                )}
              />
            </div>
            {errors.password && <span className="font-thin text-xs text-red-500">{errors.password.message}</span>}
            <div className="card-actions justify-center p-2">
              <button className="btn btn-error btn-md w-24" type="submit">
                Login
              </button>
            </div>
            {errors.sigin && <span className="font-thin text-xs text-red-500">{errors.sigin.message}</span>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
