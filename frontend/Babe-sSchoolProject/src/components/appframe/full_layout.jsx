import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/auth_provider";
import AppIdSmall from "./app_id_small";
import AppIdBig from "./app_id_big";
import MainMenu from "./main_menu";
import Footer from "./footer";
import MainMenuButton from "./menu/main_menu_button";
import { Outlet } from "react-router-dom";
import DarkModeToggle from "./dark_mode_toggle";
import MonochromeModeToggle from "./monochrome_mode_toggle";
import AppTitle from "./app_title";
import withUser from "../../hocs/with_user";
import useUserStore from "../../store/user_store";
import AppName from "./app_name";
import AppVersion from "./app_version";
import AppLogo from "./app_logo";

const FullLayout = (props) => {
  console.log("full layout props", props);

  return (
    <>
      <div className="bg-base-100 drawer lg:drawer-open h-[calc(100vh-22px)] overflow-y-scroll">
        <input id="drawer" type="checkbox" className="drawer-toggle"></input>
        <div className="drawer-content">
          <div className="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 [transform:translate3d(0,0,0)] shadow-sm">
            <nav className="navbar w-full">
              <div className="flex flex-1 md:gap-1 lg:gap-2">
                <MainMenuButton />
              </div>
              {/* <div className="flex items-center gap-2 lg:hidden">
                <AppName />
                <AppVersion />
              </div> */}
              <div className="grow text-xs md:text-2xl font-semibold">
                <AppLogo className="mr-1" />
                <AppTitle fullname={true} />
              </div>
              <div></div>
              <div></div>

              <div className="flex-0">
                <div className="items-center lg:block text-xs md:text-base">
                  Welcome!
                </div>
              </div>

              {/* <div className="flex-0 mx-2">
                <label htmlFor="gate-selection" className="btn btn-xs md:btn-sm btn-outline btn-accent">
                  Select Gate
                </label>
              </div> */}
            </nav>
          </div>
          <div className="max-w-[100vw] h-[calc(100vh-86px)] px-2 pb-16 xl:pr-2">
            <Outlet />
          </div>
        </div>
        <div
          className="drawer-side z-40 h-[calc(100vh-22px)]"
          style={{ scrollBehavior: "smooth", scrollPaddingTop: "5rem" }}
        >
          <label
            htmlFor="drawer"
            className="drawer-overlay"
            aria-label="Close menu"
          ></label>
          <aside className="bg-base-100 w-60 h-full">
            <AppIdBig />
            <div className="bg-base-200 sticky top-0 z-10 grid grid-row-2 gap-y-2 w-full bg-opacity-90 py-3 px-2 backdrop-blur lg:hidden ">
              <div className="flex w-full">
                <AppIdSmall />
              </div>
            </div>
            <div className="h-4"></div>
            <MainMenu />
            <ul className="menu menu-sm px-4 py-0"> </ul>
            <div className="bg-base-100 pointer-events-none sticky bottom-0 flex h-40 [mask-image:linear-gradient(transparent,#000000)]"></div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withUser(FullLayout);
