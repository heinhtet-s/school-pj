import React, { useState, useRef, useEffect } from "react";
import { CloseIcon } from "../assets/icons/svg_icons";

const transparentGif_1x1 = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

const PicturePicker = (props) => {
  const { url, onChange, value } = props;
  // console.log("Picker url...", url);
  const fileInputRef = useRef();
  const imgRef = useRef();
  const [modified, setModified] = useState(false);
  const u = "https://firebasestorage.googleapis.com/v0/b/shwe-win.appspot.com/o/banks%2Fkbz_pay.png?alt=media&token=05dbf97f-219d-4b49-aed8-3dbc035b4961";
  const [initialPicture, setInitialPicture] = useState(url);

  useEffect(() => {
    if (!value) {
      handleRemove();
    }
    if (initialPicture) {
      console.log("initial..");
      imgRef.current.src = initialPicture;
    }
  }, [value, initialPicture]);

  const handleFileChange = (e) => {
    console.log("handleFileChange");
    setInitialPicture("");

    if (e.target.files.length > 0) {
      console.log("Target...", e.target.files[0]);
      imgRef.current.src = URL.createObjectURL(e.target.files[0]);

      setModified(true);
      if (onChange) {
        onChange(e.target.files[0]);
      }
    }
  };

  const handleRemove = () => {
    //console.log("close");
    if (url) imgRef.current.src = url;
    else {
      imgRef.current.src = transparentGif_1x1;
      //imgRef.current.removeAttribute("src");
    }
    fileInputRef.current.value = "";

    setModified(false);
    if (onChange) {
      onChange("");
    }
  };

  const handleSelect = () => {
    console.log("Select");
    fileInputRef.current.click();
  };

  const handleImageError = (e) => {
    e.target.src = transparentGif_1x1;
  };

  return (
    <div>
      <input
        id="avatar"
        name="avatar"
        ref={fileInputRef}
        type="file"
        multiple={false}
        className="hidden"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      ></input>
      <div className="relative h-32 w-32 bg-gray-200 rounded-xl">
        <img src={url} ref={imgRef} className="rounded-xl p-2  w-full h-full" alt="" onError={handleImageError}></img>
        {modified && (
          <div className="absolute w-full flex items-center justify-center left-0 bottom-2 cursor-pointer" onClick={handleRemove}>
            <CloseIcon />
          </div>
        )}
        {!modified && (
          <div className="absolute top-[35%] left-0 cursor-pointer text-center opacity-60 bg-gray-200 " onClick={handleSelect}>
            Drag & Drop files or <span className="underline">Browse</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PicturePicker;
