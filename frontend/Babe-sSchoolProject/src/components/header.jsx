"use client";

import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import ThemeContext from "../context/themeContext";
import { getUserInfo, isLogin } from "../hooks/apiService";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const naviagete = useNavigate();

  return (
    <header className="py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between">
      <div className="flex items-center w-full md:2/3">
        <a href="/" className="font-black text-tertiary-dark">
          Sandora
        </a>
        <ul className="flex items-center ml-5">
          <li className="flex items-center">
            {/* <div className='w-10 h-10 rounded-full overflow-hidden'>
                    <Image
                      src={session.user.image}
                      alt={session.user.name!}
                      width={40}
                      height={40}
                      className='scale-animation img'
                    />
                  </div> */}

            {/* <Link href='/auth'>
                <FaUserCircle className='cursor-pointer' />
              </Link> */}
          </li>
        </ul>
      </div>

      <ul className="flex items-center justify-between w-full md:w-1/2 mt-4">
        <li className="hover:-translate-y-2 duration-500 transition-all">
          Home
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all">
          Rooms
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all">
          Contact
        </li>
        {!isLogin() ? (
          <>
            <li
              onClick={() => {
                naviagete("/login");
              }}
              className="hover:-translate-y-2 duration-500 transition-all"
            >
              Login
            </li>
            <li
              onClick={() => {
                naviagete("/register");
              }}
              className="hover:-translate-y-2 duration-500 transition-all"
            >
              Register
            </li>
          </>
        ) : (
          <li
            onClick={() => {
              naviagete("/register");
            }}
            className="hover:-translate-y-2 flex items-center gap-3 duration-500 transition-all"
          >
            <FaUserCircle className="cursor-pointer" />
            {getUserInfo().name}
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
