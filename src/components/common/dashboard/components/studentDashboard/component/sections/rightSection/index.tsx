import React from "react";
import { Row } from "react-bootstrap";
import InfoBoxRow from "./InfoBoxRow";
import DailyAttendanceRow from "./DailyAttendanceRow";
import {
  DailyBulletin,
  ExamCountdownItem,
  GuidanceCounselingInterviewTable,
  HomeworkStatusAnalysis,
  NumberOfCompletedAssignment,
  PollTypeDistribution,
} from "../../../../../type";
import ExamCountdown from "../leftSection/ExamCountdown";
import DistributionofPollingTypeChart from "../leftSection/DistributionofPollingTypeChart";
import GuidanceandCounselingInterviewTable from "../leftSection/GuidanceandCounselingInterviewTable";
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
  attendanceData,
  examCountdown,
  PollTypeDistribution,
}) => {
  return (
    <Row>
      <InfoBoxRow isDark={isDark} />
      <DailyAttendanceRow attendanceData={attendanceData} />
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
