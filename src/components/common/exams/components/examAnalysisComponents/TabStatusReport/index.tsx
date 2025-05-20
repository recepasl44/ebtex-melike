import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "../FlexibleAccordionTable/types";
import FlexibleAccordionTable from "../FlexibleAccordionTable";
import { CourseSuccessData } from "../../../../../../types/exam/courseSuccessType";
import { routeIcons } from "../../../../../../assets/images/routeIcon";

interface StatusReportProps {
  initialData: CourseSuccessData[];
}

const StatusReport: React.FC<StatusReportProps> = ({ initialData }) => {
  const [courseData, setCourseData] = useState(initialData);

  useEffect(() => {
    setCourseData(initialData);
  }, [initialData]);

  const headers: TableCell[][] = [
    [
      {
        content: "Ders",
        isHeader: true,
        style: {
          width: "125px",
          height: "26px",
          textAlign: "center" as const,
          fontSize: "12px",
          fontWeight: "bold",
          color: "#5c67f7",
          background: "#dbddfa",
          padding: "0px 6px",
        },
      },
      {
        content: "Kazanımlar",
        isHeader: true,
        style: {
          width: "420px",
          textAlign: "center" as const,
          fontSize: "12px",
          fontWeight: "bold",
          color: "#5c67f7",
          background: "#dbddfa",
        },
      },
      ...(initialData[0]?.results[0]?.achievements[0]?.colnums || []).map((col) => ({
        content: col.name,
        isHeader: true,
        style: {
          width: "125px",
          textAlign: "center" as const,
          color: "#5c67f7",
          background: "#dbddfa",
          fontSize: "12px",
          fontWeight: "bold",
        },
      })),
    ],
  ];

  const rows: TableRow[] = courseData[0].results.map((result, index) => ({
    id: `result-${result.id}`,
    isAccordion: true,
    isOpenDefault: false,
    cells: [
      {
        content: result.name,
        style: {
          width: "125px",
          background: index % 2 === 0 ? "#F9FAFC" : "#fff",
          textAlign: "left" as const,
          color: "#000",
          padding: "0px 10px",
        },
      },
      {
        content: result.achievements[0]?.achievements_name || "-",
        style: {
          width: "300px",
          textAlign: "left" as const,
          color: "#000",
          padding: "0px 6px",
          background: index % 2 === 0 ? "#F9FAFC" : "#fff",
        },
      },
      ...result.achievements[0]?.colnums.map((col) => ({
        content: (
         <>
                     {col.cell != null ? col.cell.toString() : "-"}
                     {col.rate === "up" && <img src={routeIcons.upIcon} alt="Up Icon" style={{ marginLeft: "5px" }} />}
                     {col.rate === "down" && <img src={routeIcons.downIcon} alt="Down Icon" style={{ marginLeft: "5px" }} />}
                   </>
        ),
        style: {
          width: "125px",
          textAlign: "center" as const,
          color: "#000",
          background: index % 2 === 0 ? "#F9FAFC" : "#fff",
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