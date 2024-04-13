import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { columns } from "./data";

import { Download } from "@renderer/types/DownloadTable";
import { IoMdClose } from "react-icons/io";
import DownloadDropdownOptions from "./dropdown";

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
            <p className="text-bold text-sm capitalize">
              {cellValue.length > 59
                ? cellValue.substring(0, 59) + "..."
                : cellValue}
            </p>
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
        return <DownloadDropdownOptions item={item} />;
      default:
        return cellValue;
    }
  }, []);

  if (downloads.length == 0) return <></>;

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
