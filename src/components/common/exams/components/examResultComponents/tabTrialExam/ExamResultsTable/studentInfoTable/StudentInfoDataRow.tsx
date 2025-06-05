import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../../store";
import { QuizTableProps } from "../../../../../../../../types/exam/quiz_table.ts";

type Props = Pick<QuizTableProps, "student" | "results" | "booklets" | "main_quiz_date" | "quiz_type_id">;

const StudentInfoDataRow: React.FC<Props> = ({ student, results, booklets, main_quiz_date, quiz_type_id }) => {
  // Redux Store'dan dark/light bilgisi
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  // Base data cell style with theme-dependent properties
  const dataCellStyle: React.CSSProperties = {
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
      ...dataCellStyle,
      width: "180.212px",
    },
    tcNo: {
      ...dataCellStyle,
      width: "166.117px",
    },
    class: {
      ...dataCellStyle,
      width: "92.623px",
    },
    examName: {
      ...dataCellStyle,
      width: "165.11px",
    },
    bookletType: {
      ...dataCellStyle,
      width: "92.623px",
    },
    date: {
      ...dataCellStyle,
      width: "91.616px",
    }
  };

  return (
    <tr>
      <td style={columnStyles.name}>{student.first_name} {student.last_name}</td>
      <td style={columnStyles.tcNo}>{student.identity_no}</td>
      <td style={columnStyles.class}>{student.class_name}</td>
      <td style={columnStyles.examName}>{results[0]?.quiz_name || "N/A"}</td>
      {(quiz_type_id === 1 || quiz_type_id === 2 || quiz_type_id === 3 || quiz_type_id === 4 || quiz_type_id === 6) && (
        <td style={columnStyles.examName}>{results[0]?.quiz_name || "N/A"}</td>
      )}
      <td style={columnStyles.bookletType}>{booklets.map(b => b.name).join(" - ")}</td>
      <td style={columnStyles.date}>{main_quiz_date}</td>
    </tr>
  );
};

export default StudentInfoDataRow;
