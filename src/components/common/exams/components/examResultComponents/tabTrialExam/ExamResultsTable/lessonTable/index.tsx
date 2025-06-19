import React from "react";
      import { useSelector } from "react-redux";
      import LessonTableHeader from "./LessonTableHeader.tsx";
      import { Result } from "../../../../../../../../types/exam/quiz_table.ts";
      import LessonRow from "./LessonRow.tsx";
      import TotalRow from "./TotalRow.tsx";
      import { RootState } from "../../../../../../../../store";

      type LessonsTableProps = {
        results: Result[];
        quiz_type_id: number;
      };

      const LessonsTable: React.FC<LessonsTableProps> = ({
        results,
        quiz_type_id,
      }) => {
        // Redux Store'dan dark/light bilgisi
        const localVariable = useSelector((state: RootState) => state.ui);
        const isDark = localVariable.dataThemeMode === "dark";

        // Base cell style with shared and theme-dependent properties
        const baseTableCellStyle: React.CSSProperties = {
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
        };

        // Even row style
        const evenRowStyle: React.CSSProperties = {
          ...baseTableCellStyle,
          background: isDark ? "#1E293B" : "#FFF",
        };

        // Odd row style
        const oddRowStyle: React.CSSProperties = {
          ...baseTableCellStyle,
          background: isDark ? "#334155" : "#F9FAFC",
        };

        const showQuizColumn =
          quiz_type_id === 1 ||
          quiz_type_id === 2 ||
          quiz_type_id === 3 ||
          quiz_type_id === 4;
        const allLessons = results.flatMap((r) => r.lessons);
        console.log(results);

        return (
          <div className="table-responsive table-dar">
            <table
              className="table table-sm table-bordered text-center"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <LessonTableHeader quiz_type_id={quiz_type_id} cellStyle={baseTableCellStyle} />
              <tbody>
                {quiz_type_id === 1 ||
                quiz_type_id === 2 ||
                quiz_type_id === 3 ||
                quiz_type_id === 4
                  ? results.map(({ quiz_name, lessons }, resultIndex) => {
                      const rowSpan = lessons.length + 1;
                      return (
                        <React.Fragment key={quiz_name}>
                          {lessons.map((lesson, index) => (
                            <LessonRow
                              key={`${quiz_name}-${lesson.lesson_id}`}
                              quizName={quiz_name}
                              lesson={lesson}
                              showQuizName={showQuizColumn && index === 0}
                              rowSpan={rowSpan}
                              showQuizColumn={showQuizColumn}
                              cellStyle={(resultIndex + index) % 2 === 0 ? evenRowStyle : oddRowStyle}
                            />
                          ))}
                          <TotalRow
                            lessons={lessons}
                            showQuizColumn={false}
                            cellStyle={(resultIndex + lessons.length) % 2 === 0 ? evenRowStyle : oddRowStyle}
                          />
                        </React.Fragment>
                      );
                    })
                  : allLessons.map((lesson, index) => (
                      <LessonRow
                        key={lesson.lesson_id}
                        quizName={""}
                        lesson={lesson}
                        showQuizName={false}
                        rowSpan={1}
                        showQuizColumn={false}
                        cellStyle={index % 2 === 0 ? evenRowStyle : oddRowStyle}
                      />
                    ))}
                {![1, 2, 3, 4].includes(quiz_type_id) && (
                  <TotalRow
                    lessons={allLessons}
                    showQuizColumn={false}
                    cellStyle={allLessons.length % 2 === 0 ? evenRowStyle : oddRowStyle}
                  />
                )}
              </tbody>
            </table>
          </div>
        );
      };

      export default LessonsTable;
