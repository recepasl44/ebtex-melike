import React from "react";
import { Row } from "react-bootstrap";
import InfoBoxRow from "./InfoBoxRow";
import DailyAttendanceRow from "./DailyAttendanceRow";
import {
  DailyBulletin,
  HomeworkStatusAnalysis,
  NumberOfCompletedAssignment,
  NumberOfMaleAndFemaleStudent,
} from "../../../../../type";
import CurrentBulletin from "./CurrentBulletin";
import NumberofFinalizedAssignmentsChart from "./NumberofFinalizedAssignmentsChart";
import HomeworkStatusAnalysisChart from "../leftSection/HomeworkStatusAnalysisChart";

interface RightSectionProps {
  isDark: boolean;
  attendanceData: any[];
  daily_bulletins: DailyBulletin[];
  maleandfemaleStudentsCount: NumberOfMaleAndFemaleStudent[];
  numberOfFinalizedAssignments: NumberOfCompletedAssignment[];
  homeworkStatusAnalysis: HomeworkStatusAnalysis;
}

const RightSection: React.FC<RightSectionProps> = ({
  isDark,
  homeworkStatusAnalysis,
  numberOfFinalizedAssignments,
  attendanceData,
  daily_bulletins,
}) => {
  return (
    <Row>
      <InfoBoxRow isDark={isDark} />
      <DailyAttendanceRow attendanceData={attendanceData} />

      <NumberofFinalizedAssignmentsChart data={numberOfFinalizedAssignments} />
      <HomeworkStatusAnalysisChart
        homeworkStatusAnalysis={homeworkStatusAnalysis}
      />
      <CurrentBulletin daily_bulletins={daily_bulletins} />
    </Row>
  );
};

export default RightSection;
