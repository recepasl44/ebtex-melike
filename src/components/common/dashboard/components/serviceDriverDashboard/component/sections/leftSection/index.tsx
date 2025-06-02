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
import UpcomingTasksAndRemindersTable from "./UpcomingTasksAndRemindersTable";
import DistributionofPollingTypeChart from "./DistributionofPollingTypeChart";
import ExamCountdown from "./ExamCountdown";
import ServicesStatusTable from "./ServicesStatusTable";
import MaleandfemaleStudentsCountChart from "./MaleandfemaleStudentsCountChart";
import WeeklyShiftScheduleTable from "./WeeklyShiftScheduleTable";
import ClassHourAttendanceSummaryTable from "./ClassHourAttendanceSummaryTable";
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
        <MaleandfemaleStudentsCountChart
          maleandfemaleStudentsCount={maleandfemaleStudentsCount}
        />
        {/* Haftalık nöbet cizelgesi */}
        <WeeklyShiftScheduleTable data={weeklyDutySchedule} />
      </Col>

      <Col xxl={6}>
        <ServicesStatusTable data={serviceStatus} />
        {/* YOklama türü dağılımı*/}
        <DistributionofPollingTypeChart data={attendanceTypeDistribution} />
        {/* Sınav geri sayım */}
        <ExamCountdown examCountdown={examCountdown} />
      </Col>

      {/* New row for side-by-side components */}
      <Row>
        <Col xxl={6} xl={6}>
          {/*Yaklaşan Görevler ve hatırlatmalar  */}
          <UpcomingTasksAndRemindersTable
            upcomingTasksAndReminders={upcomingTasksAndReminders}
          />
        </Col>
        <Col xxl={6} xl={6}>
          {/* Ders saati yoklama özeti*/}
          <ClassHourAttendanceSummaryTable data={classHourAttendanceSummary} />
        </Col>
      </Row>
    </Row>
  );
};

export default LeftSection;
