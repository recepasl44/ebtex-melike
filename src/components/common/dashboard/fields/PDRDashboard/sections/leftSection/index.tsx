import React from "react";
import { Col, Row } from "react-bootstrap";

import { ApexOptions } from "apexcharts";

import {
  Analysis,
  DailyClassSchedule,
  ExamCountdownItem,
  HomeworkStatusAnalysis,
  NumberOfInternalAndExternalRecordsByMonth,
  NumberOfMaleAndFemaleStudent,
  PdrMeetingList,
  PeriodicComparison,
  PollTypeDistribution,
  StaffLeaveTrackingTable,
  Status,
  Supplier,
  TrialExamScoreDistribution,
  UpcomingTasksAndReminder,
  WeeklyFoodsMenu,
} from "../../../../type.ts";
import CardsRow from "../../../../components/CardsRow.tsx";
import TrialExamScoreDistributionChart from "../../../../components/TrialExamScoreDistributionChart.tsx";
import CourseSuccessAnalysisChart from "../../../../components/CourseSuccessAnalysisChart.tsx";
import DailyCourseScheduleTable from "../../../../components/DailyCourseScheduleTable.tsx";

import WeeklyFoodMenuRow from "../../../../components/WeeklyFoodMenuRow.tsx";
import DistributionofPollingTypeChart from "../../../../components/DistributionofPollingTypeChart.tsx";

import Calendar from "../../../../components/Calendar.tsx";
interface LeftSectionProps {
  isDark: boolean;
  cardsData: any[];
  chartOptions: ApexOptions;
  chartSeries: ApexAxisChartSeries;
  weeklyFoodsMenu: WeeklyFoodsMenu;
  supplierPayments: Supplier[];
  periodicComprassion: PeriodicComparison;
  Number_of_internal_and_external_records_by_month: NumberOfInternalAndExternalRecordsByMonth;
  staffLeaveTracking: StaffLeaveTrackingTable[];
  courseSuccessAnalysis: Analysis[];
  upcomingTasksAndReminders: UpcomingTasksAndReminder[];
  maleandfemaleStudentsCount: NumberOfMaleAndFemaleStudent[];
  homeworkStatusAnalysis: HomeworkStatusAnalysis;
  trialExamScoreDistribution: TrialExamScoreDistribution[];
  dailyCourseSchedule: DailyClassSchedule[];
  serviceStatus: Status[];
  consultingMeetingList: PdrMeetingList[];
  attendanceTypeDistribution: PollTypeDistribution;
  examCountdown: ExamCountdownItem[];
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  courseSuccessAnalysis,
  weeklyFoodsMenu,
  trialExamScoreDistribution,
  dailyCourseSchedule,

  attendanceTypeDistribution,
}) => {
  return (
    <Row>
      {/* Kartlar (4 adet) */}
      <CardsRow cardsData={cardsData} />
      <Col xxl={6}>
        {/* Deneme sınavı Puan Dağılımı*/}
        <TrialExamScoreDistributionChart data={trialExamScoreDistribution} />
        {/* Ders Basarı analizi*/}

        <CourseSuccessAnalysisChart
          courseSuccessAnalysis={courseSuccessAnalysis}
        />
            <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu}/>

      </Col>

            <Col xxl={6} xl={6}>
                    <DailyCourseScheduleTable data={dailyCourseSchedule} />

            {/* Yoklama türü dağılımı */}
            <DistributionofPollingTypeChart data={attendanceTypeDistribution} />

            {/* Takvim */}
            <Calendar />

        </Col>
    </Row>
  );
};

export default LeftSection;
