import React from "react";
import { Col, Row } from "react-bootstrap";

import { ApexOptions } from "apexcharts";
import CardsRow from "./CardsRow";
import WeeklyFoodAndAttendance from "./WeeklyFoodAndAttendance";
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
} from "../../../../../type";
import CourseSuccessAnalysisChart from "./CourseSuccessAnalysisChart";
import UpcomingTasksAndRemindersTable from "./UpcomingTasksAndRemindersTable";
import TrialExamScoreDistributionChart from "./TrialExamScoreDistributionChart";
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
  maleandfemaleStudentsCount: NumberOfMaleAndFemaleStudent[]
  homeworkStatusAnalysis: HomeworkStatusAnalysis;
  trialExamScoreDistribution: TrialExamScoreDistribution[];
  dailyCourseSchedule: DailyClassSchedule[];
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  courseSuccessAnalysis,
  upcomingTasksAndReminders,
  weeklyFoodsMenu,
  Number_of_internal_and_external_records_by_month,
  homeworkStatusAnalysis,
  trialExamScoreDistribution,
  dailyCourseSchedule,
}) => {
  return (
    <Row>
      {/* Kartlar (4 adet) */}
      <CardsRow cardsData={cardsData} />
      <Col xxl={6}>
        {/* Deneme sınavı Puan Dağılımı*/}
        <TrialExamScoreDistributionChart data={trialExamScoreDistribution} />
        {/* Personel İzin Takip Tablosu ve Takvim - Yan Yana */}
        <UpcomingTasksAndRemindersTable upcomingTasksAndReminders={upcomingTasksAndReminders}/>
        {/* Ders Basarı analizi*/}
        <CourseSuccessAnalysisChart
          courseSuccessAnalysis={courseSuccessAnalysis}
        />
      </Col>



      {/* Haftalık Menü ve Günlük Devam Verisi */}
      <WeeklyFoodAndAttendance
        weeklyFoodsMenu={weeklyFoodsMenu}
        Number_of_internal_and_external_records_by_month={
          Number_of_internal_and_external_records_by_month
        }
          homeworkStatusAnalysis={homeworkStatusAnalysis}
           dailyCourseSchedule={dailyCourseSchedule}
      />
   
    </Row>
  );
};

export default LeftSection;
