import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FlexibleAccordionTableProps, TableCell, TableRow } from "./types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const FlexibleAccordionTable: React.FC<FlexibleAccordionTableProps> = ({
  headers,
  rows,
  onCellAction,
  isDark = false, // default to false
}) => {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});

  const backgroundColor = isDark ? "#19191C" : "#FFFFFF";
  const textColor = isDark ? "#E2E8F0" : "#000";
  const borderStyle = `1px solid ${isDark ? "#374151" : "#E6EFF3"}`;


  const headerBg = "#9e5cf71a";
  const headerTextColor = "#9e5cf7";

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

  /**
   * Merges default dark/light table styles with user-defined cell styles
   */
  const getCellStyle = (
    isHeader?: boolean,
    style?: React.CSSProperties
  ): React.CSSProperties => {
    // Default styles for header vs regular cells:
    const defaultHeaderStyles: React.CSSProperties = {
      height: "26px",
      textAlign: "center",
      fontFamily: "Inter",
      fontSize: "12px",
      fontWeight: 700,
      color: headerTextColor,
      background: headerBg,
      border: borderStyle,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
    };

    const defaultCellStyles: React.CSSProperties = {
      fontFamily: "Inter",
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "150%",
      border: borderStyle,
      background: backgroundColor,
      color: textColor,
      verticalAlign: "middle",
      // Set a default height to match your usage:
      height: "26px",
      // If you want to keep table layout consistent:
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };

    // Merge user-supplied style last so it can override defaults
    return {
      ...(isHeader ? defaultHeaderStyles : defaultCellStyles),
      ...style,
    };
  };

  // Helper to render the content inside each cell
  const CellContent: React.FC<{
    cell: TableCell;
    isOpen?: boolean;
    rowId: string;
    cellIndex: number;
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
            e.stopPropagation(); // prevent the row accordion toggle
            onCellAction?.(rowId, cellIndex, "action");
          }}
          style={{ marginLeft: 8 }}
        >
          Action
        </button>
      )}
    </>
  );

  // Render a single cell (either th or td)
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

  // Recursively render rows and nested children
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
              {headerRow.map((cell, cellIndex) =>
                renderCell(cell, cellIndex, false)
              )}
            </tr>
          ))}
        </thead>
        <tbody>{rows.map((row) => renderRowRecursive(row))}</tbody>
      </Table>
    </div>
  );
};

export default FlexibleAccordionTable;
