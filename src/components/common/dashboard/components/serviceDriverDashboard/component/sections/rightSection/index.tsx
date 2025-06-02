import React from "react";
import { Row } from "react-bootstrap";
import InfoBoxRow from "./InfoBoxRow";
import DailyAttendanceRow from "./DailyAttendanceRow";
import { DailyBulletin, HomeworkStatusAnalysis, NumberOfCompletedAssignment } from "../../../../../type";
interface RightSectionProps {
  isDark: boolean;
  attendanceData: any[];
  daily_bulletins:DailyBulletin[];
  numberOfFinalizedAssignments: NumberOfCompletedAssignment[];
  homeworkStatusAnalysis:HomeworkStatusAnalysis ;
}

const RightSection: React.FC<RightSectionProps> = ({ isDark, attendanceData}) => {
  return (
    <Row>
      <InfoBoxRow isDark={isDark} />
      <DailyAttendanceRow attendanceData={attendanceData} />
    </Row>
  );
};

export default RightSection;
