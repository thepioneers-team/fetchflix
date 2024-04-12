import {
  Button,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { columns } from "./data";

import { FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import {
  IoCopyOutline,
  IoFolderOpenOutline,
  IoOpenOutline,
  IoTerminalOutline,
} from "react-icons/io5";
import { Download } from "@renderer/types/DownloadTable";

const iconClasses = "w-4 h-4 pointer-events-none flex-shrink-0";

interface Props {
  downloads: Array<Download>;
}

export default function DownloadTable({ downloads }: Props) {
  const renderCell = React.useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    const isSuccess = item.status === "FINISHED";
    const isProgress = item.status === "DOWNLOADING";
    const isError = item.status === "ERROR";

    switch (columnKey) {
      case "progress":
        return (
          <CircularProgress
            aria-label="Loading..."
            size="lg"
            value={isError ? <IoMdClose /> : item.progress}
            color={isSuccess ? "success" : isProgress ? "warning" : "danger"}
            showValueLabel={true}
          />
        );
      case "thumbnail":
        return <img src={item.thumbnail} className="h-10 w-20 rounded-md" />;
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "eta":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "rate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "size":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
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
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells" className="mt-10">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={downloads}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
