import React from "react";
import { Table } from "react-bootstrap";

interface LessonResult {
  lesson: string;
  lesson_results: {
    question: string;
    correct: number;
    wrong: number;
    empty: number;
    net: number;
    success_point: number;
    class_success_rate: number;
    branch_success_rate: number;
  };
}

interface Props {
  results: LessonResult[];
}

const headerStyle = {
  backgroundColor: "#dbddfa",
  color: "#5c67f7",
  textAlign: "center" as const,
  verticalAlign: "middle" as const,
  whiteSpace: "nowrap" as const,
  padding: "0 5px",
  height: "24px",
  lineHeight: "24px",
  minHeight: "24px",
  maxHeight: "24px",
  overflow: "hidden",
  border: "1px solid #E6EFF3",
};

const CourseExamTable: React.FC<Props> = ({ results }) => {
  return (
    <Table bordered hover responsive className="text-center align-middle">
      <thead>
        <tr>
          {[
            "Dersler",
            "Soru",
            "Doğru",
            "Yanlış",
            "Boş",
            "Net",
            "Başarı Puanı",
            "Sınıf Başarı Puanı",
            "Kurum Başarı Puanı",
          ].map((header, index) => (
            <th key={index} style={headerStyle}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {results.map((item, index) => (
          <tr key={index}>
            <td>{item.lesson}</td>
            <td>{item.lesson_results.question}</td>
            <td>{item.lesson_results.correct}</td>
            <td>{item.lesson_results.wrong}</td>
            <td>{item.lesson_results.empty}</td>
            <td>{item.lesson_results.net.toFixed(2)}</td>
            <td>{item.lesson_results.success_point}</td>
            <td>{item.lesson_results.class_success_rate}</td>
            <td>{item.lesson_results.branch_success_rate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CourseExamTable;