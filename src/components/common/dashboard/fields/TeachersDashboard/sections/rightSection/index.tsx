import React from "react";
import { Row } from "react-bootstrap";
import {
  DailyBulletin,
  HomeworkStatusAnalysis,
  NumberOfCompletedAssignment,
  NumberOfMaleAndFemaleStudent,
} from "../../../../type.ts";
import NumberofFinalizedAssignmentsChart from "../../../../components/NumberofFinalizedAssignmentsChart.tsx";
import HomeworkStatusAnalysisChart from "../../../../components/HomeworkStatusAnalysisChart.tsx";
import InfoBoxRow from "../../../../components/InfoBoxRow.tsx";
import DailyAttendanceRow from "../../../../components/DailyAttendanceRow.tsx";
import CurrentBulletin from "../../../../components/CurrentBulletin.tsx";

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
