import React from "react";
import { Row } from "react-bootstrap";
import InfoBoxRow from "./InfoBoxRow";
import DailyAttendanceRow from "./DailyAttendanceRow";
import { DailyBulletin, ExamCountdownItem, HomeworkStatusAnalysis, NumberOfCompletedAssignment } from "../../../../../type";
import ExamCountdown from "../leftSection/ExamCountdown";
interface RightSectionProps {
  isDark: boolean;
  attendanceData: any[];
  daily_bulletins:DailyBulletin[];
  numberOfFinalizedAssignments: NumberOfCompletedAssignment[];
  homeworkStatusAnalysis:HomeworkStatusAnalysis ;
  examCountdown: ExamCountdownItem[];
}

const RightSection: React.FC<RightSectionProps> = ({ isDark, attendanceData,examCountdown}) => {
  return (
    <Row>
      <InfoBoxRow isDark={isDark} />
      <DailyAttendanceRow attendanceData={attendanceData} />
      <ExamCountdown examCountdown={examCountdown} />
    </Row>
  );
};

export default RightSection;
