import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TableCell, TableRow } from "../FlexibleAccordionTable/types";
import FlexibleAccordionTable from "../FlexibleAccordionTable";
import { CourseSuccessData } from "../../../../../../types/exam/courseSuccessType";
import { routeIcons } from "../../../../../../assets/images/routeIcon";
import { RootState } from "../../../../../../store";

interface ClassComparisonProps {
  initialData: CourseSuccessData[];
}

const ClassComparison: React.FC<ClassComparisonProps> = ({ initialData }) => {
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
    width: "300px",
    padding: "0px 10px",
    textAlign: "left" as const,
  };

  // Create a style for left-aligned content cells
  const leftAlignedCellStyle = {
    width: "300px",
    padding: "0px 10px",
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
        content: "Ders/Ünite/Kazanım",
        isHeader: true,
        style: firstColumnHeaderStyle,
      },
      ...(courseData[0]?.results[0]?.colnums || []).map((col) => ({
        content: col.name,
        isHeader: true,
        style: headerStyle,
      })),
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

  const rows: TableRow[] = courseData[0].results.map((result) => ({
    id: `result-${result.id}`,
    isAccordion: true,
    isOpenDefault: false,
    cells: [
      {
        content: result.name,
        isAccordion: true,
        style: {
          ...leftAlignedCellStyle,
          width: "420px",
          background: isDark ? "#263548" : "#8699A3",
          color: isDark ? "#E2E8F0" : "white",
        },
      },
      ...result.colnums.map((col, index) => ({
        key: `col-${index}`,
        content: renderCellContent(col.cell, col.rate),
        style: {
          ...centeredCellStyle,
          background: isDark ? "#263548" : "#8699A3",
          color: isDark ? "#E2E8F0" : "white",
        },
      })),
    ],
    children: result.units.map((unit) => ({
      id: `unit-${unit.unit_id}`,
      isAccordion: true,
      cells: [
        {
          content: unit.unit_name,
          isAccordion: true,
          style: {
            ...leftAlignedCellStyle,
            background: isDark ? "#1E293B" : "#8699A366",
            padding: "0px 20px",
            color: isDark ? "#E2E8F0" : "#000",
          },
        },
        ...unit.colnums.map((col) => ({
          content: renderCellContent(col.cell, col.rate),
          style: {
            ...centeredCellStyle,
            background: isDark ? "#1E293B" : "#8699A366",
            color: isDark ? "#E2E8F0" : "#000",
          },
        })),
      ],
      children: unit.achievements.map((achievement) => ({
        id: `achievement-${achievement.achievements_id}`,
        cells: [
          {
            content: achievement.achievements_name,
            style: {
              ...leftAlignedCellStyle,
              width: "420px",
              background: isDark ? "#0F172A" : "#8699A31A",
              padding: "0px 55px",
              color: isDark ? "#E2E8F0" : "#000",
            },
          },
          ...achievement.colnums.map((col) => ({
            content: renderCellContent(col.cell, col.rate),
            style: {
              ...centeredCellStyle,
              background: isDark ? "#0F172A" : "#8699A31A",
              color: isDark ? "#E2E8F0" : "#000",
            },
          })),
        ],
      })),
    })),
  }));

  const handleCellAction = (
    rowId: string,
    cellIndex: number,
    actionType: string
  ) => {
    console.log(
      `Action triggered on row: ${rowId}, cell: ${cellIndex}, action: ${actionType}`
    );
  };

  return (
    <div className="mt-4">
      <FlexibleAccordionTable
        headers={headers}
        rows={rows}
        onCellAction={handleCellAction}
      />
    </div>
  );
};

export default ClassComparison;
