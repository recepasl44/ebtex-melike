import React from "react";
import { Col, Row } from "react-bootstrap";

import { ApexOptions } from "apexcharts";
import CardsRow from "./CardsRow";
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
} from "../../../../../type";
import CourseSuccessAnalysisChart from "./CourseSuccessAnalysisChart";
import Calendar from "../Calendar";
import WeeklyFoodMenuRow from "./WeeklyFoodMenuRow";
import HomeworkStatusAnalysisChart from "./HomeworkStatusAnalysisChart";
import NumberofFinalizedAssignmentsChart from "../rightSection/NumberofFinalizedAssignmentsChart";
import TrialExamScoreDistributionChart from "./TrialExamScoreDistributionChart";
import ServiceInformationTable from "./ServiceInformationTable";
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
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  courseSuccessAnalysisData,
  weeklyFoodsMenu,
  homeworkStatusAnalysis,
  numberOfFinalizedAssignments,
  trialExamScoreDistribution,
  serviceInformation,
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
      </Col>

      <Col xxl={5}>
    {/* haftalık yemek menüsü */}
        <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu} />
        {/* ödev durumu analizi */}
        <HomeworkStatusAnalysisChart homeworkStatusAnalysis={homeworkStatusAnalysis} />
    {/*Sonuçlanan Ödev Sayıları */}
          <NumberofFinalizedAssignmentsChart data={numberOfFinalizedAssignments} />
    {/* Servis Bilgileri */}
        <ServiceInformationTable serviveInformation={serviceInformation}  />
      </Col>
    </Row>
  );
};

export default LeftSection;
