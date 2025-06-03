import { useEffect, useState } from "react";
import FlexibleAccordionTable from "../../../../exams/components/examAnalysisComponents/FlexibleAccordionTable";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store";
import { ScheduledAssignmentData } from "../../../../../../types/scheduledAssignments/list";
import { useScheduledAssignmentsTable } from "../../../../../hooks/scheduledAssignments/useList";

const PositionmatikTable = () => {
  const { scheduledAssignmentsData } = useScheduledAssignmentsTable({
    enabled: true,
    page: 1,
    pageSize: 100,
  });

  // Tüm veriyi atıyoruz (burada setState yok, sadece ilk kullanım).
  const [homeworkData] = useState<ScheduledAssignmentData[]>(
    scheduledAssignmentsData
  );

  // Temayı Redux'tan alıyoruz
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  // Tema değiştiğinde yeniden render tetiklemek için:
  const [, forceUpdate] = useState({});
  useEffect(() => {
    forceUpdate({});
  }, [isDark]);

  // Temel stil sabitleri
  const background = isDark ? "#19191C" : "#FFFFFF";
  const borderStyle = `1px solid ${isDark ? "#374151" : "#E6EFF3"}`;

  // Header styling
  const headerStyle = {
    height: "26px",
    textAlign: "center" as const,
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: 700,
    color: "#9e5cf7",
    background: "#9e5cf71a",
    border: borderStyle,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  // Hücrelerin ortak stil tanımları
  const cellTextStyle = {
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "150%",
    border: borderStyle,
  };

  const leftAlignedCellStyle = {
    width: "250px",
    padding: "0px 10px",
    textAlign: "left" as const,
    ...cellTextStyle,
  };

  const centeredCellStyle = {
    textAlign: "center" as const,
    ...cellTextStyle,
  };

  // Tablo başlıkları
  const headers = [
    [
      {
        content: "Ders/Ünite/Kazanım",
        isHeader: true,
        style: {
          ...headerStyle,
          width: "250px",
          textAlign: "left" as const,
          padding: "0px 10px",
        },
      },
      {
        content: "Durumum",
        isHeader: true,
        style: { ...headerStyle, width: "80px" },
      },
      {
        content: "Öğretmen",
        isHeader: true,
        style: { ...headerStyle, width: "120px" },
      },
      {
        content: "Kaynak",
        isHeader: true,
        style: { ...headerStyle, width: "120px" },
      },
      {
        content: "Başlangıç",
        isHeader: true,
        style: { ...headerStyle, width: "100px" },
      },
      {
        content: "Bitiş",
        isHeader: true,
        style: { ...headerStyle, width: "100px" },
      },
      {
        content: "Durum",
        isHeader: true,
        style: { ...headerStyle, width: "100px" },
      },
    ],
  ];

  // Tüm satırları oluşturuyoruz
  const rows = homeworkData.map((subject) => ({
    id: `subject-${subject.id}`,
    isAccordion: true,
    isOpenDefault: false,
    cells: [
      {
        content: subject.lessons?.[0]?.lesson?.name || "",
        isAccordion: true,
        style: {
          ...leftAlignedCellStyle,
          background,
          color: isDark ? "#E2E8F0" : "#000",
        },
      },
      // Status
      {
        content: subject.status?.toString() || "",
        style: {
          ...centeredCellStyle,
          width: "80px",
          background,
          color: isDark ? "#E2E8F0" : "#000",
        },
      },
      // Teacher
      {
        content: subject.teacher?.name_surname || "",
        style: {
          ...centeredCellStyle,
          width: "120px",
          background,
          color: isDark ? "#E2E8F0" : "#000",
        },
      },
      // Source
      {
        content: subject.source?.name || "",
        style: {
          ...centeredCellStyle,
          width: "120px",
          background,
          color: isDark ? "#E2E8F0" : "#000",
        },
      },
      // Start Date
      {
        content: subject.start_date || "",
        style: {
          ...centeredCellStyle,
          width: "100px",
          background,
          color: isDark ? "#E2E8F0" : "#000",
        },
      },
      // End Date
      {
        content: subject.end_date || "",
        style: {
          ...centeredCellStyle,
          width: "100px",
          background,
          color: isDark ? "#E2E8F0" : "#000",
        },
      },
      // Final Status
      {
        content: subject.status?.toString() || "",
        style: {
          ...centeredCellStyle,
          width: "100px",
          background,
          color: isDark ? "#E2E8F0" : "#000",
        },
      },
    ],
    // Lesson düzeyinde children
    children:
      subject.lessons?.map((lesson) => ({
        id: `unit-${lesson.lesson?.id}`,
        isAccordion: true,
        cells: [
          {
            content: lesson.units?.[0]?.unit?.name || "",
            isAccordion: true,
            style: {
              ...leftAlignedCellStyle,
              background,
              padding: "0px 20px",
              color: isDark ? "#E2E8F0" : "#000",
            },
          },
          // Unit seviyesi için boş hücreler
          ...Array(6).fill({
            content: "",
            style: {
              ...centeredCellStyle,
              background,
              color: isDark ? "#E2E8F0" : "#000",
            },
          }),
        ],
        children:
          lesson.units?.flatMap(
            (unit) =>
              unit.chapters?.flatMap(
                (chapter) =>
                  chapter.topics?.flatMap(
                    (topic) =>
                      // Achievement bazında TableRow dönüyoruz
                      topic.achievements?.map((achievement) => ({
                        id: `achievement-${achievement?.id}`,
                        cells: [
                          {
                            content: achievement?.name || "",
                            style: {
                              ...leftAlignedCellStyle,
                              background,
                              padding: "0px 55px",
                              color: isDark ? "#E2E8F0" : "#000",
                            },
                          },
                          ...Array(6).fill({
                            content: "",
                            style: {
                              ...centeredCellStyle,
                              background,
                              color: isDark ? "#E2E8F0" : "#000",
                            },
                          }),
                        ],
                      })) ?? []
                  ) ?? []
              ) ?? []
          ) ?? [],
      })) ?? [],
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
        key={`table-${isDark ? "dark" : "light"}`}
      />
    </div>
  );
};

export default PositionmatikTable;
