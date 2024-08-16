import React, { Fragment, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";

const ProcessIndicator = (props) => {
  return (
    <div className={`absolute z-[1000] w-screen h-screen -top-5 opacity-40 flex justify-center items-center bg-primary ${props.show ? "block" : "hidden"}`}>
      <Oval color="#ff5724" height={100} width={100} />
    </div>
  );
};

export default ProcessIndicator;
