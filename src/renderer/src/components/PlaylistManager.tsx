import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Switch,
} from "@nextui-org/react";
import { useEventStore } from "@renderer/stores/events";
import { usePlaylistStore } from "@renderer/stores/playlist";
import { Playlist, PlaylistDetails } from "@renderer/types";
import { useState } from "react";
import { toast } from "sonner";

export default function PlaylistManager() {
  const [entries, setEntries] = useState<Array<string>>([]);
  const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
  const [opened, setOpened] = useState<boolean>(false);
  const { setLoading } = usePlaylistStore();
  const { setEvent } = useEventStore();

  const handlePlaylistDetails = (_, args: PlaylistDetails) => {
    toast.dismiss();
    setOpened(true);

    setPlaylists(args.playlists);
    setEntries(args.playlists.map((_, i) => `${i + 1}`));
  };

  window.electron.ipcRenderer.on("playlist-details", handlePlaylistDetails);

  const handleOpenChange = (e: boolean) => {
    setOpened(e);
    if (!e) {
      setLoading(false);
    }
  };

  const handleDownload = (onClose: () => void) => {
    setEvent({
      type: "DOWNLOAD_PLAYLIST",
      payload: {
        items: entries,
      },
    });
    onClose();
  };

  const handleCheckChange = (index: number) => {
    const indexStr = index.toString();

    let newArray: string[];
    if (entries.includes(indexStr)) {
      newArray = entries.filter((x) => x !== indexStr);
    } else {
      newArray = [...entries, indexStr];
    }

    setEntries([...new Set<string>(newArray)]); // Type of Set explicitly set to string
  };

  return (
    <Modal
      backdrop="blur"
      classNames={{
        body: "py-6",
        base: "bg-zinc-800 max-w-[800px] max-h-[600px] h-full text-foreground-50",
        header: "border-b-[1px] border-[#313131]",
        footer: "border-t-[1px] border-[#313131]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      isOpen={opened}
      onOpenChange={handleOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Modal Title
            </ModalHeader>
            <ModalBody className="overflow-y-scroll">
              <ScrollShadow className="h-auto w-auto space-y-3">
                {playlists.map((entry, i) => (
                  <div className="flex items-center gap-2" key={i}>
                    <img
                      src={entry.thumbnail}
                      className="h-20 w-28 rounded-md object-cover"
                    />
                    <div className="ml-2 inline-flex space-x-4">
                      <h2 className="font-medium">{entry.title}</h2>
                      <Switch
                        defaultSelected
                        color="default"
                        onValueChange={() => handleCheckChange(i + 1)}
                        aria-label={`Download ${i}`}
                      />
                    </div>
                  </div>
                ))}
              </ScrollShadow>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                className="text-black"
                onPress={() => handleDownload(onClose)}
              >
                Download Selected
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
