import { IoMdKey } from "react-icons/io";
import { FaCookieBite } from "react-icons/fa";
import { Divider } from "@nextui-org/react";
const Credentials = () => {
  return (
    <div className="flex h-7 items-center gap-2 rounded-full bg-zinc-800 px-2 py-1 text-xl">
      <div className="text-2xl text-yellow-500">
        <IoMdKey />
      </div>
      <Divider orientation="vertical" />
      <div>
        <FaCookieBite className="h-4 w-4" />
      </div>
    </div>
  );
};

export default Credentials;
