import React from "react";
import { Row } from "react-bootstrap";
import { DailyBulletin, ExamCountdownItem, HomeworkStatusAnalysis, NumberOfCompletedAssignment, PollTypeDistribution } from "../../../../type.ts";
import CurrentBulletin from "../../../../components/CurrentBulletin.tsx";
import ExamCountdown from "../../../../components/ExamCountdown.tsx";
import InfoBoxRow from "../../../../components/InfoBoxRow.tsx";
import DistributionofPollingTypeChart from "../../../../components/DistributionofPollingTypeChart.tsx";
interface RightSectionProps {
  isDark: boolean;
  attendanceData: any[];
  daily_bulletins:DailyBulletin[];
  numberOfFinalizedAssignments: NumberOfCompletedAssignment[];
  homeworkStatusAnalysis:HomeworkStatusAnalysis ;
  examCountdown: ExamCountdownItem[];
  PollTypeDistribution: PollTypeDistribution
}

const RightSection: React.FC<RightSectionProps> = ({daily_bulletins, isDark,examCountdown,PollTypeDistribution}) => {
  return (
    <Row>
      <InfoBoxRow isDark={isDark} />
      <CurrentBulletin daily_bulletins={daily_bulletins} />
      <ExamCountdown examCountdown={examCountdown} />
            {/* Yoklama Türü Dağılımı */}
          <DistributionofPollingTypeChart data={PollTypeDistribution} />
    </Row>
  );
};

export default RightSection;
