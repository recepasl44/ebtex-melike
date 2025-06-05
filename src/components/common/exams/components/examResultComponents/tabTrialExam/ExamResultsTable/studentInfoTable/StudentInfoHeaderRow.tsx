import React from "react";
        import { useSelector } from "react-redux";
        import { RootState } from "../../../../../../../../store";

        type StudentInfoHeaderRowProps = {
          quiz_type_id: number;
        };

        const StudentInfoHeaderRow: React.FC<StudentInfoHeaderRowProps> = ({ quiz_type_id }) => {
          // Redux Store'dan dark/light bilgisi
          const localVariable = useSelector((state: RootState) => state.ui);
          const isDark = localVariable.dataThemeMode === "dark";

          // Base header cell style with theme-dependent properties
          const headerCellStyle: React.CSSProperties = {
            color: isDark ? "#E2E8F0" : "#000",
            textAlign: "center",
            fontFamily: "Inter",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            padding: "8px",
            height: "26px",
            border: `1px solid ${isDark ? "#374151" : "#E6EFF3"}`,
            background: isDark ? "#1E293B" : "#FFF",
          };

          // Column-specific styles
          const columnStyles = {
            name: {
              ...headerCellStyle,
              width: "180.212px",
            },
            tcNo: {
              ...headerCellStyle,
              width: "166.117px",
            },
            class: {
              ...headerCellStyle,
              width: "92.623px",
            },
            examName: {
              ...headerCellStyle,
              width: "165.11px",
            },
            bookletType: {
              ...headerCellStyle,
              width: "92.623px",
            },
            date: {
              ...headerCellStyle,
              width: "91.616px",
            }
          };

          return (
            <tr>
              <th style={columnStyles.name}>Adı Soyadı</th>
              <th style={columnStyles.tcNo}>TC No</th>
              <th style={columnStyles.class}>Sınıfı</th>
              <th style={columnStyles.examName}>Sınav Adı</th>
              {(quiz_type_id === 1 || quiz_type_id === 2 || quiz_type_id === 3 || quiz_type_id === 4 || quiz_type_id === 6) && (
                <th style={columnStyles.examName}>Sınav Adı</th>
              )}
              <th style={columnStyles.bookletType}>Kitapçık Türü</th>
              <th style={columnStyles.date}>Tarih</th>
            </tr>
          );
        };

        export default StudentInfoHeaderRow;
