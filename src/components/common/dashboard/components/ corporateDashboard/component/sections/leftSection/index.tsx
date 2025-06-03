import React from "react";
import { Col, Row } from "react-bootstrap";

import { ApexOptions } from "apexcharts";
import CardsRow from "./CardsRow";
import WeeklyFoodAndAttendance from "./WeeklyFoodAndAttendance";
import {
  Analysis,
  HomeworkStatusAnalysis,
  NumberOfInternalAndExternalRecordsByMonth,
  NumberOfMaleAndFemaleStudent,
  PeriodicComparison,
  StaffLeaveTrackingTable,
  Supplier,
  UpcomingTasksAndReminder,
  WeeklyFoodsMenu,
} from "../../../../../type";
import CourseSuccessAnalysisChart from "./CourseSuccessAnalysisChart";
import UpcomingTasksAndRemindersTable from "./UpcomingTasksAndRemindersTable";
import MaleandfemaleStudentsCountChart from "./MaleandfemaleStudentsCountChart";
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
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  courseSuccessAnalysis,
  upcomingTasksAndReminders,
  weeklyFoodsMenu,
  Number_of_internal_and_external_records_by_month,
  maleandfemaleStudentsCount,
  homeworkStatusAnalysis,
}) => {
  return (
    <Row>
      {/* Kartlar (4 adet) */}
      <CardsRow cardsData={cardsData} />
      <Col xxl={8}>
        {/* Ders Başarı Analizi*/}
        <CourseSuccessAnalysisChart courseSuccessAnalysis={courseSuccessAnalysis}/>
        {/* Personel İzin Takip Tablosu ve Takvim - Yan Yana */}
        <UpcomingTasksAndRemindersTable upcomingTasksAndReminders={upcomingTasksAndReminders}/>
        {/* Kız ve erkek öğrenci sayıları */}
        <MaleandfemaleStudentsCountChart maleandfemaleStudentsCount={maleandfemaleStudentsCount} />
      </Col>
      {/* Haftalık Menü ve Günlük Devam Verisi */}
      <WeeklyFoodAndAttendance
        weeklyFoodsMenu={weeklyFoodsMenu}
        Number_of_internal_and_external_records_by_month={
          Number_of_internal_and_external_records_by_month
        }
          homeworkStatusAnalysis={homeworkStatusAnalysis}

      />
    </Row>
  );
};

export default LeftSection;
