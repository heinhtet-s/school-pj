/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef, createRef } from "react";
import { SketchPicker } from "react-color";
import Modal from "../components/modal";

const modalRootEl = document.getElementById("modal-root");

const ColorPickerAgGrid = forwardRef((props, ref) => {
  const { value, onChange, api, show } = props;

  const [displayColorPicker, setDisplayColorPicker] = useState(show);
  const [color, setColor] = useState(value);

  const wrapperRef = createRef();

  useEffect(() => {
    setColor(value);
  }, [value]);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
    api.stopEditing();
  };

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    onChange(color.hex);
  };

  return (
    <div className="w-full">
      <div className="p-[1px] w-full bg-white rounded-md cursor-pointer flex justify-center shadow-sm">
        <div className="w-14 h-9 rounded-sm text-center flex items-center" style={{ background: value }}>
          <span className="invert text-xs w-full">{value}</span>
        </div>
      </div>
      {displayColorPicker && (
        <Modal>
          <div className="absolute z-10">
            <div className="fixed top-0 right-0 bottom-0 left-0" onClick={handleClose} />
            <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </Modal>
      )}
    </div>
  );
});

export default ColorPickerAgGrid;
