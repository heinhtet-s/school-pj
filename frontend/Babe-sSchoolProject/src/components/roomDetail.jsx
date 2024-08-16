"use client";

// import { MdOutlineCleaningServices } from "react-icons/md";
// import { LiaFireExtinguisherSolid } from "react-icons/lia";
// import { AiOutlineMedicineBox } from "react-icons/ai";
// import { GiSmokeBomb } from "react-icons/gi";
import { useEffect, useState } from "react";

import HotelPhotoGallery from "./HotelPhotoGallery";
import BookRoomCta from "./BookRoomCta";
import { useNavigate, useParams } from "react-router-dom";
import { ApiReq } from "../hooks/apiService";
// import RoomReview from "@/components/RoomReview/RoomReview";

const RoomDetails = () => {
  const { id: slug } = useParams();
  const [room, setRoom] = useState();
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);
  const navigate = useNavigate();
  const calcMinCheckoutDate = () => {
    if (checkinDate) {
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return null;
  };
  const fetchRooomTypeData = async () => {
    try {
      const data = await ApiReq.get(`room/${slug}`);
      setRoom(data.data.data);
    } catch (e) {
      console.log("fefwfew", e);
    }
  };
  useEffect(() => {
    fetchRooomTypeData();
  }, []);
  const handleBookNowClick = async () => {
    if (!checkinDate || !checkoutDate)
      return alert("Please provide checkin / checkout date");

    if (checkinDate > checkoutDate)
      return alert("Please choose a valid checkin period");
    console.log(calcNumDays());
    const user_id = localStorage.getItem("user");

    try {
      await ApiReq.post("booking", {
        check_in: checkinDate,
        check_out: checkoutDate,
        total: room?.room_type?.price_per_night * calcNumDays(),
        status: "Pending",
        guest_id: JSON.parse(user_id || "").guest?.id,
        room_ids: [room?.id],
      });
      alert("Successfully created booking");
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
      alert("An error occured");
    }
  };

  const calcNumDays = () => {
    if (!checkinDate || !checkoutDate) return;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  return (
    <div>
      <HotelPhotoGallery photos={room?.room_images} />

      <div className="container mx-auto mt-20">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-8 md:w-full">
            <div>
              <h2 className="font-bold text-left text-lg md:text-2xl">
                {room?.room_name + " | " + room?.room_type?.name}
              </h2>

              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Description</h2>
                <p>{room?.room_type?.description}</p>
              </div>

              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Safety And Hygiene</h2>
                <div className="grid grid-cols-2">
                  <div className="flex items-center my-1 md:my-0">
                    {/* <MdOutlineCleaningServices /> */}
                    <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    {/* <LiaFireExtinguisherSolid /> */}
                    <p className="ml-2 md:text-base text-xs">
                      Fire Extinguishers
                    </p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    {/* <AiOutlineMedicineBox /> */}
                    <p className="ml-2 md:text-base text-xs">
                      Disinfections and Sterilizations
                    </p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    {/* <GiSmokeBomb /> */}
                    <p className="ml-2 md:text-base text-xs">Smoke Detectors</p>
                  </div>
                </div>
              </div>

              <div className="shadow dark:shadow-white rounded-lg p-6">
                <div className="items-center mb-4">
                  <p className="md:text-lg font-semibold">Customer Reviews</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* <RoomReview roomId={room._id} /> */}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto">
            <BookRoomCta
              discount={0}
              price={room?.room_type?.price_per_night}
              specialNote={""}
              checkinDate={checkinDate}
              setCheckinDate={setCheckinDate}
              checkoutDate={checkoutDate}
              setCheckoutDate={setCheckoutDate}
              calcMinCheckoutDate={calcMinCheckoutDate}
              adults={adults}
              noOfChildren={noOfChildren}
              setAdults={setAdults}
              setNoOfChildren={setNoOfChildren}
              isBooked={false}
              handleBookNowClick={handleBookNowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
