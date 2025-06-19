import React from "react";
import { Col, Row } from "react-bootstrap";

import { ApexOptions } from "apexcharts";
import {
  Analysis,
  Appointment,
  ClassHourAttendanceSummary,
  DailyClassSchedule,
  ExamCountdownItem,
  FinancialTasksAndReminder,
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
} from "../../../../type.ts";

import MonthlyInstallmentStatusTable from "../../../../components/MonthlyInstallmentStatusTable.tsx";
import FinancialTasksandRemindersTable from "../../../../components/FinancialTasksandRemindersTable.tsx";
import CardsRow from "../../../../components/CardsRow.tsx";
import InternalExternalRecordByMonth from "../../../../components/InternalExternalRecordByMonth.tsx";
import MaleandfemaleStudentsCountChart from "../../../../components/MaleandfemaleStudentsCountChart.tsx";
import ClassHourAttendanceSummaryTable from "../../../../components/ClassHourAttendanceSummaryTable.tsx";
import StaffLeaveTrackingTableRow from "../../../../components/StaffLeaveTrackingTable.tsx";
import DailyCourseScheduleTable from "../../../../components/DailyCourseScheduleTable.tsx";
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
  financialTasksAndReminders: FinancialTasksAndReminder[];
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  Number_of_internal_and_external_records_by_month,
  chartOptions,
  chartSeries,
  maleandfemaleStudentsCount,
  classHourAttendanceSummary,
  financialTasksAndReminders,
  staffLeaveTracking,
  dailyCourseSchedule,
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
        {/* Finansal Görevler ve Hatırlatmalar */}
        <FinancialTasksandRemindersTable
          financialTasksAndReminders={financialTasksAndReminders}
        />
      </Col>

      <Col xxl={6}>
        <DailyCourseScheduleTable data={dailyCourseSchedule} />
        {/* Kız ve erkek Öğrewnci Sayıları*/}
        <MaleandfemaleStudentsCountChart
          maleandfemaleStudentsCount={maleandfemaleStudentsCount}
        />
      </Col>

      {/* New row for side-by-side fields */}
      <Row>
        <Col xxl={6} xl={6}>
          {/*Aylık Taksit Durumu */}
          <MonthlyInstallmentStatusTable
            chartOptions={chartOptions}
            chartSeries={chartSeries}
          />
        </Col>
        <Col xxl={6} xl={6}>
          {/* ders saati yoklama özeti */}
          <ClassHourAttendanceSummaryTable data={classHourAttendanceSummary} />
        </Col>
      </Row>
      <Row>
        <Col xxl={12} xl={12}>
          {/* Personel İzin Takibi */}
          <StaffLeaveTrackingTableRow staffLeaveTracking={staffLeaveTracking} />
        </Col>
      </Row>
    </Row>
  );
};

export default LeftSection;
