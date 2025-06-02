import React from "react";
import { Row } from "react-bootstrap";
import InfoBoxRow from "./InfoBoxRow";
import DailyAttendanceRow from "./DailyAttendanceRow";
import { DailyBulletin, HomeworkStatusAnalysis, NumberOfCompletedAssignment, WeeklyFoodsMenu } from "../../../../../type";
import CurrentBulletin from "./CurrentBulletin";






interface RightSectionProps {
  isDark: boolean;
  attendanceData: any[];
  daily_bulletins:DailyBulletin[];
  numberOfFinalizedAssignments: NumberOfCompletedAssignment[];
  homeworkStatusAnalysis:HomeworkStatusAnalysis ;
  weeklyFoodsMenu: WeeklyFoodsMenu;
}

const RightSection: React.FC<RightSectionProps> = ({ isDark, attendanceData ,daily_bulletins}) => {
  return (
    <Row>
      <InfoBoxRow isDark={isDark} />
      <DailyAttendanceRow attendanceData={attendanceData} />
         <CurrentBulletin
        daily_bulletins={daily_bulletins} />
 
    </Row>
  );
};

export default RightSection;
