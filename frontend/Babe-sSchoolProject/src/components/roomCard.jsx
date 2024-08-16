import { FC } from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const naviagte = useNavigate();
  return (
    <div
      onClick={() => naviagte(`/room/${room.id}`)}
      className="rounded-xl w-72 mb-10 mx-auto md:mx-0 overflow-hidden text-black"
    >
      <div className="h-60 overflow-hidden">
        <img
          src={"http://localhost:3001/rooms/" + room?.room_images?.[0]?.url}
          width={250}
          height={250}
          className="img scale-animation"
        />
      </div>

      <div className="p-4 bg-white">
        <div className="flex justify-between text-xl font-semibold">
          <p>{room?.room_name}</p>
          <p>$ {room?.room_type?.price_per_night}</p>
        </div>
        <p className="pt-2 text-xs">{room?.room_type?.name} Room</p>

        <p className="pt-3 pb-6">
          {room?.room_type?.description?.slice(1, 100)}...
        </p>
        <p
          // href={`/rooms/${slug.current}`}
          className="bg-primary inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500"
        >
          {"BOOK NOW"}
        </p>
      </div>
    </div>
  );
};

export default RoomCard;
