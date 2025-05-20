import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "../FlexibleAccordionTable/types";
import FlexibleAccordionTable from "../FlexibleAccordionTable";
import { ExamPerformanceData } from "../../../../../../types/exam/examPerformanceType";

interface TabBranchComparisonTypeProps {
  initialData: ExamPerformanceData;
}

const BranchComparison: React.FC<TabBranchComparisonTypeProps> = ({ initialData }) => {
    const [examData, setExamData] = useState(initialData);
  
    useEffect(() => {
      setExamData(initialData);
    }, [initialData]);
  
        const headers: TableCell[][] = [
      [
        {
          content: "Sınavlar",
          isHeader: true,
          style: {
            height: "26px",
            textAlign: "center" as const,
            fontSize: "12px",
            fontWeight: "bold",
            color: "#5c67f7",
            background: "#dbddfa",
          },
          colSpan: examData.data.test_booklets[0]?.colnums.length + 1,
        },
      ],
      [
        {
          content: "",
          isHeader: true,
          colSpan: 1,
          style: {
            width: "300px",
            height: "12px",
            textAlign: "center" as const,
            fontSize: "12px",
            color: "#5c67f7",
            background: "#dbddfa",
          },
        },
        ...(examData.data.test_booklets[0]?.colnums || []).map((col) => ({
          content: col.name,
          isHeader: true,
          style: {
            width: "125px",
            height: "26px",
            textAlign: "center" as const,
            color: "#5c67f7",
            background: "#dbddfa",
          },
        })),
      ],
    ];
  
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
              width: "300px",
              background: "#8699A366",
              padding: "0px 10px",
              textAlign: "left" as const,
              color: "#000000",
            },
          },
          ...examData.data.point_avarage.map((col) => ({
            content: col.cell.toString(),
            style: {
              width: "125px",
              background: "#8699A366",
              textAlign: "center" as const,
              color: "#000000",
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
              width: "300px",
              background: "#8699A366",
              padding: "0px 10px",
              textAlign: "left" as const,
              color: "#000000",
            },
          },
          ...examData.data.success_rate.map((col) => ({
            content: col.cell.toString(),
            style: {
              width: "125px",
              background: "#8699A366",
              textAlign: "center" as const,
              color: "#000000",
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
              width: "300px",
              background: "#8699A3",
              padding: "0px 10px",
              textAlign: "left" as const,
              color: "#FFF",
            },
          },
          ...examData.data.total_net_avarage.map((col) => ({
            content: col.cell.toString(),
            style: {
              width: "125px",
              background: "#8699A3",
              textAlign: "center" as const,
              color: "#FFF",
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
              width: "300px",
              background: "#8699A366",
              padding: "0px 10px",
              textAlign: "left" as const,
              color: "#000",
            },
          },
          ...examData.data.test_lesson_avarage.map((col) => ({
            content: col.cell.toString(),
            style: {
              width: "125px",
              background: "#8699A366",
              textAlign: "center" as const,
              color: "#000000",
            },
          })),
        ],
      },
      ...examData.data.test_booklets.map((booklet) => ({
        id: `booklet-${booklet.booklet_id}-${booklet.booklet_name}`, 
        isAccordion: true,
        isOpenDefault: false,
        cells: [
          {
            content: booklet.booklet_name,
            isAccordion: true,
            colSpan: 1,
            style: {
              width: "300px",
              background: "#8699A366",
              padding: "0px 10px",
              textAlign: "left" as const,
              color: "#000000",
            },
          },
          ...booklet.colnums.map((col) => ({
            content: col.cell.toString(),
            style: {
              width: "125px",
              background: "#8699A366",
              textAlign: "center" as const,
              color: "#000000",
            },
          })),
        ],
        children: [
            ...booklet.lessons.map((lesson) => ({
              id: `lesson-${booklet.booklet_id}-${lesson.lesson_name}`, 
              isAccordion: false, 
              isOpenDefault: false,
              cells: [
                {
                  content: lesson.lesson_name,
                  colSpan: 1,
                  style: {
                    width: "300px",
                    background: "#8699A366",
                    padding: "0px 55px",
                    textAlign: "left" as const,
                    color: "#000000",
                  },
                },
                ...lesson.colnums.map((col) => ({
                  content: col.cell.toString(),
                  style: {
                    width: "125px",
                    background: "#8699A366",
                    textAlign: "center" as const,
                    color: "#000000",
                  },
                })),
              ],
            })),
          ],
        })),
      ];

    const handleCellAction = (rowId: string, cellIndex: number, actionType: string) => {
      console.log(`Action triggered on row: ${rowId}, cell: ${cellIndex}, action: ${actionType}`);
    };
  
    return (
      <div className="mt-4">
        <FlexibleAccordionTable headers={headers} rows={rows} onCellAction={handleCellAction} />
      </div>
    );
  };
  
  export default BranchComparison;