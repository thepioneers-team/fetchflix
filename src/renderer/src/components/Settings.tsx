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

import { Tab, Tabs } from "@nextui-org/react";
import Advanced from "./settings/advanced";
import General from "./settings/general";
import Networking from "./settings/networking";
import PostProcessing from "./settings/post-processing";

export default function Settings() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const tabs = [
    {
      title: "General",
      component: General,
    },
    {
      title: "Networking",
      component: Networking,
    },
    {
      title: "Post Processing",
      component: PostProcessing,
    },
    {
      title: "Advanced",
      component: Advanced,
    },
  ];

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
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        classNames={{
          body: "py-6",
          base: "bg-[#212121] max-w-[800px] max-h-[600px] h-full text-foreground-50",
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
              <ModalBody className="overflow-y-scroll">
                <Tabs color="primary" aria-label="Options">
                  {tabs.map((tab) => (
                    <Tab key={tab.title.toLowerCase()} title={tab.title}>
                      <tab.component />
                    </Tab>
                  ))}
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  className="bg-primary/80 font-medium text-black"
                  onPress={onClose}
                >
                  Looks good, save it!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
