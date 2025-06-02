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
} from "../../../../../type";
import CourseSuccessAnalysisChart from "./CourseSuccessAnalysisChart";
import Calendar from "../Calendar";
import WeeklyFoodMenuRow from "./WeeklyFoodMenuRow";
import HomeworkStatusAnalysisChart from "./HomeworkStatusAnalysisChart";
import PaymentandFinancialInformationTable from "./PaymentandFinancialInformationTable";
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
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  courseSuccessAnalysisData,
  weeklyFoodsMenu,
  homeworkStatusAnalysis,
  paymentAndFinancialInformation,
}) => {
  return (
    <Row>
      <CardsRow cardsData={cardsData} />
      <Col xxl={7}>
        {/* ders basarı analizi */}
         <CourseSuccessAnalysisChart courseSuccessAnalysis={courseSuccessAnalysisData} /> 
        {/* Takvim*/}
        <Calendar />
      </Col>

      <Col xxl={5}>
    {/* haftalık yemek menüsü */}
        <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu} />
        {/* ödev durumu analizi */}
        <HomeworkStatusAnalysisChart homeworkStatusAnalysis={homeworkStatusAnalysis} />
        {/* ödeme ve Finansal Bilgiler */}
        <PaymentandFinancialInformationTable paymentInformation={paymentAndFinancialInformation} />
  
      </Col>
    </Row>
  );
};

export default LeftSection;
