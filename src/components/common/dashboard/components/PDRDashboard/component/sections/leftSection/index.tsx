import React from "react";
import { Col, Row } from "react-bootstrap";

import { ApexOptions } from "apexcharts";
import CardsRow from "./CardsRow";
import WeeklyFoodAndAttendance from "./WeeklyFoodAndAttendance";
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
} from "../../../../../type";
import CourseSuccessAnalysisChart from "./CourseSuccessAnalysisChart";
import TrialExamScoreDistributionChart from "./TrialExamScoreDistributionChart";
import Calendar from "../Calendar";
import DailyCourseScheduleTable from "./DailyCourseScheduleTable";
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
  Number_of_internal_and_external_records_by_month,
  trialExamScoreDistribution,
  dailyCourseSchedule,
  examCountdown,
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
        <DailyCourseScheduleTable data={dailyCourseSchedule} />
      </Col>

      {/* Haftalık Menü ve Günlük Devam Verisi */}
      <WeeklyFoodAndAttendance
        weeklyFoodsMenu={weeklyFoodsMenu}
        Number_of_internal_and_external_records_by_month={
          Number_of_internal_and_external_records_by_month
        }
        attendanceTypeDistribution={attendanceTypeDistribution}
        examCountdown={examCountdown}
      />
      {/* Ders basarı analizi ve takvim */}
      <Row xxl={12} xl={12}>
        <Col xxl={6} xl={6}>
          <CourseSuccessAnalysisChart
            courseSuccessAnalysis={courseSuccessAnalysis}
          />
        </Col>
        <Col xxl={6} xl={6}>
          <Calendar />
        </Col>
      </Row>
    </Row>
  );
};

export default LeftSection;
