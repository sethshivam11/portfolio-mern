import React, { ReactElement } from "react";
import logo from "../assets/logo.jpeg";
const ImageView: React.FC<{ viewImage: boolean }> = ({ viewImage }) => {
  return (
    <div className="h-20 w-20">
      <img src={logo} alt="" />
    </div>
  );
};

export default ImageView;
