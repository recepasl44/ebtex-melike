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
  StaffLeaveTrackingTable,
  Status,
  Supplier,
  TrialExamScoreDistribution,
  UpcomingTasksAndReminder,
  WeeklyDutySchedule,
  WeeklyFoodsMenu,
} from "../../../../type.ts";
import CardsRow from "../../../../components/CardsRow.tsx";
import MaleandfemaleStudentsCountChart from "../../../../components/MaleandfemaleStudentsCountChart.tsx";
import WeeklyShiftScheduleTable from "../../../../components/WeeklyShiftScheduleTable.tsx";
import DistributionofPollingTypeChart from "../../../../components/DistributionofPollingTypeChart.tsx";
import ExamCountdown from "../../../../components/ExamCountdown.tsx";
import UpcomingTasksAndRemindersTable from "../../../../components/UpcomingTasksAndRemindersTable.tsx";
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
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  examCountdown,
  attendanceTypeDistribution,
  upcomingTasksAndReminders,
  maleandfemaleStudentsCount,
  weeklyDutySchedule,
  dailyCourseSchedule,
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
        {/*Yaklaşan Görevler ve hatırlatmalar  */}
        <UpcomingTasksAndRemindersTable
          upcomingTasksAndReminders={upcomingTasksAndReminders}
        />
      </Col>

      <Col xxl={6}>
        <DailyCourseScheduleTable data={dailyCourseSchedule} />

        {/* YOklama türü dağılımı*/}
        <DistributionofPollingTypeChart data={attendanceTypeDistribution} />
        {/* Sınav geri sayım */}
        <ExamCountdown examCountdown={examCountdown} />
      </Col>
    </Row>
  );
};

export default LeftSection;
