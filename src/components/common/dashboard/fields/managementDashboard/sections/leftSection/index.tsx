import React from "react";
import { Col, Row } from "react-bootstrap";

import { ApexOptions } from "apexcharts";

import {
  Analysis,
  DailyClassSchedule,
  HomeworkStatusAnalysis,
  NumberOfInternalAndExternalRecordsByMonth,
  NumberOfMaleAndFemaleStudent,
  PeriodicComparison,
  StaffLeaveTrackingTable,
  Supplier,
  TrialExamScoreDistribution,
  UpcomingTasksAndReminder,
  WeeklyFoodsMenu,
} from "../../../../type.ts";
import CardsRow from "../../../../components/CardsRow.tsx";
import TrialExamScoreDistributionChart from "../../../../components/TrialExamScoreDistributionChart.tsx";
import UpcomingTasksAndRemindersTable from "../../../../components/UpcomingTasksAndRemindersTable.tsx";
import CourseSuccessAnalysisChart from "../../../../components/CourseSuccessAnalysisChart.tsx";
import WeeklyShiftScheduleTable from "../../../../components/WeeklyShiftScheduleTable.tsx";
import WeeklyFoodMenuRow from "../../../../components/WeeklyFoodMenuRow.tsx";
import HomeworkStatusAnalysisChart from "../../../../components/HomeworkStatusAnalysisChart.tsx";
import DailyCourseScheduleTable from "../../../../components/DailyCourseScheduleTable.tsx";
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
  weeklyDutySchedule: any[];
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  courseSuccessAnalysis,
  upcomingTasksAndReminders,
  weeklyFoodsMenu,
  homeworkStatusAnalysis,
  trialExamScoreDistribution,
  dailyCourseSchedule,
  weeklyDutySchedule,
}) => {
  return (
    <Row>
      {/* Kartlar (4 adet) */}

      <CardsRow cardsData={cardsData} />
      <Col xxl={6}>
        {/* Deneme sınavı Puan Dağılımı*/}
        <TrialExamScoreDistributionChart data={trialExamScoreDistribution} />
        {/* Personel İzin Takip Tablosu ve Takvim - Yan Yana */}
        <UpcomingTasksAndRemindersTable
          upcomingTasksAndReminders={upcomingTasksAndReminders}
        />
        {/* Ders Basarı analizi*/}
        <CourseSuccessAnalysisChart
          courseSuccessAnalysis={courseSuccessAnalysis}
        />
        <WeeklyShiftScheduleTable data={weeklyDutySchedule} />
      </Col>

      <Col xxl={6} xl={6}>
        {/* günlük ders calıssma programı  */}
        <DailyCourseScheduleTable data={dailyCourseSchedule} />
        <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu} />

        {/* Ödev Durumu Analizi */}
        <HomeworkStatusAnalysisChart
          homeworkStatusAnalysis={homeworkStatusAnalysis}
        />

        <Calendar />
      </Col>
    </Row>
  );
};

export default LeftSection;
