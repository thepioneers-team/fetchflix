import React from "react";
import DownloadDir from "./DownloadDir";

const OptionsBar = () => {
  return (
    <div className="mt-3 flex w-full items-center justify-end gap-3">
      <DownloadDir />
    </div>
  );
};

export default OptionsBar;
