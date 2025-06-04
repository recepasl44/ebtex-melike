import React from "react";
import { Col, Row } from "react-bootstrap";

import { ApexOptions } from "apexcharts";
import {
  Analysis,
  Appointment,
  ClassHourAttendanceSummary,
  DailyClassSchedule,
  ExamCountdownItem,
  GuidanceCounselingInterviewTable,
  HomeworkStatusAnalysis,
  NumberOfInternalAndExternalRecordsByMonth,
  NumberOfMaleAndFemaleStudent,
  PaymentAndFinancialInformation,
  PdrMeetingList,
  PeriodicComparison,
  PollTypeDistribution,
  ServiceRoutePlan,
  ServiceRouteTimePerformance,
  StaffLeaveTrackingTable,
  Status,
  Supplier,
  TrialExamScoreDistribution,
  UpcomingTasksAndReminder,
  WeeklyDutySchedule,
  WeeklyFoodsMenu,
  WeeklyLessonProgram,
} from "../../../../type.ts";

import CardsRow from "../../../../components/CardsRow.tsx";
import CourseSuccessAnalysisChart from "../../../../components/CourseSuccessAnalysisChart.tsx";
import Calendar from "../../../../components/Calendar.tsx";
import WeeklyFoodMenuRow from "../../../../components/WeeklyFoodMenuRow.tsx";
import HomeworkStatusAnalysisChart from "../../../../components/HomeworkStatusAnalysisChart.tsx";
import WeeklyCourseScheduleTable from "../../../../components/WeeklyCourseScheduleTable.tsx";
import GuidanceandCounselingInterviewTable from "../../../../components/GuidanceandCounselingInterviewTable.tsx";
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
  weeklyDutySchedule: WeeklyDutySchedule[];
  classHourAttendanceSummary: ClassHourAttendanceSummary[];
  upcomingAppointments: Appointment[];
  serviceRoute:ServiceRoutePlan[]
  serviceRouteTimePerformance: ServiceRouteTimePerformance[];
  courseSuccessAnalysisData: Analysis[];
  paymentAndFinancialInformation: PaymentAndFinancialInformation;
  weeklyLessonScheduleData:WeeklyLessonProgram[];
  guidanceAndCounselingInterviewList:GuidanceCounselingInterviewTable;
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  courseSuccessAnalysisData,
  weeklyFoodsMenu,
  homeworkStatusAnalysis,

  weeklyLessonScheduleData,
  guidanceAndCounselingInterviewList,
}) => {
  return (
    <Row>
      <CardsRow cardsData={cardsData} />
      <Col xxl={7}>
        {/* ders basarı analizi */}
         <CourseSuccessAnalysisChart courseSuccessAnalysis={courseSuccessAnalysisData} />
        {/* Takvim*/}
        <Calendar />
          {/* Rehberlik ve Danışmanlık Görüşmeleri Listesi */}
      <GuidanceandCounselingInterviewTable data={guidanceAndCounselingInterviewList} />
      </Col>

      <Col xxl={5}>
          {/* haftalık ders calısma programı */}
      
                <WeeklyCourseScheduleTable data={weeklyLessonScheduleData} />
    {/* haftalık yemek menüsü */}
        <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu} />
        {/* ödev durumu analizi */}
        <HomeworkStatusAnalysisChart homeworkStatusAnalysis={homeworkStatusAnalysis} />

      </Col>
    </Row>
  );
};

export default LeftSection;
