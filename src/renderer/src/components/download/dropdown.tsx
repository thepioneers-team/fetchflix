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
  IoFolderOpenOutline,
  IoOpenOutline,
  IoTerminalOutline,
} from "react-icons/io5";

import { useHotkeys } from "react-hotkeys-hook";
import { useLogs } from "@renderer/stores/logs";

const iconClasses = "w-4 h-4 pointer-events-none flex-shrink-0";

interface Props {
  item: Download;
}

export default function DownloadDropdownOptions({ item }: Props) {
  const { setData } = useLogs();

  useHotkeys("l", () => setData({ id: item.id, logs: [] }), []);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <HiOutlineDotsVertical />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="open-folder"
          showDivider
          shortcut="O"
          startContent={<IoFolderOpenOutline className={iconClasses} />}
        >
          Show in explorer
        </DropdownItem>
        <DropdownItem
          key="open-link"
          startContent={<IoOpenOutline className={iconClasses} />}
        >
          Open Link
        </DropdownItem>
        <DropdownItem
          key="copy-link"
          showDivider
          startContent={<IoCopyOutline className={iconClasses} />}
        >
          Copy Link
        </DropdownItem>
        <DropdownItem
          key="logs"
          showDivider
          shortcut="L"
          startContent={<IoTerminalOutline className={iconClasses} />}
        >
          View logs
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          shortcut="⌘⌫"
          startContent={<FaTrash className={iconClasses} />}
        >
          Delete File
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
