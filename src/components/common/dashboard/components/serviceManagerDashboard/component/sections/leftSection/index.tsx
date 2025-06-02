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
import WageStatusChart from "./WageStatusChart";
import ServiceRouteTimePerformanceChart from "./ServiceRouteTimePerformanceChart";
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
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  serviceRouteTimePerformance,
}) => {
  return (
    <Row>
      <CardsRow cardsData={cardsData} />
      <Col xxl={8}>
        {/* Servis güzergahı zaman performansı grafiği */}
         <ServiceRouteTimePerformanceChart serviceRoute={serviceRouteTimePerformance} /> 
   
      </Col>

      <Col xxl={4}>
    {/* ücret planı durumu */}
        <WageStatusChart wageStatus={[]}/>
  
      </Col>
    </Row>
  );
};

export default LeftSection;
