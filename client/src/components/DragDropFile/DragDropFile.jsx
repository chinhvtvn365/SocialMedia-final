import React, { useRef, useState } from "react";
import addImg from "../../img/addImg.png";
import "./DragDropFile.css";

const DragDropFile = ({ setImage, setReviewImg }) => {
  // drag state
  const [dragActive, setDragActive] = useState(false);

  // ref
  const inputRef = useRef(null);
  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);
        const file = e.dataTransfer.files[0];
        setImage(file);
        setReviewImg(URL.createObjectURL(file));
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
      const file = e.target.files[0];
      setImage(file);
      setReviewImg(URL.createObjectURL(file));
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };
  return (
    <div className="DragDropFile">
      <div className="DragDropFile-inner">
        <form
          className={`form-file-upload ${dragActive ? "drag-active" : ""}`}
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
          onClick={onButtonClick}
        >
          <div className="DragDropFile-upload-img">
            <div className="DragDropFile-upload-imgwrapper">
              <img src={addImg} alt="addImg" />
            </div>
          </div>

          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            accept="image/png, image/jpeg, image/jpg"
            multiple={true}
            onChange={handleChange}
          />
          <label id="label-file-upload" htmlFor="input-file-upload">
            <div className="DragDropFile-lable-span">
              {dragActive ? (
                <span>Drop Image or Video</span>
              ) : (
                <span>Add image/video</span>
              )}
              {!dragActive && <span>or drag and drop</span> }
            </div>
          </label>
          {dragActive && (
            <div
              id="drag-file-element"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DragDropFile;
