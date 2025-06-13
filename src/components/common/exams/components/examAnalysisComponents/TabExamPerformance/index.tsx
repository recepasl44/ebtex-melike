import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TableCell, TableRow } from "../FlexibleAccordionTable/types";
import FlexibleAccordionTable from "../FlexibleAccordionTable";
import { ExamPerformanceData } from "../../../../../../types/exam/examPerformanceType";
import { routeIcons } from "../../../../../../assets/images/routeIcon";
import { RootState } from "../../../../../../store";

interface TabExamPerformanceTypeProps {
  initialData: ExamPerformanceData;
}

const ExamPerformance: React.FC<TabExamPerformanceTypeProps> = ({
  initialData,
}) => {
  const [examData, setExamData] = useState(initialData);

  // Get theme mode from Redux
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  useEffect(() => {
    setExamData(initialData);
  }, [initialData]);

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

  // Header styling for first column (centered as requested)
  const firstColumnHeaderStyle = {
    ...headerStyle,
    width: "300px",
    textAlign: "center" as const,
  };

  // Regular cell text styling
  const cellTextStyle = {
    fontFamily: "Inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "150%" /* 18px */,
    textTransform: "capitalize" as const,
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

  // Eğer test_booklets veya colnums boş gelebilir ise, hatayı önlemek için uzunluk kontrolü:
  const colSpanValue =
    (examData?.data?.test_booklets?.[0]?.colnums?.length ?? 0) + 1;

  const headers: TableCell[][] = [
    [
      {
        content: "Sınavlar",
        isHeader: true,
        style: {
          ...headerStyle,
          height: "26px",
          textAlign: "center",
        },
        colSpan: colSpanValue,
      },
    ],
    [
      {
        content: "",
        isHeader: true,
        colSpan: 1,
        style: {
          ...firstColumnHeaderStyle,
          height: "12px",
          padding: "0px 10px",
        },
      },
      ...(examData?.data?.test_booklets?.[0]?.colnums || []).map((col) => ({
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
      } else if (!isNaN(parseFloat(cell))) {
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

  const rows: TableRow[] = [
    {
      id: "point_avarage",
      isAccordion: false,
      isOpenDefault: false,
      cells: [
        {
          content: "Puan Ortalaması",
          colSpan: 1,
          style: {
            ...leftAlignedCellStyle,
            background: isDark ? "#1E293B" : "#8699A366",
            color: isDark ? "#E2E8F0" : "#000000",
          },
        },
        ...(examData?.data?.point_avarage || []).map((col) => ({
          content: renderCellContent(col.cell, col.rate),
          style: {
            ...centeredCellStyle,
            background: isDark ? "#1E293B" : "#8699A366",
            color: isDark ? "#E2E8F0" : "#000000",
          },
        })),
      ],
    },
    {
      id: "success_rate",
      isAccordion: false,
      isOpenDefault: false,
      cells: [
        {
          content: "Başarı Oranı",
          colSpan: 1,
          style: {
            ...leftAlignedCellStyle,
            background: isDark ? "#1E293B" : "#8699A366",
            color: isDark ? "#E2E8F0" : "#000000",
          },
        },
        ...(examData?.data?.success_rate || []).map((col) => ({
          content: renderCellContent(col.cell, col.rate),
          style: {
            ...centeredCellStyle,
            background: isDark ? "#1E293B" : "#8699A366",
            color: isDark ? "#E2E8F0" : "#000000",
          },
        })),
      ],
    },
    {
      id: "total_net_avarage",
      isAccordion: false,
      isOpenDefault: false,
      cells: [
        {
          content: "Toplam Net Ortalaması",
          colSpan: 1,
          style: {
            ...leftAlignedCellStyle,
            background: isDark ? "#263548" : "#8699A3",
            color: isDark ? "#E2E8F0" : "#FFF",
          },
        },
        ...(examData?.data?.total_net_avarage || []).map((col) => ({
          content: renderCellContent(col.cell, col.rate),
          style: {
            ...centeredCellStyle,
            background: isDark ? "#263548" : "#8699A3",
            color: isDark ? "#E2E8F0" : "#FFF",
          },
        })),
      ],
    },
    {
      id: "test_lesson_avarage",
      isAccordion: false,
      isOpenDefault: false,
      cells: [
        {
          content: "Test / Ders Net Ortalaması",
          colSpan: 1,
          style: {
            ...leftAlignedCellStyle,
            background: isDark ? "#1E293B" : "#8699A366",
            color: isDark ? "#E2E8F0" : "#000000",
          },
        },
        ...(examData?.data?.test_lesson_avarage || []).map((col) => ({
          content: renderCellContent(col.cell, col.rate),
          style: {
            ...centeredCellStyle,
            background: isDark ? "#1E293B" : "#8699A366",
            color: isDark ? "#E2E8F0" : "#000000",
          },
        })),
      ],
    },
    // Kitapçıklar
    ...(examData?.data?.test_booklets || []).map((booklet) => ({
      id: `booklet-${booklet.booklet_id}-${booklet.booklet_name}`,
      isAccordion: true,
      isOpenDefault: false,
      cells: [
        {
          content: booklet.booklet_name,
          isAccordion: true,
          colSpan: 1,
          style: {
            ...leftAlignedCellStyle,
            background: isDark ? "#1E293B" : "#8699A366",
            color: isDark ? "#E2E8F0" : "#000000",
          },
        },
        ...booklet.colnums.map((col) => ({
          content: renderCellContent(col.cell, col.rate),
          style: {
            ...centeredCellStyle,
            background: isDark ? "#1E293B" : "#8699A366",
            color: isDark ? "#E2E8F0" : "#000000",
          },
        })),
      ],
      children: booklet.lessons.map((lesson) => ({
        id: `lesson-${booklet.booklet_id}-${lesson.lesson_name}`,
        isAccordion: false,
        isOpenDefault: false,
        cells: [
          {
            content: lesson.lesson_name,
            colSpan: 1,
            style: {
              ...leftAlignedCellStyle,
              background: isDark ? "#0F172A" : "#8699A31A",
              padding: "0px 55px",
              color: isDark ? "#E2E8F0" : "#000000",
            },
          },
          ...lesson.colnums.map((col) => ({
            content: renderCellContent(col.cell, col.rate),
            style: {
              ...centeredCellStyle,
              background: isDark ? "#0F172A" : "#8699A31A",
              color: isDark ? "#E2E8F0" : "#000000",
            },
          })),
        ],
      })),
    })),
  ];

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

export default ExamPerformance;
