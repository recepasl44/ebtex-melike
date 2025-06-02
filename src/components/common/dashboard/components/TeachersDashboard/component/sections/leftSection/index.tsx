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
  PdrMeetingList,
  PeriodicComparison,
  StaffLeaveTrackingTable,
  Status,
  Supplier,
  TrialExamScoreDistribution,
  UpcomingTasksAndReminder,
  WeeklyFoodsMenu,
} from "../../../../../type";
import CourseSuccessAnalysisChart from "./CourseSuccessAnalysisChart";
import TrialExamScoreDistributionChart from "./TrialExamScoreDistributionChart";
import ServicesStatusTable from "./ServicesStatusTable";
import ConsultingMeetingListstable from "./ConsultingMeetingListstable";
import Calendar from "../Calendar";
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
  serviceStatus: Status[];
  consultingMeetingList: PdrMeetingList[];
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  courseSuccessAnalysis,
  weeklyFoodsMenu,
  Number_of_internal_and_external_records_by_month,
  trialExamScoreDistribution,
  dailyCourseSchedule,
  serviceStatus,
  maleandfemaleStudentsCount,
  consultingMeetingList,
}) => {
  return (
    <Row>
      {/* Kartlar (4 adet) */}
      <CardsRow cardsData={cardsData} />
      <Col xxl={6}>
        {/* Deneme sınavı Puan Dağılımı*/}
        <TrialExamScoreDistributionChart data={trialExamScoreDistribution} />
        {/*  servis durumu */}
                        <ServicesStatusTable data={serviceStatus} />
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
           dailyCourseSchedule={dailyCourseSchedule}
           maleandfemaleStudentsCount={maleandfemaleStudentsCount}
      />
      {/*  Danışmanlık Görüşmeleri Listesi */}
      <Col xxl={12} xl={12}>
      <ConsultingMeetingListstable data={consultingMeetingList} />
      </Col>
      {/* Ders basarı analizi ve takvim */}
      <Row xxl={12} xl={12}>
        <Col xxl={6} xl={6}>
          <CourseSuccessAnalysisChart courseSuccessAnalysis={courseSuccessAnalysis} />
        </Col>
        <Col xxl={6} xl={6}>
          <Calendar />
        </Col>
      </Row>

    </Row>
  );
};

export default LeftSection;
