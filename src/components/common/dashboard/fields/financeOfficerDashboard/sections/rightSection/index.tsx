import React from "react";
import { Row } from "react-bootstrap";
import { DailyBulletin, HomeworkStatusAnalysis, NumberOfCompletedAssignment, WeeklyFoodsMenu } from "../../../../type.ts";
import WeeklyFoodMenuRow from "../../../../components/WeeklyFoodMenuRow.tsx";
import InfoBoxRow from "../../../../components/InfoBoxRow.tsx";
import DailyAttendanceRow from "../../../../components/DailyAttendanceRow.tsx";
import CurrentBulletin from "../../../../components/CurrentBulletin.tsx";

interface RightSectionProps {
  isDark: boolean;
  attendanceData: any[];
  daily_bulletins:DailyBulletin[];
  numberOfFinalizedAssignments: NumberOfCompletedAssignment[];
  homeworkStatusAnalysis:HomeworkStatusAnalysis ;
  weeklyFoodsMenu: WeeklyFoodsMenu;
}

const RightSection: React.FC<RightSectionProps> = ({ isDark,weeklyFoodsMenu, attendanceData ,daily_bulletins}) => {
  return (
    <Row>
      <InfoBoxRow isDark={isDark} />
      <DailyAttendanceRow attendanceData={attendanceData} />
         <CurrentBulletin
        daily_bulletins={daily_bulletins} />
        {/* Haftalık yemek menüsü */}
        <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu} />
    </Row>
  );
};

export default RightSection;
