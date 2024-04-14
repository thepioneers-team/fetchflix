import { Button } from "@nextui-org/react";
import {
  useCookies,
  useCredentials,
  useFormat,
} from "@renderer/stores/credentials";
import { linkRegex } from "@renderer/utils/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { HiLightningBolt, HiOutlineLightningBolt } from "react-icons/hi";
import { MdOutlineFileDownload } from "react-icons/md";
import Credentials from "./Credentials";
import QualitySelector from "./QualitySelector";
import { toast } from "sonner";
import { usePlaylistStore } from "@renderer/stores/playlist";

const LinkInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [turboMode, setTurboMode] = useState(false);
  const [link, setLink] = useState("");
  const { credentials } = useCredentials();
  const { cookiePath, cookies } = useCookies();
  const { format } = useFormat();
  const { setPlaylists } = usePlaylistStore();

  useEffect(() => {
    const handleKeypress = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        document.activeElement === inputRef.current
      ) {
        handleDownload();
      }
    };

    document.addEventListener("keypress", handleKeypress);

    return () => {
      document.removeEventListener("keypress", handleKeypress);
    };
  });

  const handleTurboClick = useCallback(() => {
    setTurboMode((current) => {
      // tell the electron process
      return !current;
    });
  }, []);

  const handleDownload = async () => {
    console.log(credentials);
    console.log(cookiePath, cookies);

    if (linkRegex.test(link)) {
      inputRef.current?.blur();
      setLink("");

      const data = await window.api.downloads.start({
        url: link,
        cookies,
        credentials,
        format,
      });

      if (data.entries && !data.error) setPlaylists(data.entries);

      if (data.error) {
        toast.error("Something went wrong!", {
          description: data.error,
        });
      }
    }
  };

  return (
    <div className="inline-flex min-h-16 min-w-[1000px] items-center gap-2 rounded-xl border-[1px] border-white/20 bg-zinc-900/70 px-2 backdrop-blur-lg">
      <div
        onClick={handleTurboClick}
        className="cursor-pointer text-3xl text-primary"
      >
        {turboMode ? <HiLightningBolt /> : <HiOutlineLightningBolt />}
      </div>
      <input
        ref={inputRef}
        value={link}
        onChange={(e) => {
          setLink(e.target.value);
        }}
        placeholder="Please enter a url and press enter!"
        type="text"
        className="h-16 flex-grow border-none bg-transparent px-2 font-roboto outline-none"
      />
      <Credentials />
      <QualitySelector />
      <Button
        onClick={handleDownload}
        isIconOnly
        className="max-w-8 cursor-pointer rounded-xl bg-zinc-800 p-2 text-3xl text-primary transition-all hover:bg-zinc-800/40 "
      >
        <MdOutlineFileDownload />
      </Button>
    </div>
  );
};

export default LinkInput;
