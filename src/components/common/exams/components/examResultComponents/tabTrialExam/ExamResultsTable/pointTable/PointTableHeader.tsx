import React from "react";

            type PointsTableHeaderProps = {
              quiz_type_id: number;
            };

            const PointsTableHeader: React.FC<PointsTableHeaderProps> = ({
              quiz_type_id,
            }) => {
              // Base header cell style
              const headerCellStyle: React.CSSProperties = {
                backgroundColor: "#9e5cf71a",
                color: "#9e5cf7",
                fontFamily: "Inter",
                fontSize: "0.8rem",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                padding: "8px",
                height: "26px",
                border: "1px solid #E6EFF3",
                verticalAlign: "middle",
                textAlign: "center",
              };

              return (
                <thead>
                  <tr>
                    {[1, 2, 3, 4, 6].includes(quiz_type_id) && (
                      <>
                        <th style={headerCellStyle}>Puan Türü</th>
                        <th style={headerCellStyle}>Puan</th>
                      </>
                    )}
                    <th style={headerCellStyle}></th>
                    {(quiz_type_id === 5 ||
                      quiz_type_id === 7 ||
                      quiz_type_id === 8 ||
                      quiz_type_id === 9 ||
                      quiz_type_id === 10 ||
                      quiz_type_id === 11) && (
                      <>
                        <th style={headerCellStyle}></th>
                        <th style={headerCellStyle}></th>
                      </>
                    )}
                    <th style={headerCellStyle}>Sınıf</th>
                    <th style={headerCellStyle}>Kurum</th>
                    <th style={headerCellStyle}>İlçe</th>
                    <th style={headerCellStyle}>İl</th>
                    <th style={headerCellStyle}>Genel</th>
                  </tr>
                </thead>
              );
            };

            export default PointsTableHeader;
