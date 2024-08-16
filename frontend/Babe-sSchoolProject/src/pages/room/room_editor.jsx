import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../../auth/auth_provider";
import { ApiReq } from "../../hooks/apiService";
const RoomEditor = (props) => {
  const { isCreateForm, initialData, formSchema, handleSave, handleBack } =
    props;
  const [roomTypes, setRoomTypes] = useState([]);

  const [room, setRoom] = useState({
    room_name: initialData.room_name,
    room_type_id: initialData.room_type_id,
    status: initialData.status,
  });
  const [images, setImages] = useState([]);
  const auth = useAuth();

  console.log("Initial Data...", initialData);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm({
    defaultValues: {
      room_name: initialData.room_name,
      room_type_id: initialData.room_type_id,
      status: initialData.status,
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    images.forEach((image) => formData.append("images", image));
    handleSave(formData, initialData);
  };

  const handleReset = () => {
    reset(room);
  };

  const handleImageChange = (event) => {
    setImages([...event.target.files]);
  };
  const fetchData = async () => {
    try {
      const data = await ApiReq.get("/room-type");
      console.log("fefwfew");
      setRoomTypes(data.data.data);
    } catch (e) {
      console.log("fefwfew", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setValue("room_name", initialData.room_name);
    setValue("room_type_id", initialData.room_type_id);
    setValue("status", initialData.status);
  }, [initialData, setValue]);

  const ErrorMessage = (props) => {
    const { field } = props;
    if (field)
      return <span className="text-sm text-red-500 mx-2">{field.message}</span>;
    else return <></>;
  };

  const types = [
    { name: "Watch Youtube", value: "WatchYoutube" },
    { name: "Other Social", value: "OtherSocial" },
    { name: "Life", value: "Life" },
    { name: "Lock", value: "Lock" },
  ];

  return (
    <div>
      <div className="w-full flex flex-wrap p-1 pb-2"></div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <div className="flex flex-nowrap">
            <div className="w-48 p-2 m-2 label">Room Name</div>
            <div className="p-2 m-2 flex flex-col">
              <input
                type="text"
                name="room_name"
                placeholder="Room Name"
                className="w-64  input input-error input-md"
                {...register("room_name", { required: true })}
              />
              <ErrorMessage field={errors.room_name} />
            </div>
          </div>
          <div className="flex flex-nowrap">
            <div className="w-48 p-2 m-2 label">Room Type</div>
            <div className="p-2 m-2 flex flex-col">
              <Controller
                control={control}
                name="room_type_id"
                rules={{ required: "Please choose a type" }}
                render={({ field }) => (
                  <select {...field} className="select select-error w-64">
                    <option value="">Select a type</option>
                    {roomTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.type && (
                <span className="text-red-500">{errors.type.message}</span>
              )}
            </div>
          </div>

          <div className="flex flex-nowrap">
            <div className="w-48 p-2 m-2 label">Images</div>
            <div className="p-2 m-2 flex flex-col">
              <input type="file" multiple onChange={handleImageChange} />
            </div>
          </div>
          <div className="flex flex-nowrap">
            <div className="w-48 p-2 mx-2 label">Status</div>
            <div className="p-2 m-2 flex flex-col">
              <input
                {...register("status")}
                type="checkbox"
                name="status"
                placeholder="Status"
                className="w-14 h-6"
              />
            </div>
          </div>

          <div className="flex flex-nowrap p-3">
            <button
              aria-label="back"
              onClick={handleBack}
              className="mx-1 lg:mx-6 py-3 h-12 w-24 btn btn-outline"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!(isDirty && isValid)}
              className="mx-1 lg:mx-6  py-3 h-12 w-24 btn btn-outline"
            >
              Save
            </button>
            <button
              disabled={!isDirty}
              className="mx-1 lg:mx-6 py-3 h-12 w-24 btn-outline btn btn-error"
              onClick={handleReset}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RoomEditor;
