import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { IoSettingsOutline } from "react-icons/io5";

export default function Settings() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
        className="cursor-pointer rounded-xl bg-zinc-800 text-primary transition-all hover:bg-zinc-800/40 "
      >
        <IoSettingsOutline className="h-4 w-4" />
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        classNames={{
          body: "py-6",
          base: "bg-zinc-800 text-foreground-50",
          header: "border-b-[1px] border-[#313131]",
          footer: "border-t-[1px] border-[#313131]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        onOpenChange={onOpenChange}
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
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Settings
              </ModalHeader>
              <ModalBody>
                <p>add tabs</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
