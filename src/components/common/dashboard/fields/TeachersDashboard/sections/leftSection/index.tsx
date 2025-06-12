import React from "react";
import { Col, Row } from "react-bootstrap";

import { ApexOptions } from "apexcharts";
import CardsRow from "../../../../components/CardsRow.tsx";
import {
  Analysis,
  DailyClassSchedule,
  ExamCountdownItem,
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
  WeeklyLessonProgram,
} from "../../../../type.ts";
import CourseSuccessAnalysisChart from "../../../../components/CourseSuccessAnalysisChart.tsx";

import ConsultingMeetingListstable from "../../../../components/ConsultingMeetingListstable.tsx";
import ExamCountdown from "../../../../components/ExamCountdown.tsx";
import TrialExamScoreDistributionChart from "../../../../components/TrialExamScoreDistributionChart.tsx";
import ServicesStatusTable from "../../../../components/ServicesStatusTable.tsx";
import Calendar from "../../../../components/Calendar.tsx";
import PersonnelTaskDistribution from "../../../../components/PersonnelTaskDistribution.tsx";
import WeeklyCourseScheduleTable from "../../../../components/WeeklyCourseScheduleTable.tsx";
import WeeklyFoodMenuRow from "../../../../components/WeeklyFoodMenuRow.tsx";
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
  trialExamScoreDistribution: TrialExamScoreDistribution[];
  dailyCourseSchedule: DailyClassSchedule[];
  serviceStatus: Status[];
  consultingMeetingList: PdrMeetingList[];
  staffTaskDistribution: any[];
  examCountdown: ExamCountdownItem[];
  weeklyDutySchedule?: WeeklyLessonProgram[];
  weeklyLessonProgram: WeeklyLessonProgram[];
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  courseSuccessAnalysis,
  weeklyFoodsMenu,
  trialExamScoreDistribution,
  serviceStatus,
  consultingMeetingList,
  staffTaskDistribution,
  examCountdown,
  weeklyLessonProgram,
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
      </Col>

      <Col xxl={6} xl={6}>
        {/* Haftalık Ders Programı */}
        <WeeklyCourseScheduleTable data={weeklyLessonProgram} />
        <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu} />
      </Col>
      <Row xxl={12} xl={12}>
        {/*  Danışmanlık Görüşmeleri Listesi */}
        <Col xxl={6} xl={6}>
          <ConsultingMeetingListstable data={consultingMeetingList} />
        </Col>
        <Col xxl={6} xl={6}>
          <ExamCountdown examCountdown={examCountdown} />
        </Col>
      </Row>
      {/* Personel İzin Takibi */}
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

      {/* Personel Görev Dağılımı*/}
      <PersonnelTaskDistribution
        personnelTaskDistribution={staffTaskDistribution}
      />
    </Row>
  );
};

export default LeftSection;
