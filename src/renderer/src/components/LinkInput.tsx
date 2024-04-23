import { Button } from "@nextui-org/react";
import {
  useCookies,
  useCredentials,
  useFormat,
} from "@renderer/stores/credentials";
import { useEventStore } from "@renderer/stores/events";
import { usePlaylistStore } from "@renderer/stores/playlist";
import { linkRegex } from "@renderer/utils/constants";
import { useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { toast } from "sonner";
import Credentials from "./Credentials";
import QualitySelector from "./QualitySelector";

import { VscLoading } from "react-icons/vsc";

const LinkInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false); // State to handle loading feedback
  const { credentials } = useCredentials();
  const { cookiePath, cookies } = useCookies();
  const { format } = useFormat();
  const { setLoading: setPlaylistLoading } = usePlaylistStore();
  const { event: globalEvent, reset } = useEventStore();

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

  // TODO: fix this shit
  // this was wrapped in a use-callback and for some reason prevent the the state from updating within the function TODO: fix later
  // const handleTurboClick = () => {
  //   setTurboMode((current) => !current);
  //   window.electron.ipcRenderer.invoke("turbo-mode-update", !turboMode); // hand to set this to the opposite ?
  // };

  useEffect(() => {
    if (globalEvent) {
      const { type } = globalEvent;
      if (type === "DOWNLOAD_PLAYLIST") {
        const payload = globalEvent.payload as { items: Array<string> };
        console.log(globalEvent);
        handleDownload(`--playlist-items ${payload.items.join(",")}`, true);
        reset();
      }
    }
  }, [globalEvent]);

  const handleDownload = async (command?: string, ignorePlaylist = false) => {
    console.log(credentials, cookiePath, cookies);
    console.log(link);

    // Resetting lastIndex for a global regex
    linkRegex.lastIndex = 0; // Add this line if the regex is global

    if (linkRegex.test(link)) {
      setLoading(true);
      inputRef.current?.blur();

      const data = await window.api.downloads.start({
        url: link,
        cookies,
        credentials,
        format,
        command,
        ignorePlaylist,
      });

      console.log(data);

      if (data.playlist && data.loading) {
        setLoading(false);
        setPlaylistLoading(true);
        toast.loading("Fetching playlist details...", {
          duration: 5000,
        });
      }

      if (data.error) {
        setLoading(false);
        toast.error("Something went wrong!", {
          description: data.error,
        });
      }

      if (!data.playlist && !data.loading) {
        setLink("");
        setLoading(false);
      }
    } else {
      console.log("Failed regex:", linkRegex.test(link)); // Additional log for debugging
      toast.error("Invalid URL", {
        description: "The URL entered does not match the expected format.",
      });
    }
  };

  return (
    <div className="inline-flex min-h-16 min-w-[1000px] items-center gap-2 rounded-xl border-[1px] border-white/20 bg-zinc-900/70 px-2 backdrop-blur-lg">
      {/* <Tooltip content={turboMode ? "Turbo Mode On" : "Turbo Mode Off"}>
        <div
          onClick={handleTurboClick}
          className="cursor-pointer text-3xl text-primary"
        >
          {turboMode ? <HiLightningBolt /> : <HiOutlineLightningBolt />}
        </div>
      </Tooltip> */}
      <input
        ref={inputRef}
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Please enter a URL and press enter!"
        type="text"
        className="h-16 flex-grow border-none bg-transparent px-2 font-roboto outline-none"
      />
      <Credentials />
      <QualitySelector />
      <Button
        onClick={() => handleDownload()}
        isIconOnly
        className="max-w-8 cursor-pointer rounded-xl bg-zinc-800 p-2 text-3xl text-primary transition-all hover:bg-zinc-800/40"
      >
        {loading ? (
          <VscLoading className="animate-spin" />
        ) : (
          <MdOutlineFileDownload />
        )}
      </Button>
    </div>
  );
};

export default LinkInput;
