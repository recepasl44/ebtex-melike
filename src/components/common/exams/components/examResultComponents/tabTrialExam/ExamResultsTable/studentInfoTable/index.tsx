import React from "react";
import StudentInfoHeaderRow from "./StudentInfoHeaderRow.tsx";
import StudentInfoDataRow from "./StudentInfoDataRow.tsx";
import { QuizTableProps } from "../../../../../../../../types/exam/quiz_table.ts";

const StudentInfoTable: React.FC<QuizTableProps> = ({
  student,
  results,
  booklets,
  main_quiz_date,
  quiz_type_id, 
}) => (
  <div className="table-responsive">
    <table className="table table-dar">
      <thead className="table-light">
        <StudentInfoHeaderRow quiz_type_id={quiz_type_id} /> 
      </thead>
      <tbody>
        <StudentInfoDataRow
          student={student}
          results={results}
          booklets={booklets}
          main_quiz_date={main_quiz_date}
          quiz_type_id={quiz_type_id}
        />
      </tbody>
    </table>
  </div>
);

export default StudentInfoTable;