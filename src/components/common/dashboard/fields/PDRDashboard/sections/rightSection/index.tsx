import React from "react";
import { Row } from "react-bootstrap";
import InfoBoxRow from "./InfoBoxRow.tsx";
import DailyAttendanceRow from "./DailyAttendanceRow.tsx";
import { DailyBulletin, HomeworkStatusAnalysis, NumberOfCompletedAssignment, NumberOfMaleAndFemaleStudent } from "../../../../type.ts";
import CurrentBulletin from "./CurrentBulletin.tsx";
import MaleandfemaleStudentsCountChart from "../../../../components/MaleandfemaleStudentsCountChart.tsx";





interface RightSectionProps {
  isDark: boolean;
  attendanceData: any[];
  daily_bulletins:DailyBulletin[];
  maleandfemaleStudentsCount:NumberOfMaleAndFemaleStudent[];
  numberOfFinalizedAssignments: NumberOfCompletedAssignment[];
  homeworkStatusAnalysis:HomeworkStatusAnalysis ;
}

const RightSection: React.FC<RightSectionProps> = ({ isDark, attendanceData ,daily_bulletins,maleandfemaleStudentsCount}) => {
  return (
    <Row>
      <InfoBoxRow isDark={isDark} />
      <DailyAttendanceRow attendanceData={attendanceData} />
         <CurrentBulletin
        daily_bulletins={daily_bulletins} />
      <MaleandfemaleStudentsCountChart maleandfemaleStudentsCount={maleandfemaleStudentsCount} />
    </Row>
  );
};

export default RightSection;
