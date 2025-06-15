import React from "react";
import { getInitials } from "../../utils/helper";

const CharAvatar = ({ name, width, height, style }) => {
  return (
    <div
      style={{
        width,
        height,
        ...style,
      }}
      className="flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-medium text-sm  border-blue-200 "
    >
      {getInitials(name || "")}
    </div>
  );
};

export default CharAvatar;
