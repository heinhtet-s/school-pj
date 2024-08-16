import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import withUser from "../../hocs/with_user";
import paths from "../../routes/paths";
import { useAuth } from "../../auth/auth_provider";
import LoadingIndicator from "../../components/loading_indicator";
import { popup_by_id_url, upsert_popup_url } from "../../constants";
import RoomEditor from "./room_editor";
import { ApiReq } from "../../hooks/apiService";

const initialData = {
  room_name: "",
  room_type_id: "",
  status: true,
};

const UpsertRoomPage = (props) => {
  const { id: roomId } = useParams();
  const auth = useAuth();
  const token = localStorage.getItem("auth_token");

  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [room, setRoom] = useState(initialData);

  const loadRoom = async () => {
    try {
      const data = await ApiReq.get(`room/${roomId}`);
      console.log(
        {
          room_name: data?.data?.data?.room_name,
          room_type_id: data?.data?.data?.room_type_id,
          status: data?.data?.data?.status,
        },
        "ffewfw"
      );
      setRoom({
        room_name: data?.data?.data?.room_name,
        room_type_id: data?.data?.data?.room_type_id,
        status: data?.data?.data?.status,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (roomId) {
      const loadRoomTemp = async () => loadRoom();
      loadRoomTemp();
    }
  }, []);

  const handleSave = async (data) => {
    setProcessing(true);
    if (roomId) {
      try {
        await ApiReq.put(`/room/${roomId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
        navigate(paths.room);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log(data, "formdata");
      try {
        await ApiReq.post("/room", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
        navigate(paths.room);
      } catch (e) {
        console.log(e);
      }
    }
    // const popup = {
    //   room_name: data.room_name,
    //   room_type: data.room_type,
    //   active: data.active,
    // };
    // await upsertData(popupId,popup, upsert_popup_url);
  };

  const handleBack = () => {
    navigate(paths.room);
  };

  return (
    <div className="p-2 flex flex-col">
      <div className="px-4 text-2xl font-bold">Room Informations</div>
      <RoomEditor
        isCreateForm={roomId ? false : true}
        initialData={room}
        formSchema={{}}
        handleSave={handleSave}
        handleBack={handleBack}
      />
      <LoadingIndicator loading={processing} color="#4f46e5" />
    </div>
  );
};

export default withUser(UpsertRoomPage);
