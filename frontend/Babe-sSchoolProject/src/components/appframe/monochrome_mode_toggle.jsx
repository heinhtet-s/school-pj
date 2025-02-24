import React from "react";
import { toggleMonochromeMode } from "../../helpers/display_mode_helpers";

const MonochromeModeToggle = () => {
  const handleToggle = () => {
    toggleMonochromeMode();
  };
  return (
    <button
      className="monochrome-toggle btn h-8 w-8 min-h-8 m-1 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
      onClick={handleToggle}
    >
      {/* <i className="fa-solid fa-palette bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-lg font-semibold text-transparent"></i> */}
      {/* <FontAwesomeIcon icon={faPalette} /> */}
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="palette"
        className="text-sky-400 w-5 h-5"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <defs>
          <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="a">
            <stop offset="0%" stopColor="currentColor" />
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
        </defs>
        <path
          fill="url(#a)"
          stroke="currentColor"
          d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
        ></path>
      </svg>
    </button>
  );
};

export default MonochromeModeToggle;
