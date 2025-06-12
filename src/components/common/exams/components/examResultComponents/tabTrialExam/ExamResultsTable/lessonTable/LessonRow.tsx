import React from "react";
      import { Lesson } from "../../../../../../../../types/exam/quiz_table.ts";

      type LessonRowProps = {
        quizName: string;
        lesson: Lesson;
        showQuizName: boolean;
        rowSpan: number;
        showQuizColumn: boolean;
        cellStyle?: React.CSSProperties;
      };

      const LessonRow: React.FC<LessonRowProps> = ({
        quizName,
        lesson,
        showQuizName,
        rowSpan,
        showQuizColumn,
        cellStyle = {},
      }) => {
        // Base cell style with consistent text styling
        const baseCellStyle: React.CSSProperties = {
          width: "118px",
          height: "26px",
          textAlign: "center",
          verticalAlign: "middle",
          fontFamily: "Inter",
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
          padding: "8px",
          border: "1px solid #E6EFF3",
          backgroundColor: "#FFF",
          ...cellStyle,
        };

        // Lesson name cell with left alignment
        const lessonNameCellStyle: React.CSSProperties = {
          ...baseCellStyle,
          textAlign: "left",
          width: "146px",
        };

        // Quiz name cell style
        const quizNameCellStyle: React.CSSProperties = {
          ...baseCellStyle,
          width: "80px",
        };

        return (
          <tr>
            {showQuizColumn && showQuizName && (
              <td rowSpan={rowSpan} style={quizNameCellStyle}>
                {quizName}
              </td>
            )}

            <td style={lessonNameCellStyle}>{lesson.lesson_name}</td>
            <td style={{...baseCellStyle, width: "91px"}}>{lesson.questions}</td>
            <td style={{...baseCellStyle, width: "90px"}}>{lesson.correct}</td>
            <td style={{...baseCellStyle, width: "90px"}}>{lesson.wrong}</td>
            <td style={{...baseCellStyle, width: "89px"}}>{lesson.empty}</td>
            <td style={baseCellStyle}>{lesson.net}</td>
            <td style={baseCellStyle}>{lesson.class_average_net}</td>
            <td style={baseCellStyle}>{lesson.branch_net}</td>
            <td style={baseCellStyle}>{lesson.general_net}</td>
          </tr>
        );
      };

      export default LessonRow;
