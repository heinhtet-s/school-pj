import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-2 flax flex-col h-full">
      <div className="h-full flex items-center justify-center">
        <img className="w-32 " src={logo}></img>
        {/* <a href={constants.production.APK_URL} target="_blank">
          <span className="p-4">NEW EV App</span>
          <img src={DownloadAPK} className="rounded-md w-40" alt="" />
        </a> */}
      </div>
    </div>

  );
};

export default HomePage;
