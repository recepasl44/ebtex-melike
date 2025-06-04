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
  ServicePaymentInformation,
  ServiceRoutePlan,
  ServiceRouteTimePerformance,
  ServiceVehicleInformation,
  StaffLeaveTrackingTable,
  Status,
  Supplier,
  TrialExamScoreDistribution,
  UpcomingTasksAndReminder,
  WageStatus,
  WeeklyDutySchedule,
  WeeklyFoodsMenu,
} from "../../../../type.ts";
import CardsRow from "../../../../components/CardsRow.tsx";
import WageStatusChart from "../../../../components/WageStatusChart.tsx";
import ServiceVehicleInformationTable from "../../../../components/ServiceVehicleInformationTable.tsx";
import Calendar from "../../../../components/Calendar.tsx";
import ServicePaymentinformationTable from "../../../../components/ServicePaymentinformationTable.tsx";

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
  wage_status?: WageStatus;
  serviceVehicleInformation: ServiceVehicleInformation[];
  servicePaymentInformation: ServicePaymentInformation[]; // Corrected casing here (was servicePaymentinformation)
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  wage_status,
  serviceVehicleInformation,
  servicePaymentInformation,
}) => {
  return (
    <Row>
      <CardsRow cardsData={cardsData} />
      <Col xxl={6}>
      {/*Servis Araç Bilgileri */}
           <ServiceVehicleInformationTable serviceVehicleInformation={serviceVehicleInformation} />
           <Calendar />
      </Col>
      <Col xxl={6}>
        {/* ücret planı durumu */}
        <WageStatusChart wageStatus={wage_status} />
        <ServicePaymentinformationTable servicePaymentinformation={servicePaymentInformation} />
      </Col>
    </Row>
  );
};

export default LeftSection;