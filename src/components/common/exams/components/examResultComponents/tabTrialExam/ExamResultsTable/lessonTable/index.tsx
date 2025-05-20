import React from "react";
import LessonTableHeader from "./LessonTableHeader.tsx";
import { Result } from "../../../../../../../../types/exam/quiz_table.ts";
import LessonRow from "./LessonRow.tsx";
import TotalRow from "./TotalRow.tsx";

type LessonsTableProps = {
  results: Result[];
  quiz_type_id: number;
};

const LessonsTable: React.FC<LessonsTableProps> = ({
  results,
  quiz_type_id,
}) => {
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
        <LessonTableHeader quiz_type_id={quiz_type_id} />
        <tbody>
          {quiz_type_id === 1 ||
          quiz_type_id === 2 ||
          quiz_type_id === 3 ||
          quiz_type_id === 4
            ? results.map(({ quiz_name, lessons }) => {
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
                      />
                    ))}
                    <TotalRow lessons={lessons} showQuizColumn={false} />
                  </React.Fragment>
                );
              })
            : allLessons.map((lesson) => (
                <LessonRow
                  key={lesson.lesson_id}
                  quizName={""}
                  lesson={lesson}
                  showQuizName={false}
                  rowSpan={1}
                  showQuizColumn={false}
                />
              ))}
          {![1, 2, 3, 4].includes(quiz_type_id) && (
            <TotalRow lessons={allLessons} showQuizColumn={false} />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LessonsTable;
