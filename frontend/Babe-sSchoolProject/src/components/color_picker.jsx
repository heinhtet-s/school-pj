import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = (props) => {
  const { value, onChange, show } = props;

  const [displayColorPicker, setDisplayColorPicker] = useState(show);
  const [color, setColor] = useState(value);

  useEffect(() => {
    setColor(value);
  }, [value]);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    onChange(color.hex);
  };

  return (
    <div className="relative">
      <div className="p-2 bg-white rounded-md border-primary border-[1px] cursor-pointer inline-block shadow-sm" onClick={handleClick}>
        <div className="w-14 h-6 rounded-sm text-center" style={{ background: color }}>
          <span className="invert text-xs w-full">{color}</span>
        </div>
      </div>
      {displayColorPicker && (
        <div className="absolute z-10">
          <div className="fixed top-0 right-0 bottom-0 left-0" onClick={handleClose} />
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
