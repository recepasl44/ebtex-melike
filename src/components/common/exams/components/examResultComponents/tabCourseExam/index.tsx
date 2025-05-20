import { AnalysisData, courseExamData } from "../../../examResult/dummyData.ts";
import CourseExamTable from "./CourseExamTable/CourseExamTable.tsx";
import GainAnalysis from "./GainAnalysis";
import HeaderBanner from "./headerBlock.tsx/HeaderBlockBanner.tsx";

interface Props {
  data: typeof courseExamData;
}

const CourseExam: React.FC<Props> = ({ data }) => {
  const { quiz_name, student, classroom } = data;

  return (
    <div className="d-flex flex-column">
      <HeaderBanner
        quizName={quiz_name}
        studentName={`${student.first_name} ${student.last_name}`}
        className={classroom.name}
      />
      <CourseExamTable results={courseExamData.results} />
      <GainAnalysis data={AnalysisData}/>
    </div>
  );
};
export default CourseExam;
