import React from "react";
import { Row } from "react-bootstrap";
import { DailyBulletin, HomeworkStatusAnalysis, NumberOfCompletedAssignment } from "../../../../type.ts";
import CurrentBulletin from "../../../../components/CurrentBulletin.tsx";
import InfoBoxRow from "../../../../components/InfoBoxRow.tsx";
interface RightSectionProps {
  isDark: boolean;
  attendanceData: any[];
  daily_bulletins:DailyBulletin[];
  numberOfFinalizedAssignments: NumberOfCompletedAssignment[];
  homeworkStatusAnalysis:HomeworkStatusAnalysis ;
}

const RightSection: React.FC<RightSectionProps> = ({ isDark, daily_bulletins}) => {
  return (
    <Row>
      <InfoBoxRow isDark={isDark} />
      <CurrentBulletin daily_bulletins={daily_bulletins} />
    </Row>
  );
};

export default RightSection;
