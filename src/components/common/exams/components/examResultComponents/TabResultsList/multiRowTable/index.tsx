import React from "react";
                  import { useSelector } from "react-redux";
                  import { RootState } from "../../../../../../../store";
                  import { MultiRowTableProps } from "./type.ts";

                  const MultiRowTable: React.FC<MultiRowTableProps> = ({ rows }) => {
                    // Get theme mode from Redux
                    const localVariable = useSelector((state: RootState) => state.ui);
                    const isDark = localVariable.dataThemeMode === "dark";

                    // Text styling common properties
                    const textStyleBase = {
                      fontFamily: "Inter",
                      lineHeight: "150%",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap" as const,
                    };

                    // Header style with fixed styling
                    const headerStyle: React.CSSProperties = {
                      ...textStyleBase,
                      backgroundColor: "#9e5cf71a",
                      color: "#9e5cf7",
                      border: `1px solid ${isDark ? "#4B5563" : "#FFF"}`,
                      verticalAlign: "middle",
                      padding: "4px 8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      height: "26px",
                      textAlign: "center" as const,
                    };

                    // Regular cell styling
                    const cellStyle: React.CSSProperties = {
                      ...textStyleBase,
                      verticalAlign: "middle",
                      border: `1px solid ${isDark ? "#4B5563" : "#E6EFF3"}`,
                      padding: "6px 8px",
                      fontSize: "12px",
                      fontWeight: 400,
                      height: "26px",
                      wordBreak: "break-word",
                      backgroundColor: isDark ? "#1E293B" : undefined,
                      color: isDark ? "#E2E8F0" : "#333333",
                    };

                    const tableStyle: React.CSSProperties = {
                      tableLayout: "auto",
                      width: "100%",
                      minWidth: "1000px",
                      borderCollapse: "collapse",
                      fontFamily: "Inter",
                    };

                    const responsiveWrapperStyle: React.CSSProperties = {
                      overflowX: "auto",
                      WebkitOverflowScrolling: "touch",
                      boxSizing: "border-box",
                      backgroundColor: isDark ? "#0F172A" : undefined,
                      borderRadius: "6px",
                      boxShadow: isDark ? "none" : "0 2px 10px rgba(0,0,0,0.05)",
                    };

                    return (
                      <div className="table-responsive" style={responsiveWrapperStyle}>
                        <table
                          className="table table-bordered align-middle"
                          style={tableStyle}
                        >
                          <tbody>
                            {rows.map((row, rowIndex) => (
                              <tr key={rowIndex} className={row.className}>
                                {row.cells.map((cell, cellIndex) => {
                                  const baseStyle = row.isHeader ? headerStyle : cellStyle;

                                  // Apply zebra striping for non-header rows in dark mode
                                  const rowBackground = !row.isHeader && isDark
                                    ? rowIndex % 2 === 0 ? "#1E293B" : "#263548"
                                    : rowIndex % 2 === 0 ? undefined : "#f9f9f9";

                            // Update the wrappedContent style
                            const wrappedContent =
                              typeof cell.content === "string" || typeof cell.content === "number" ? (
                                <div
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: cell.style?.textAlign === "left" ? "flex-start" : "center",
                                    alignItems: "center",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {typeof cell.content === "number" && !isNaN(cell.content)
                                    ? Number(cell.content).toFixed(1)
                                    : cell.content}
                                </div>
                              ) : (
                                cell.content
                              );

                            // And update commonProps to ensure height is enforced
                            const commonProps = {
                              colSpan: cell.colSpan,
                              rowSpan: cell.rowSpan,
                              className: `align-middle ${cell.className || ""}`,
                              style: {
                                ...baseStyle,
                                ...cell.style,
                                height: "26px", // Explicitly set height here to override any cell.style
                                minWidth: cell.style?.width || "80px",
                                maxWidth: cell.style?.maxWidth || "100%",
                                backgroundColor: cell.style?.backgroundColor ||
                                  (row.isHeader ? baseStyle.backgroundColor : rowBackground),
                                textTransform: cell.style?.textTransform || "none",
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
