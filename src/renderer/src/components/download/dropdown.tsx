import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Download } from "@renderer/types/DownloadTable";
import { FaTrash } from "react-icons/fa";

import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  IoCopyOutline,
  IoOpenOutline,
  IoTerminalOutline,
} from "react-icons/io5";

import { IoMdClose } from "react-icons/io";
import { RxResume } from "react-icons/rx";
import { IoRemoveOutline } from "react-icons/io5";

import { useLogs } from "@renderer/stores/logs";
import { ReactNode } from "react";
import { useDownload } from "@renderer/stores/download";

import { IoPauseCircleOutline } from "react-icons/io5";

const iconClasses = "w-4 h-4 pointer-events-none flex-shrink-0";

interface Props {
  item: Download;
}

export default function DownloadDropdownOptions({ item }: Props) {
  const { setData } = useLogs();
  const { setEvent } = useDownload();

  const isProcessFinished =
    item.status === "FINISHED" || item.status === "CANCELED";

  const openLogs = () => setData({ id: item.id, logs: [] });
  const openExternalURL = async (href: string) => {
    await window.api.app.openExternalURL(href);
  };

  console.log(item.status);

  const renderActionButton = () => {
    let button: ReactNode;

    switch (item.status) {
      case "ACTIVE":
        button = (
          <DropdownItem
            key="cancel"
            className="text-danger"
            color="danger"
            onClick={() =>
              window.electron.ipcRenderer.invoke("cancel-install", item.id)
            }
            startContent={<IoMdClose className={iconClasses} />}
          >
            Cancel Installation
          </DropdownItem>
        );
        break;
      case "FINISHED":
        button = (
          <DropdownItem
            key="delete-file"
            className="text-danger"
            color="danger"
            isDisabled
            onClick={() =>
              window.electron.ipcRenderer.invoke("delete-file", item.id)
            }
            startContent={<FaTrash className={iconClasses} />}
          >
            Delete File
          </DropdownItem>
        );
        break;
      case "INACTIVE":
        button = (
          <DropdownItem
            key="resume"
            className="text-danger"
            color="primary"
            onClick={() =>
              window.electron.ipcRenderer.invoke("resume-install", item.id)
            }
            startContent={<RxResume className={iconClasses} />}
          >
            Resume
          </DropdownItem>
        );
        break;
      case "PAUSED":
        button = (
          <DropdownItem
            key="resume"
            className="text-danger"
            color="primary"
            onClick={() =>
              window.electron.ipcRenderer.invoke("resume-install", item.id)
            }
            startContent={<RxResume className={iconClasses} />}
          >
            Resume
          </DropdownItem>
        );
        break;
      case "CANCELED":
        button = (
          <DropdownItem
            key="cancel"
            className="text-danger"
            isDisabled
            color="danger"
            startContent={<IoMdClose className={iconClasses} />}
          >
            Cancel Installation
          </DropdownItem>
        );
        break;
    }

    return button;
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <HiOutlineDotsVertical />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="open-link"
          onClick={() => openExternalURL(item.url)}
          startContent={<IoOpenOutline className={iconClasses} />}
        >
          Open Link
        </DropdownItem>
        <DropdownItem
          key="copy-link"
          showDivider
          onClick={() => navigator.clipboard.writeText(item.url)}
          startContent={<IoCopyOutline className={iconClasses} />}
        >
          Copy Link
        </DropdownItem>
        <DropdownItem
          key="remove-from-app"
          isDisabled={!isProcessFinished}
          onClick={() =>
            setEvent({ type: "REMOVE_DOWNLOAD", payload: { id: item.id } })
          }
          startContent={<IoRemoveOutline className={iconClasses} />}
        >
          Remove from app (keep file)
        </DropdownItem>
        <DropdownItem
          key="pause-install"
          isDisabled={item.status !== "ACTIVE"}
          onClick={() =>
            window.electron.ipcRenderer.invoke("pause-install", item.id)
          }
          startContent={<IoPauseCircleOutline className={iconClasses} />}
        >
          Pause Download
        </DropdownItem>
        <DropdownItem
          key="logs"
          showDivider
          onClick={openLogs}
          startContent={<IoTerminalOutline className={iconClasses} />}
        >
          View logs
        </DropdownItem>
        {renderActionButton()}
      </DropdownMenu>
    </Dropdown>
  );
}
