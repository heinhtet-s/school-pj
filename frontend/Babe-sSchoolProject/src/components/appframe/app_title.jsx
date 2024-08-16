import React from "react";
import { twMerge } from "tailwind-merge";

const AppTitle = (props) => {
  const { className, fullname } = props;
  return (
    <div className={twMerge("text-md", className)}>
      {/* {fullname && <span className="text-[#4482C3]">Express Way&nbsp;</span>} */}
      <span className="text-red-500">Sandora</span>
    </div>
  );
};

export default AppTitle;
