import React from "react";
import { Col, Row } from "react-bootstrap";

import { ApexOptions } from "apexcharts";
import {
  Analysis,
  Appointment,
  ClassHourAttendanceSummary,
  DailyClassSchedule,
  ExamCountdownItem,
  HomeworkStatusAnalysis,
  NumberOfCompletedAssignment,
  NumberOfInternalAndExternalRecordsByMonth,
  NumberOfMaleAndFemaleStudent,
  PaymentAndFinancialInformation,
  PdrMeetingList,
  PeriodicComparison,
  PollTypeDistribution,
  ServiceInformation,
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
import ServiceInformationTable from "../../../../components/ServiceInformationTable.tsx";
import CardsRow from "../../../../components/CardsRow.tsx";
import CourseSuccessAnalysisChart from "../../../../components/CourseSuccessAnalysisChart.tsx";
import Calendar from "../../../../components/Calendar.tsx";
import TrialExamScoreDistributionChart from "../../../../components/TrialExamScoreDistributionChart.tsx";
import WeeklyFoodMenuRow from "../../../../components/WeeklyFoodMenuRow.tsx";
import HomeworkStatusAnalysisChart from "../../../../components/HomeworkStatusAnalysisChart.tsx";
import NumberofFinalizedAssignmentsChart from "../../../../components/NumberofFinalizedAssignmentsChart.tsx";
import WeeklyCourseScheduleTable from "../../../../components/WeeklyCourseScheduleTable.tsx";
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
  numberOfFinalizedAssignments: NumberOfCompletedAssignment[];
  serviceInformation: ServiceInformation[];
  weeklyLessonScheduleData:WeeklyLessonProgram[]
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  courseSuccessAnalysisData,
  weeklyFoodsMenu,
  homeworkStatusAnalysis,
  numberOfFinalizedAssignments,
  trialExamScoreDistribution,
  serviceInformation,
  weeklyLessonScheduleData,
}) => {
  return (
    <Row>
      <CardsRow cardsData={cardsData} />
      <Col xxl={7}>
        {/* ders basarı analizi */}
         <CourseSuccessAnalysisChart courseSuccessAnalysis={courseSuccessAnalysisData} />
        {/* Takvim*/}
        <Calendar />
          {/*Deneme Sınavları Puan Dağılımı */}
                  <TrialExamScoreDistributionChart
                    data={trialExamScoreDistribution}
                  />
                      {/* Servis Bilgileri */}
        <ServiceInformationTable serviveInformation={serviceInformation}  />
      </Col>

      <Col xxl={5}>
                <WeeklyCourseScheduleTable data={weeklyLessonScheduleData} />
      
    {/* haftalık yemek menüsü */}
        <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu} />
        {/* ödev durumu analizi */}
        <HomeworkStatusAnalysisChart homeworkStatusAnalysis={homeworkStatusAnalysis} />
    {/*Sonuçlanan Ödev Sayıları */}
          <NumberofFinalizedAssignmentsChart data={numberOfFinalizedAssignments} />

      </Col>
    </Row>
  );
};

export default LeftSection;
