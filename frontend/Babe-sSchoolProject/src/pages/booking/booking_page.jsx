/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "../../../ag-theme-custom-dark.css";
import { useAuth } from "../../auth/auth_provider";
import paths from "../../routes/paths";
import {
  AddIcon,
  AddUserIcon,
  DeleteUserIcon,
  EditGameIcon,
  EditUserIcon,
} from "../../assets/icons/svg_icons";
import DeleteConfirmationBox from "../../components/delete_confirmation_box";
import withUser from "../../hocs/with_user";
import useUIStateStore from "../../store/ui_state_store";
import { popups_url } from "../../constants";

const BookingPage = (props) => {
  let auth = useAuth();
  const [bookings, setBookings] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const displayMode = useUIStateStore((state) => state.displayMode);
  const fetchData = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    console.log("create");
    navigate(paths.room_create);
  };

  const handleEdit = (id) => {
    console.log("edit", id);
    navigate(paths.getRoomEdit(id));
  };

  const handleDelete = async (id, name) => {
    console.log("delete", id, name);
    if (name === "admin" || name === auth.user.name) {
      return;
    }
    setDeleteId(id);
  };

  const rowActionsRenderer = (props) => {
    console.log("Row render", props.data);
    return (
      <div className="flex flex-row">
        <div
          className="grid-btn-error my-1 cursor-default"
          onClick={() => handleEdit(props.value)}
        >
          <EditGameIcon className="w-8 h-8" />
          <AddIcon className="w-8 h-8" />
        </div>
      </div>
    );
  };

  const modules = useMemo(() => [ClientSideRowModelModule], []);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "No",
        cellRenderer: (params) => params.node.rowIndex + 1,
        width: 70,
      },
      { headerName: "Check In Time", field: "room_name" },
      { headerName: "Check Out Time", field: "room_type" },
      {
        headerName: "Total",
        field: "active",
        width: 150,
      },
      { headerName: "Guest", field: "room_type" },

      {
        headerName: "",
        width: 150,
        autoHeight: true,
        field: "id",
        cellRenderer: rowActionsRenderer,
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  );

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  return (
    <div className="relative flex flex-col h-full">
      <div className="w-full flex flex-row px-6 py-0 lg:hidden place-content-center">
        <span className="text-3xl font-semibold capitalize ">Booking</span>
      </div>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 justify-between">
        <div className="flex flex-row">
          <div></div>
        </div>
        <div className=" py-2 hidden lg:flex place-content-center">
          <span className="px-2 text-3xl font-semibold capitalize ">
            Booking
          </span>
        </div>
      </div>
      <div className="p-2 w-full h-[calc(100vh-170px)]">
        <AgGridReact
          className={
            displayMode == "dark"
              ? "ag-theme-alpine-auto-dark"
              : "ag-theme-alpine"
          }
          animateRows="true"
          modules={modules}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={"single"}
          rowData={bookings}
          enableCellTextSelection={true}
          onGridReady={onGridReady}
          rowModelType="clientSide"
          paginationPageSize={100}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default withUser(BookingPage);
