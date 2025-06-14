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
  NumberOfInternalAndExternalRecordsByMonth,
  NumberOfMaleAndFemaleStudent,
  PdrMeetingList,
  PeriodicComparison,
  PollTypeDistribution,
  ServiceRoutePlan,
  StaffLeaveTrackingTable,
  Status,
  Status2,
  Supplier,
  TrialExamScoreDistribution,
  UpcomingTasksAndReminder,
  WageStatus,
  WeeklyDutySchedule,
  WeeklyFoodsMenu,
} from "../../../../type.ts";

import ServiceRoutePlanTable from "../../../../components/ServiceRoutePlanTable.tsx";
import WageStatusChart from "../../../../components/WageStatusChart.tsx";
import CardsRow from "../../../../components/CardsRow.tsx";
import ServicePaymentStatusTable from "../../../../components/ServicePaymentStatusTable.tsx";
import QuickAttendanceListTable from "../../../../components/QuickAttendanceListTable.tsx";
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
  wage_status?: WageStatus;
  servicePaymentStatus: Status2[];
  quickAttendanceList: any[];
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  serviceRoute,
  wage_status,
  servicePaymentStatus,
  quickAttendanceList,
}) => {
  return (
    <Row>
      <CardsRow cardsData={cardsData} />
      <Col xxl={6}>
        {/* Servis route*/}
        <ServiceRoutePlanTable serviceRoute={serviceRoute} />
          <ServicePaymentStatusTable servicePaymentStatus={servicePaymentStatus} />

      </Col>

      <Col xxl={6}>
    {/* ücret planı durumu */}
        <WageStatusChart wageStatus={wage_status} />
             <QuickAttendanceListTable quickAttendanceList={quickAttendanceList} />
    
      </Col>
    </Row>
  );
};

export default LeftSection;
