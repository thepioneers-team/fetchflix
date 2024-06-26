import DownloadDir from "./DownloadDir";
import Settings from "./Settings";

const OptionsBar = () => {
  return (
    <div className="z-10 mt-3 flex w-full items-center justify-end gap-3">
      <DownloadDir />
      <Settings />
    </div>
  );
};

export default OptionsBar;
