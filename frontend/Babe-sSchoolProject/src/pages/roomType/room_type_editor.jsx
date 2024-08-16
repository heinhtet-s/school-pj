import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../auth/auth_provider";
import { userRoles } from "../../constants";
const RoomTypeEditor = (props) => {
  const { isCreateForm, initialData, formSchema, handleSave, handleBack } =
    props;
  const [roomType, setRoomType] = useState({
    name: initialData.name,
    description: initialData.description,
    price_per_night: initialData.price_per_night,
  });
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
      name: initialData.name,
      description: initialData.description,
      price_per_night: initialData.price_per_night,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    handleSave(data, initialData);
  };

  const handleReset = () => {
    reset(roomType);
  };

  const fetchData = useCallback(async () => {
    // const response = await fetchUserById();
    // setVehicleClasses(response.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    setValue("name", initialData.name);
    setValue("description", initialData.description);
    setValue("price_per_night", initialData.price_per_night);
  }, [initialData, setValue]);

  const ErrorMessage = (props) => {
    const { field } = props;
    if (field)
      return <span className="text-sm text-red-500 mx-2">{field.message}</span>;
    else return <></>;
  };

  return (
    <div>
      <div className="w-full flex flex-wrap p-1 pb-2"></div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <div className="flex flex-nowrap">
            <div className="w-48 p-2 m-2 label">Name</div>
            <div className="p-2 m-2 flex flex-col">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-64  input input-error input-md"
                {...register("name", { required: true })}
              />
              <ErrorMessage field={errors.name} />
            </div>
          </div>
          <div className="flex flex-nowrap">
            <div className="w-48 p-2 m-2 label">Description</div>
            <div className="p-2 m-2 flex flex-col">
              <input
                type="text"
                name="description"
                placeholder="Description"
                className="w-64  input input-error input-md"
                {...register("description")}
              />
            </div>
          </div>
          <div className="flex flex-nowrap">
            <div className="w-48 p-2 m-2 label">Price per Night</div>
            <div className="p-2 m-2 flex flex-col">
              <input
                type="number"
                name="price_per_night"
                placeholder=""
                className="w-64  input input-error input-md"
                {...register("price_per_night", { required: true })}
              />
              <ErrorMessage field={errors.fprice_per_night} />
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
              className="mx-1 lg:mx-6 py-3 h-12 w-24 btn btn-outline btn-error"
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

export default RoomTypeEditor;
