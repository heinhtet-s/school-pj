/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import withUser from "../../hocs/with_user";
import paths from "../../routes/paths";
import { useAuth } from "../../auth/auth_provider";
import LoadingIndicator from "../../components/loading_indicator";
import RoomTypeEditor from "./room_type_editor";
import { ApiReq } from "../../hooks/apiService";

const initialData = {
  name: "",
  description: "",
  price_per_night: "",
};

const UpsertRoomTypePage = (props) => {
  const { id: roomTypeId } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [roomType, setRoomType] = useState(initialData);

  const loadRoomType = async () => {
    try {
      const data = await ApiReq.get(`room-type/${roomTypeId}`);
      console.log(data);
      setRoomType(data.data.data);
    } catch (e) {}
  };

  useEffect(() => {
    if (roomTypeId) {
      console.log("gerfe");
      const loadRoomTypeTemp = async () => loadRoomType();
      loadRoomTypeTemp();
    }
  }, []);

  const handleSave = async (data) => {
    setProcessing(true);
    if (roomTypeId) {
      try {
        await ApiReq.put(`/room-type/${roomTypeId}`, {
          ...data,
          price_per_night: +data.price_per_night,
        });
        navigate(paths.room_type);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await ApiReq.post("/room-type", {
          ...data,
          price_per_night: +data.price_per_night,
        });
        navigate(paths.room_type);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleBack = () => {
    navigate(paths.room_type);
  };

  return (
    <div className="p-2 flex flex-col">
      <div className="px-4 text-2xl font-bold">Room Type Informations</div>
      <RoomTypeEditor
        isCreateForm={roomTypeId ? false : true}
        initialData={roomType}
        formSchema={{}}
        handleSave={handleSave}
        handleBack={handleBack}
      />
      <LoadingIndicator loading={processing} color="#4f46e5" />
    </div>
  );
};

export default withUser(UpsertRoomTypePage);
