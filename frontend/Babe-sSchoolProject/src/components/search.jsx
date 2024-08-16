"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiReq } from "../hooks/apiService";
import RoomCard from "./roomCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Search = () => {
  const searchParams = useQuery();
  const searchQueryParams = searchParams.get("searchQuery");
  const roomTypeParams = searchParams.get("roomType");
  const [roomTypeFilter, setRoomTypeFilter] = useState(roomTypeParams);
  const [searchQuery, setSearchQuery] = useState(searchQueryParams);
  const [roomType, setRoomTypes] = useState();
  const [room, setRoom] = useState();
  const handleRoomTypeChange = (event) => {
    setRoomTypeFilter(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const router = useNavigate();
  const handleFilterClick = () => {
    router(
      `?roomType=${
        roomTypeFilter === "All" ? "" : roomTypeFilter
      }&searchQuery=${searchQuery || ""}`
    );
  };
  const fetchRooomTypeData = async () => {
    try {
      const data = await ApiReq.get("room-type");
      setRoomTypes(data.data.data);
    } catch (e) {
      console.log("fefwfew", e);
    }
  };
  const url = useLocation();

  const fetchData = async () => {
    let url = "/room?page=1";
    if (searchQueryParams) {
      url = url + `&search=${searchQueryParams}`;
    }
    if (roomTypeParams) {
      url = url + `&roomTypeId=${roomTypeParams}`;
    }

    try {
      const data = await ApiReq.get(url);
      console.log("fefwfew");
      setRoom(data.data.data);
    } catch (e) {
      console.log("fefwfew", e);
    }
  };
  useEffect(() => {
    fetchData();
  }, [searchQueryParams, roomTypeParams]);
  useEffect(() => {
    fetchRooomTypeData();
  }, []);
  return (
    <>
      <section className="bg-tertiary-light px-4 py-6 rounded-lg">
        <div className="container mx-auto flex gap-4 flex-wrap justify-between items-center">
          <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
            <label className="block text-sm font-medium mb-2 text-black">
              Room Type
            </label>
            <div className="relative">
              <select
                value={roomTypeFilter}
                onChange={handleRoomTypeChange}
                placeholder="Please select room type"
                className="w-full px-4 py-2 capitalize rounded leading-tightfocus:outline-none"
              >
                <option value={"All"}>{"all"}</option>;
                {roomType?.map((el) => {
                  return <option value={el?.id}>{el?.name}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
            <label className="block text-sm font-medium mb-2 text-black">
              Search
            </label>
            <input
              type="search"
              id="search"
              placeholder="Search..."
              className="w-full px-4 py-3 rounded leading-tight  focus:outline-none placeholder:text-black "
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </div>

          <button
            className="btn-primary"
            type="button"
            onClick={handleFilterClick}
          >
            Search
          </button>
        </div>
      </section>
      <div className="flex mt-20 p-10 justify-between flex-wrap">
        {room?.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </>
  );
};

export default Search;
