import React from "react";
import { Col, Row } from "react-bootstrap";

import { ApexOptions } from "apexcharts";
import CardsRow from "../../../../components/CardsRow.tsx";
import {
  Analysis,
  DailyClassSchedule,
  HomeworkStatusAnalysis,
  NumberOfInternalAndExternalRecordsByMonth,
  NumberOfMaleAndFemaleStudent,
  PeriodicComparison,
  Supplier,
  UpcomingTasksAndReminder,
  WeeklyFoodsMenu,
} from "../../../../type.ts";
import CourseSuccessAnalysisChart from "../../../../components/CourseSuccessAnalysisChart.tsx";
import UpcomingTasksAndRemindersTable from "../../../../components/UpcomingTasksAndRemindersTable.tsx";
import MaleandfemaleStudentsCountChart from "../../../../components/MaleandfemaleStudentsCountChart.tsx";
import HomeworkStatusAnalysisChart from "../../../../components/HomeworkStatusAnalysisChart.tsx";
import InternalExternalRecordByMonth from "../../../../components/InternalExternalRecordByMonth.tsx";
import DailyCourseScheduleTable from "../../../../components/DailyCourseScheduleTable.tsx";
interface LeftSectionProps {
  isDark: boolean;
  cardsData: any[];
  chartOptions: ApexOptions;
  chartSeries: ApexAxisChartSeries;
  weeklyFoodsMenu: WeeklyFoodsMenu;
  supplierPayments: Supplier[];
  periodicComprassion: PeriodicComparison;
  Number_of_internal_and_external_records_by_month: NumberOfInternalAndExternalRecordsByMonth;
  courseSuccessAnalysis: Analysis[];
  upcomingTasksAndReminders: UpcomingTasksAndReminder[];
  maleandfemaleStudentsCount: NumberOfMaleAndFemaleStudent[];
  homeworkStatusAnalysis: HomeworkStatusAnalysis;
  dailyCourseSchedule: DailyClassSchedule[];
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  courseSuccessAnalysis,
  upcomingTasksAndReminders,
  Number_of_internal_and_external_records_by_month,
  maleandfemaleStudentsCount,
  homeworkStatusAnalysis,
  dailyCourseSchedule,
}) => {
  return (
    <Row>
      {/* Kartlar (4 adet) */}
      <CardsRow cardsData={cardsData} />
      <Col xxl={6}>
        {/* Ders Başarı Analizi*/}
        <CourseSuccessAnalysisChart
          courseSuccessAnalysis={courseSuccessAnalysis}
        />
        {/* Yaklaşan Görevler ve Hatırlatmalar Tablosu */}
        <UpcomingTasksAndRemindersTable
          upcomingTasksAndReminders={upcomingTasksAndReminders}
        />
        {/* Kız ve erkek öğrenci sayıları */}
        <MaleandfemaleStudentsCountChart
          maleandfemaleStudentsCount={maleandfemaleStudentsCount}
        />
      </Col>
      {/* günlük ders programı Ödev Durumu Analizi */}
      <Col xxl={6}>
        {/* Günlük Ders Programı */}
        <DailyCourseScheduleTable data={dailyCourseSchedule} />

        {/* Ödev Durumu Analizi */}
        <HomeworkStatusAnalysisChart
          homeworkStatusAnalysis={homeworkStatusAnalysis}
        />
        {/* İç ve Dış Kayıtların Aylık Dağılımı */}
        <InternalExternalRecordByMonth
          Number_of_internal_and_external_records_by_monthData={
            Number_of_internal_and_external_records_by_month
          }
        />
      </Col>
    </Row>
  );
};
export default LeftSection;
