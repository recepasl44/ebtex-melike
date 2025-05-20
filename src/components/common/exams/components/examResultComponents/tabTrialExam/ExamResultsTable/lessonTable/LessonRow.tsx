import React from "react";
import { Lesson } from "../../../../../../../../types/exam/quiz_table.ts";

type LessonRowProps = {
  quizName: string;
  lesson: Lesson;
  showQuizName: boolean;
  rowSpan: number;
  showQuizColumn: boolean;
};

const cellStyle: React.CSSProperties = {
  width: "118px",
  height: "26px",
  textAlign: "center",
  verticalAlign: "middle",
};

const lessonNameCellStyle: React.CSSProperties = {
  ...cellStyle,
  textAlign: "left", 
};

const LessonRow: React.FC<LessonRowProps> = ({
  quizName,
  lesson,
  showQuizName,
  rowSpan,
  showQuizColumn,
}) => {
  return (
    <tr>
      {showQuizColumn && showQuizName && (
        <td rowSpan={rowSpan} style={cellStyle}>
          {quizName}
        </td>
      )}

      <td style={lessonNameCellStyle}>{lesson.lesson_name}</td>
      <td style={cellStyle}>{lesson.questions}</td>
      <td style={cellStyle}>{lesson.correct}</td>
      <td style={cellStyle}>{lesson.wrong}</td>
      <td style={cellStyle}>{lesson.empty}</td>
      <td style={cellStyle}>{lesson.net}</td>
      <td style={cellStyle}>{lesson.class_average_net}</td>
      <td style={cellStyle}>{lesson.branch_net}</td>
      <td style={cellStyle}>{lesson.general_net}</td>
    </tr>
  );
};

export default LessonRow;