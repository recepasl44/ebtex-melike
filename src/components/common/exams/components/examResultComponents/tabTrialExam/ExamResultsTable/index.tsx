import { QuizTableProps } from "../../../../../../../types/exam/quiz_table.ts";
import HeaderSection from "../../headerSection";
import LessonsTable from "./lessonTable";
import PointsTable from "./pointTable";
import StudentInfoTable from "./studentInfoTable";

const ExamResultsTable: React.FC<QuizTableProps> = (props) => {
  return (
    <div className=" my-4">
      <HeaderSection
        platform={{ ...props.platform, quiz_type_id: props.quiz_type_id }}
        quizType={props.quiz_type}
        quiz_type_id={props.quiz_type_id}
      />{" "}
      <StudentInfoTable {...props} />
      <LessonsTable results={props.results} quiz_type_id={props.quiz_type_id} />
      <PointsTable
        points={props.points}
        quiz_type_id={props.quiz_type_id}
        global_joined_number={props.global_joined_number}
      />
    </div>
  );
};

export default ExamResultsTable;
