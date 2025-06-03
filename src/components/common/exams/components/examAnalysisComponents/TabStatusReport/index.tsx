import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TableCell, TableRow } from "../FlexibleAccordionTable/types";
import FlexibleAccordionTable from "../FlexibleAccordionTable";
import { CourseSuccessData } from "../../../../../../types/exam/courseSuccessType";
import { routeIcons } from "../../../../../../assets/images/routeIcon";
import { RootState } from "../../../../../../store";

interface StatusReportProps {
  initialData: CourseSuccessData[];
}

const StatusReport: React.FC<StatusReportProps> = ({ initialData }) => {
  const [courseData, setCourseData] = useState(initialData);

  // Get theme mode from Redux
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  useEffect(() => {
    setCourseData(initialData);
  }, [initialData]);

  // Regular cell text styling
  const cellTextStyle = {
    leadingTrim: "both",
    textEdge: "cap",
    fontFamily: "Inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "150%" /* 18px */,
    textTransform: "capitalize" as const,
  };

  // Header text styling - no dark mode for headers
  const headerStyle = {
    width: "125px",
    height: "26px",
    textAlign: "center" as const,
    flexShrink: 0,
    fontFamily: "Inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    color: "#9e5cf7",
    background: "#9e5cf71a",
    border: `1px solid ${isDark ? "#374151" : "#FFF"}`,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  };

  // First column header style
  const firstColumnHeaderStyle = {
    ...headerStyle,
    width: "125px",
    padding: "0px 10px",
  };

  // Second column header style
  const secondColumnHeaderStyle = {
    ...headerStyle,
    width: "420px",
  };

  // Left aligned cell style
  const leftAlignedCellStyle = {
    width: "125px",
    padding: "0px 10px",
    textAlign: "left" as const,
    ...cellTextStyle,
  };

  // Second column cell style
  const achievementCellStyle = {
    width: "300px",
    padding: "0px 6px",
    textAlign: "left" as const,
    ...cellTextStyle,
  };

  // Create a style for centered content cells
  const centeredCellStyle = {
    width: "125px",
    textAlign: "center" as const,
    ...cellTextStyle,
  };

  const headers: TableCell[][] = [
    [
      {
        content: "Ders",
        isHeader: true,
        style: firstColumnHeaderStyle,
      },
      {
        content: "Kazanımlar",
        isHeader: true,
        style: secondColumnHeaderStyle,
      },
      ...(initialData[0]?.results[0]?.achievements[0]?.colnums || []).map(
        (col) => ({
          content: col.name,
          isHeader: true,
          style: headerStyle,
        })
      ),
    ],
  ];

  // Cell content with horizontally aligned icons
  const renderCellContent = (cell: any, rate?: string) => {
    let displayValue = "-";

    if (cell != null) {
      // Format numbers to show exactly 1 decimal place when icons are present
      if (rate && !isNaN(parseFloat(cell))) {
        displayValue = parseFloat(cell).toFixed(1);
      } else {
        displayValue = cell.toString();
      }
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <span>{displayValue}</span>
        {rate && (
          <span
            style={{
              display: "inline-block",
              width: "20px",
              textAlign: "center",
            }}
          >
            {rate === "up" && <img src={routeIcons.upIcon} alt="Up Icon" />}
            {rate === "down" && (
              <img src={routeIcons.downIcon} alt="Down Icon" />
            )}
          </span>
        )}
      </div>
    );
  };

  const rows: TableRow[] = courseData[0].results.map((result, index) => ({
    id: `result-${result.id}`,
    isAccordion: true,
    isOpenDefault: false,
    cells: [
      {
        content: result.name,
        style: {
          ...leftAlignedCellStyle,
          background: isDark ? "#263548" : index % 2 === 0 ? "#F9FAFC" : "#fff",
          color: isDark ? "#E2E8F0" : "#000",
        },
      },
      {
        content: result.achievements[0]?.achievements_name || "-",
        style: {
          ...achievementCellStyle,
          background: isDark ? "#263548" : index % 2 === 0 ? "#F9FAFC" : "#fff",
          color: isDark ? "#E2E8F0" : "#000",
        },
      },
      ...result.achievements[0]?.colnums.map((col) => ({
        content: renderCellContent(col.cell, col.rate),
        style: {
          ...centeredCellStyle,
          background: isDark ? "#263548" : index % 2 === 0 ? "#F9FAFC" : "#fff",
          color: isDark ? "#E2E8F0" : "#000",
        },
      })),
    ],
  }));

  return (
    <div className="mt-4">
      <FlexibleAccordionTable headers={headers} rows={rows} />
    </div>
  );
};

export default StatusReport;
