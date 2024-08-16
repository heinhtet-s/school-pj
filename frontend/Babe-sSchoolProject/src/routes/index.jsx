import { useEffect } from "react";
import { Routes, useLocation, useNavigate } from "react-router-dom";

import paths from "./paths";
import { useAuth } from "../auth/auth_provider";
import HomeRoutes from "./sub_routes/home/routes";
import RoomTypeRoutes from "./sub_routes/room_type/routes";
import RoomRoutes from "./sub_routes/room/routes";
import BookingRoutes from "./sub_routes/booking/routes";




export const AppRoutes = (props) => {
  const auth = useAuth();
  const location = useLocation();

  useEffect(() => {
  
    if (location.pathname === paths.login) return;
  }, [location.pathname]);

  return (
    <Routes>
      {HomeRoutes}
      {RoomTypeRoutes}
      {RoomRoutes}
      {BookingRoutes}
   
     
    </Routes>
  );
};

export default AppRoutes;
