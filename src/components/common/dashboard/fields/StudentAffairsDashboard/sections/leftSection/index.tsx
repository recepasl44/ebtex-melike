import React from "react";
import { Col, Row } from "react-bootstrap";

import { ApexOptions } from "apexcharts";
import {
  Analysis,
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
} from "../../../../type.ts";
import CardsRow from "../../../../components/CardsRow.tsx";
import InternalExternalRecordByMonth from "../../../../components/InternalExternalRecordByMonth.tsx";
import UpcomingTasksAndRemindersTable from "../../../../components/UpcomingTasksAndRemindersTable.tsx";
import ServicesStatusTable from "../../../../components/ServicesStatusTable.tsx";
import MaleandfemaleStudentsCountChart from "../../../../components/MaleandfemaleStudentsCountChart.tsx";
import DistributionofPollingTypeChart from "../../../../components/DistributionofPollingTypeChart.tsx";
import ExamCountdown from "../../../../components/ExamCountdown.tsx";
import WeeklyShiftScheduleTable from "../../../../components/WeeklyShiftScheduleTable.tsx";
import ClassHourAttendanceSummaryTable from "../../../../components/ClassHourAttendanceSummaryTable.tsx";
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
  maleandfemaleStudentsCount: NumberOfMaleAndFemaleStudent[]
  homeworkStatusAnalysis: HomeworkStatusAnalysis;
  trialExamScoreDistribution: TrialExamScoreDistribution[];
  dailyCourseSchedule: DailyClassSchedule[];
  serviceStatus: Status[];
  consultingMeetingList: PdrMeetingList[];
  attendanceTypeDistribution: PollTypeDistribution;
  examCountdown:ExamCountdownItem[]
  weeklyDutySchedule: WeeklyDutySchedule[];
  classHourAttendanceSummary: ClassHourAttendanceSummary[];

}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  Number_of_internal_and_external_records_by_month,
  examCountdown,
  attendanceTypeDistribution,
  serviceStatus,
  upcomingTasksAndReminders,
  maleandfemaleStudentsCount,
  weeklyDutySchedule,
  classHourAttendanceSummary,
}) => {
  return (
    <Row>
      <CardsRow cardsData={cardsData} />
      <Col xxl={6}>
        {/* Deneme sınavı Puan Dağılımı*/}
        <InternalExternalRecordByMonth Number_of_internal_and_external_records_by_monthData={Number_of_internal_and_external_records_by_month} />
        {/* Yaklaşan Görevler ve Hatırlatmalar */}
        <UpcomingTasksAndRemindersTable upcomingTasksAndReminders={upcomingTasksAndReminders} />
      </Col>

      <Col xxl={6}>
        <ServicesStatusTable data={serviceStatus} />
        {/* Yoklama türü dağılımı */}
        <MaleandfemaleStudentsCountChart maleandfemaleStudentsCount={maleandfemaleStudentsCount} />
      </Col>

      {/* New row for side-by-side fields */}
      <Row >
        <Col xxl={5} xl={5}>
          {/*Yoklama türü Dağılımı */}
          <DistributionofPollingTypeChart data={attendanceTypeDistribution} />
          {/* Sınav Geri Sayım */}
          <ExamCountdown examCountdown={examCountdown} />
        </Col>
        <Col xxl={7} xl={7}>
          {/* Haftalık Nöbet Çizelgesi */}
          <WeeklyShiftScheduleTable data={weeklyDutySchedule} />
          {/* ders saati yoklama özeti */}
          <ClassHourAttendanceSummaryTable data={classHourAttendanceSummary} />
        </Col>
      </Row>

    </Row>
  );
};

export default LeftSection;
