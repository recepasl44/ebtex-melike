import React from "react";
import { QuizTableProps } from "../../../../../../../../types/exam/quiz_table.ts";

type Props = Pick<QuizTableProps, "student" | "results" | "booklets" | "main_quiz_date" | "quiz_type_id">;
const headerCellStyle: React.CSSProperties = {
  color: "#000",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
  height: "26px",
};
const StudentInfoDataRow: React.FC<Props> = ({ student, results, booklets, main_quiz_date, quiz_type_id }) => (
  <tr style={headerCellStyle}>
    <td> {student.first_name} {student.last_name}</td>
    <td>{student.identity_no}</td>
    <td>{student.class_name}</td>
    <td>{results[0]?.quiz_name || "N/A"}</td>
    {(quiz_type_id === 1 || quiz_type_id === 2 || quiz_type_id === 3 || quiz_type_id === 4 || quiz_type_id === 6) && (
      <td>{results[0]?.quiz_name || "N/A"}</td>
    )}
    <td>{booklets.map(b => b.name).join(" - ")}</td>
    <td>{main_quiz_date}</td>
  </tr>
);

export default StudentInfoDataRow;