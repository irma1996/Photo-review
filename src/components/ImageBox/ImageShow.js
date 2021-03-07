import React from "react";

const ImageLightBox = ({ chooseImg, setChooseImg }) => {
  const handelClick = e => {
    if (e.target.classList.contains("show-img")) {
      setChooseImg(null);
    }
  };
  return (
    <div className="show-img" onClick={handelClick}>
      <img src={chooseImg} alt="popup" />
    </div>
  );
};
export default ImageLightBox;
