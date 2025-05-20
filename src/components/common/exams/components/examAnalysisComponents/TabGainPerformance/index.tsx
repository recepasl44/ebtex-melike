import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "../FlexibleAccordionTable/types";
import FlexibleAccordionTable from "../FlexibleAccordionTable";
import { CourseSuccessData } from "../../../../../../types/exam/courseSuccessType";
import { routeIcons } from "../../../../../../assets/images/routeIcon";

interface TabGainPerformanceProps {
  initialData: CourseSuccessData[];
}

const TabGainPerformance: React.FC<TabGainPerformanceProps> = ({ initialData }) => {
  const [courseData, setCourseData] = useState(initialData);

  useEffect(() => {
    setCourseData(initialData);
  }, [initialData]);

  const headers: TableCell[][] = [
    [
      {
        content: "Grup / Genel Başarı Yüzdesi (%)",
        isHeader: true,
        style: {
          height: "26px",
          textAlign: "center" as const,
          fontSize: "12px",
          fontWeight: "bold",
          color: "#5c67f7",
          background: "#dbddfa",
        },
        colSpan: courseData[0]?.results[0]?.colnums.length + 3,
      },
    ],
    [
      {
        content: "Ders/Ünite/Kazanım",
        isHeader: true,
        colSpan: 3,
        style: {
          width: "300px",
          height: "12px",
          textAlign: "center" as const,
          flexShrink: 0,
          fontSize: "12px",
          fontWeight: "bold",      
              color: "#5c67f7",
          background: "#dbddfa",
        },
      },
      ...(courseData[0]?.results[0]?.colnums || []).map((col) => ({
        content: col.name,
        isHeader: true,
        style: {
          width: "125px",
          height: "26px",
          textAlign: "center" as const,
          flexShrink: 0,
          color: "#5c67f7",
          background: "#dbddfa",
        },
      })),
    ],
  ];

  const rows: TableRow[] = courseData[0].results.map((result) => ({
    id: `result-${result.id}`,
    isAccordion: true,
    isOpenDefault: false,
    cells: [
      {
        content: result.name,
        isAccordion: true,
        colSpan: 3,
        style: {
          width: "420px",
          background: "#8699A3",
          padding: "0px 10px",
          textAlign: "left" as const,
          color: "white",
        },
      },
      ...result.colnums.map((col, index) => ({
        key: `col-${index}`,
        content: (
          <>
            {col.cell != null ? col.cell.toString() : "-"}
            {col.rate === "up" && <img src={routeIcons.upIcon} alt="Up Icon" style={{ marginLeft: "5px" }} />}
            {col.rate === "down" && <img src={routeIcons.downIcon} alt="Down Icon" style={{ marginLeft: "5px" }} />}
          </>
        ),
        style: {
          width: "125px",
          background: "#8699A3",
          textAlign: "center" as const,
          color: "white",
        },
      })),
    ],
    children: result.units.map((unit) => ({
      id: `unit-${unit.unit_id}`,
      isAccordion: true,
      cells: [
        {
          content: unit.unit_name,
          colSpan: 3,
          isAccordion: true,
          style: {
            width: "300px",
            background: "#8699A366",
            padding: "0px 20px",
            textAlign: "left" as const,
            color: "#000",
          },
        },
        ...unit.colnums.map((col) => ({
          content: (
            <>
              {col.cell != null ? col.cell.toString() : "-"}
              {col.rate === "up" && <img src={routeIcons.upIcon} alt="Up Icon" style={{ marginLeft: "5px" }} />}
              {col.rate === "down" && <img src={routeIcons.downIcon} alt="Down Icon" style={{ marginLeft: "5px" }} />}
            </>
          ),
          style: {
            width: "125px",
            background: "#8699A366",
            textAlign: "center" as const,
            color: "#000",
          },
        })),
      ],
      children: unit.achievements.map((achievement) => ({
        id: `achievement-${achievement.achievements_id}`,
        cells: [
          {
            content: achievement.achievements_name,
            colSpan: 3,
            style: {
              width: "420px",
              background: "#8699A31A",
              padding: "0px 55px",
              textAlign: "left" as const,
              color: "#000",
            },
          },
          ...achievement.colnums.map((col) => ({
            content: (
              <>
                {col.cell != null ? col.cell.toString() : "-"}
                {col.rate === "up" && <img src={routeIcons.upIcon} alt="Up Icon" style={{ marginLeft: "5px" }} />}
                {col.rate === "down" && <img src={routeIcons.downIcon} alt="Down Icon" style={{ marginLeft: "5px" }} />}
              </>
            ),
            style: {
              width: "125px",
              background: "#8699A31A",
              textAlign: "center" as const,
              color: "#000",
            },
          })),
        ],
      })),
    })),
  }));

  const handleCellAction = (rowId: string, cellIndex: number, actionType: string) => {
    console.log(`Action triggered on row: ${rowId}, cell: ${cellIndex}, action: ${actionType}`);
  };

  return (
    <div className="mt-4">
      <FlexibleAccordionTable headers={headers} rows={rows} onCellAction={handleCellAction} />
    </div>
  );
};

export default TabGainPerformance;