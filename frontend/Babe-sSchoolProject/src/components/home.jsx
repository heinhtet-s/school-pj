import React, { useEffect, useState } from "react";
import Header from "./header";
import ClientComponent from "./hero_session";
import Search from "./search";
import Gallery from "./gallery";
import Footer from "./footer";
import { ApiReq } from "../hooks/apiService";
import FeaturedRoom from "./feature_room";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const fetchData = async () => {
    try {
      const data = await ApiReq.get("/room");
      setRooms(data.data.data);
    } catch (e) {
      console.log("fefwfew", e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <ClientComponent />
      <Search />

      <Gallery />
      <Footer />
    </>
  );
};

export default Home;
