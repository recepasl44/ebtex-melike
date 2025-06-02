import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FlexibleAccordionTableProps, TableCell, TableRow } from "./types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const FlexibleAccordionTable: React.FC<FlexibleAccordionTableProps> = ({
  headers,
  rows,
  onCellAction,
}) => {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const defaults: Record<string, boolean> = {};
    const initializeOpenStates = (rowList: TableRow[]) => {
      rowList.forEach((row) => {
        if (row.isAccordion && row.isOpenDefault) {
          defaults[row.id] = true;
        }
        if (row.children) initializeOpenStates(row.children);
      });
    };
    initializeOpenStates(rows);
    setOpenRows(defaults);
  }, [rows]);

  const toggleRow = (id: string) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getCellStyle = (
    isHeader?: boolean,
    style?: React.CSSProperties
  ): React.CSSProperties => ({
    verticalAlign: "middle",
    ...(isHeader
      ? {
          backgroundColor: "#4D5875",
          color: "white",
          height: "16px",
          padding: "0",
          fontSize: "12px",
          lineHeight: "16px",
        }
      : {
          height: "26px",
          padding: "0",
          lineHeight: "26px",
        }),
    ...style,
  });

  const CellContent: React.FC<{
    cell: TableCell;
    isOpen?: boolean;
    rowId: string;
    cellIndex: any;
  }> = ({ cell, isOpen, rowId, cellIndex }) => (
    <>
      {cell.isAccordion && (
        <span style={{ marginRight: 4 }}>
          {isOpen ? (
            <ExpandMoreIcon fontSize="small" />
          ) : (
            <ChevronRightIcon fontSize="small" />
          )}
        </span>
      )}
      {cell.content}
      {cell.action && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Satır açma/kapatma işlemini engellemek için
            onCellAction?.(rowId, cellIndex, "action");
          }}
          style={{ marginLeft: 8 }}
        >
          Action
        </button>
      )}
    </>
  );

  const renderCell = (
    cell: TableCell,
    i: number,
    isOpen?: boolean,
    rowId?: string
  ) => {
    const props = {
      className: cell.className,
      style: getCellStyle(cell.isHeader, cell.style),
      colSpan: cell.colSpan || 1,
      rowSpan: cell.rowSpan,
    };

    const content = (
      <CellContent
        cell={cell}
        isOpen={isOpen}
        rowId={rowId || ""}
        cellIndex={i}
      />
    );

    return cell.isHeader ? (
      <th key={i} {...props}>
        {content}
      </th>
    ) : (
      <td key={i} {...props}>
        {content}
      </td>
    );
  };

  const renderRowRecursive = (row: TableRow): React.ReactNode => {
    const isOpen = openRows[row.id] || false;
    const isAccordion = row.isAccordion;

    return (
      <React.Fragment key={row.id}>
        <tr
          className={row.rowClassName || ""}
          style={{ cursor: isAccordion ? "pointer" : "default" }}
          onClick={() => isAccordion && toggleRow(row.id)}
        >
          {row.cells.map((cell, i) => renderCell(cell, i, isOpen, row.id))}
        </tr>
        {isAccordion &&
          isOpen &&
          row.children?.map((child) => renderRowRecursive(child))}
      </React.Fragment>
    );
  };

  return (
    <div className="table-responsive">
      <Table
        bordered
        size="sm"
        className="align-middle"
        style={{
          borderCollapse: "collapse",
          tableLayout: "fixed",
          width: "100%",
        }}
      >
        <thead>
          {headers.map((headerRow, rowIndex) => (
            <tr key={rowIndex}>
              {headerRow.map((cell, cellIndex) => renderCell(cell, cellIndex))}
            </tr>
          ))}
        </thead>
        <tbody>{rows.map((row) => renderRowRecursive(row))}</tbody>
      </Table>
    </div>
  );
};

export default FlexibleAccordionTable;
