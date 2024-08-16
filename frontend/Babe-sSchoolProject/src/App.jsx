import React, { useState, useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";

import AppRoutes from "./routes";
import { loadDisplayMode } from "./helpers/display_mode_helpers";
import Header from "./components/header";
import Footer from "./components/footer";
import ClientComponent from "./components/hero_session";
import Search from "./components/search";
import Gallery from "./components/gallery";
import Auth from "./components/login";
import Home from "./components/home";
import RoomDetails from "./components/roomDetail";

const router = createBrowserRouter([{ path: "*", element: <AppRoutes /> }]);

export const App = (props) => {
  useEffect(() => {
    loadDisplayMode();
  }, []);

  return (
    <div>
      {/* <Home /> */}
      {/* <Header />
      <ClientComponent />
      <Search />
      <Gallery />
      <Footer /> */}
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
