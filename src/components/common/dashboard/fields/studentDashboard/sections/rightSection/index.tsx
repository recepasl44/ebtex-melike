import React from "react";
import { Row } from "react-bootstrap";
import {
  DailyBulletin,
  ExamCountdownItem,
  GuidanceCounselingInterviewTable,
  HomeworkStatusAnalysis,
  NumberOfCompletedAssignment,
  PollTypeDistribution,
} from "../../../../type.ts";
import CurrentBulletin from "../../../../components/CurrentBulletin.tsx";
import ExamCountdown from "../../../../components/ExamCountdown.tsx";
import DistributionofPollingTypeChart from "../../../../components/DistributionofPollingTypeChart.tsx";
import GuidanceandCounselingInterviewTable from "../../../../components/GuidanceandCounselingInterviewTable.tsx";
import InfoBoxRow from "../../../../components/InfoBoxRow.tsx";
interface RightSectionProps {
  isDark: boolean;
  attendanceData: any[];
  daily_bulletins: DailyBulletin[];
  numberOfFinalizedAssignments: NumberOfCompletedAssignment[];
  homeworkStatusAnalysis: HomeworkStatusAnalysis;
  examCountdown: ExamCountdownItem[];
  PollTypeDistribution: PollTypeDistribution;
  guidanceAndCounselingInterviewList: GuidanceCounselingInterviewTable;
}

const RightSection: React.FC<RightSectionProps> = ({
  isDark,
  guidanceAndCounselingInterviewList,
  examCountdown,
  PollTypeDistribution,
  daily_bulletins,
}) => {
  return (
    <Row>
      <InfoBoxRow isDark={isDark} />
      <CurrentBulletin daily_bulletins={daily_bulletins} />
      <ExamCountdown examCountdown={examCountdown} />
      {/* Yoklama Türü Dağılımı */}
      <DistributionofPollingTypeChart data={PollTypeDistribution} />
      {/* Rehberlik ve Danışmanlık Görüşmeleri Listesi */}
      <GuidanceandCounselingInterviewTable
        data={guidanceAndCounselingInterviewList}
      />
    </Row>
  );
};

export default RightSection;
