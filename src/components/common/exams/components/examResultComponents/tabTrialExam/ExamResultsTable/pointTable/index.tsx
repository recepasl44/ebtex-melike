import PointsTableRow from "./PointsTableRow.tsx";
                import { GlobalJoinedNumber, Point } from "../../../../../../../../types/exam/quiz_table.ts";
                import PointsTableHeader from "./PointTableHeader.tsx";

                interface PointsTableProps {
                  points: Point[];
                  quiz_type_id: number;
                  global_joined_number: GlobalJoinedNumber;
                }

                const PointsTable = ({ points, quiz_type_id, global_joined_number }: PointsTableProps) => {
                  // Base styling for the table
                  const tableStyle: React.CSSProperties = {
                    width: "100%",
                    borderCollapse: "collapse",
                    borderSpacing: 0,
                    border: "1px solid #E6EFF3",
                  };

                  // Container styling
                  const containerStyle: React.CSSProperties = {
                    overflowX: "auto",
                    marginBottom: "1rem",
                  };

                  // Cell styling for the global joined number row
                  const baseCellStyle: React.CSSProperties = {
                    height: "26px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "normal",
                    padding: "8px",
                    border: "1px solid #E6EFF3",
                    background: "#FD8E8E", // Preserving the original background color
                    color: "#FFFFFF",
                  };

                  // Right-aligned cell style with additional padding
                  const rightAlignedCellStyle: React.CSSProperties = {
                    ...baseCellStyle,
                    textAlign: "right",
                    paddingRight: "16px", // Increased right padding
                  };

                  return (
                    <div style={containerStyle}>
                      <table style={tableStyle}>
                        <PointsTableHeader quiz_type_id={quiz_type_id} />
                        <tbody>
                          {points.map((point, index) => (
                            <PointsTableRow
                              key={index}
                              point={point}
                              quiz_type_id={quiz_type_id}
                            />
                          ))}

                          {quiz_type_id === 6 && (
                            <tr>
                              <td colSpan={2} style={baseCellStyle}></td>
                              <td style={rightAlignedCellStyle}>Katılım Sayısı</td>
                              <td style={baseCellStyle}>{global_joined_number.class}</td>
                              <td style={baseCellStyle}>{global_joined_number.branch}</td>
                              <td style={baseCellStyle}>{global_joined_number.county}</td>
                              <td style={baseCellStyle}>{global_joined_number.city}</td>
                              <td style={baseCellStyle}>{global_joined_number.general}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  );
                };

                export default PointsTable;
