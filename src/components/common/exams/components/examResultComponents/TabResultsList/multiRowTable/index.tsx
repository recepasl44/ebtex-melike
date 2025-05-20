import React from "react";
    import { MultiRowTableProps } from "./type.ts";

      const MultiRowTable: React.FC<MultiRowTableProps> = ({ rows }) => {
      const headerStyle: React.CSSProperties = {
        backgroundColor: "#dbddfa",
        color: "#5c67f7",
        verticalAlign: "middle",
        border: "1px solid #dee2e6",
        padding: 0,
        fontSize: "12px",
        wordBreak: "break-word",
      };

      const cellStyle: React.CSSProperties = {
        verticalAlign: "middle",
        border: "1px solid #E6EFF3",
        padding: "4px",
        fontSize: "12px",
        wordBreak: "break-word",
        
      };

      const tableStyle: React.CSSProperties = {
        tableLayout: "auto",
        width: "100%",
        minWidth: "1000px",
      };

      const responsiveWrapperStyle: React.CSSProperties = {
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        boxSizing: "border-box",

      };

      return (
        <div className="table-responsive" style={responsiveWrapperStyle}>
          <table
            className="table table-bordered text-center align-middle"
            style={tableStyle}
          >
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={row.className}>
                  {row.cells.map((cell, cellIndex) => {
                    const baseStyle = row.isHeader ? headerStyle : cellStyle;

                    const wrappedContent =
                      typeof cell.content === "string" || typeof cell.content === "number" ? (
                        <div
                          style={{
                            width: "100%",
                            height: cell.style?.height || "auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {cell.content}
                        </div>
                      ) : (
                        cell.content
                      );

                    const commonProps = {
                      colSpan: cell.colSpan,
                      rowSpan: cell.rowSpan,
                      className: `align-middle ${cell.className || ""}`,
                      style: {
                        ...baseStyle,
                        ...cell.style,
                        minWidth: cell.style?.width || "80px",
                        maxWidth: "100%",
                      },
                    };

                    return row.isHeader ? (
                      <th key={cellIndex} {...commonProps}>{wrappedContent}</th>
                    ) : (
                      <td key={cellIndex} {...commonProps}>{wrappedContent}</td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    export default MultiRowTable;
