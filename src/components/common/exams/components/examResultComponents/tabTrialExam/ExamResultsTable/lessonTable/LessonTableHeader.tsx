import React from "react";
      import { useSelector } from "react-redux";
      import { RootState } from "../../../../../../../../store";

      type LessonTableHeaderProps = {
        quiz_type_id: number;
        cellStyle?: React.CSSProperties;
      };

      const LessonTableHeader: React.FC<LessonTableHeaderProps> = ({ quiz_type_id }) => {
        // Get theme mode from Redux
        const localVariable = useSelector((state: RootState) => state.ui);
        const isDark = localVariable.dataThemeMode === "dark";

        const headers = [
          [1, 2, 3, 4].includes(quiz_type_id) ? "Sınav" : null,
          "Dersler",
          "Soru",
          "Doğru",
          "Yanlış",
          "Boş",
          "Net",
          "Sınıf Net",
          "Kurum Net",
          "Genel Net",
        ].filter(Boolean);

        const columnWidths = [
          [1, 2, 3, 4].includes(quiz_type_id) ? "80px" : null,
          "146px", // Dersler
          "91px",  // Soru
          "90px",  // Doğru
          "90px",  // Yanlış
          "89px",  // Boş
          "118px",  // Net
          "118px",  // Sınıf Net
          "118px",  // Kurum Net
          "119px",  // Genel Net
        ].filter(Boolean);

        const theadStyle: React.CSSProperties = {
          color: isDark ? "#E2E8F0" : "#9e5cf7",
          fontFamily: "Inter",
          fontSize: "0.8rem",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
        };

        const headerCellStyle: React.CSSProperties = {
          backgroundColor: isDark ? "#1E293B" : "#9e5cf71a",
          padding: "4px",
          fontSize: "0.8rem",
          fontWeight: 600,
          whiteSpace: "nowrap",
          verticalAlign: "middle",
          textAlign: "center",
          fontFamily: "Inter",
          fontStyle: "normal",
          lineHeight: "normal",
          border: `1px solid ${isDark ? "#374151" : "#FFF"}`,
          height: "26px",
        };

        return (
          <thead style={theadStyle} className="text-center list-group-item-action align-middle table">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  style={{
                    ...headerCellStyle,
                    width: columnWidths[index] || "80px",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        );
      };

      export default LessonTableHeader;
