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
import { usePlaylistStore } from "@renderer/stores/playlist";
import { useEffect, useState } from "react";

// TODO: send command to localStorage if clicked on okay else cancel
// TODO: make sure that if the url is detected as playlist a modal shows up with a spinner
// TODO: check if there is an issue with the check state of the switch and make sure it actually adds it to the list

export default function PlaylistManager() {
  const [entries, setEntries] = useState<Array<string>>([]);
  const [opened, setOpened] = useState<boolean>(false);
  const { playlist, reset } = usePlaylistStore();

  useEffect(() => {
    if (playlist) {
      setOpened(true);
      playlist.map((_, i) => setEntries((prev) => [...prev, i.toString()]));
    }

    return () => {
      setEntries([]);
    };
  }, [playlist]);

  if (!playlist) return;

  const handleOpenChange = (e: boolean) => {
    reset();
    setOpened(e);
  };

  const handleCheckChange = (index: number) => {
    const indexStr = index.toString();
    if (entries.includes(indexStr)) {
      setEntries(entries.filter((x) => x !== indexStr));
    } else {
      setEntries((prev) => [...prev, indexStr]);
    }

    console.log(entries);
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
                {playlist.map((entry, i) => (
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
                        onValueChange={() => handleCheckChange(i)}
                        aria-label={`Download ${i}`}
                      />
                    </div>
                  </div>
                ))}
              </ScrollShadow>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" className="text-black" onPress={onClose}>
                Download Selected
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
