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
  StaffLeaveTrackingTable,
  Status,
  Supplier,
  TrialExamScoreDistribution,
  UpcomingTasksAndReminder,
  WeeklyDutySchedule,
  WeeklyFoodsMenu,
} from "../../../../../type";
import InternalExternalRecordByMonth from "./InternalExternalRecordByMonth";
import UpcomingTasksAndRemindersTable from "./UpcomingTasksAndRemindersTable";
import ServicesStatusTable from "./ServicesStatusTable";
import MaleandfemaleStudentsCountChart from "./MaleandfemaleStudentsCountChart";
import ClassHourAttendanceSummaryTable from "./ClassHourAttendanceSummaryTable";
import MonthlyInstallmentStatusTable from "./MonthlyInstallmentStatusTable";
import GenerationAppointmentsTable from "./GenerationAppointmentsTable";
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
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  Number_of_internal_and_external_records_by_month,
  chartOptions,
  chartSeries,
  serviceStatus,
  upcomingTasksAndReminders,
  maleandfemaleStudentsCount,
  classHourAttendanceSummary,
  upcomingAppointments,
}) => {
  return (
    <Row>
      <CardsRow cardsData={cardsData} />
      <Col xxl={6}>
        {/* Deneme sınavı Puan Dağılımı*/}
        <InternalExternalRecordByMonth
          Number_of_internal_and_external_records_by_monthData={
            Number_of_internal_and_external_records_by_month
          }
        />
        {/* Yaklaşan Görevler ve Hatırlatmalar */}
        <UpcomingTasksAndRemindersTable
          title="Finansal Görevler ve Hatırlatmalar"
          upcomingTasksAndReminders={upcomingTasksAndReminders}
        />
      </Col>

      <Col xxl={6}>
        <ServicesStatusTable data={serviceStatus} />
        {/* Kız ve erkek Öğrewnci Sayıları*/}
        <MaleandfemaleStudentsCountChart
          maleandfemaleStudentsCount={maleandfemaleStudentsCount}
        />
      </Col>

      {/* New row for side-by-side components */}
      <Row>
        <Col xxl={6} xl={6}>
          {/*Aylık Taksit Durumu */}
          <MonthlyInstallmentStatusTable
            chartOptions={chartOptions}
            chartSeries={chartSeries}
          />
          {/*ders saati yoklama özeti*/}
          <ClassHourAttendanceSummaryTable data={classHourAttendanceSummary} />
        </Col>
        <Col xxl={6} xl={6}>
          {/* Yaklaşan rrandevular */}
          <GenerationAppointmentsTable data={upcomingAppointments} />
          {/* ders saati yoklama özeti */}
          <ClassHourAttendanceSummaryTable data={classHourAttendanceSummary} />
        </Col>
      </Row>
    </Row>
  );
};

export default LeftSection;
