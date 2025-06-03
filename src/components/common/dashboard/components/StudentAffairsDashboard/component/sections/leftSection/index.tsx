import React from "react";
import { Col, Row } from "react-bootstrap";

import { ApexOptions } from "apexcharts";
import CardsRow from "./CardsRow";
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
} from "../../../../../type";
import InternalExternalRecordByMonth from "./InternalExternalRecordByMonth";
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
      
      {/* New row for side-by-side components */}
      <Row >
        <Col xxl={4} xl={4}>
          {/*Yoklama türü Dağılımı */}
          <DistributionofPollingTypeChart data={attendanceTypeDistribution} />
          {/* Sınav Geri Sayım */}
          <ExamCountdown examCountdown={examCountdown} />
        </Col>
        <Col xxl={8} xl={8}>
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
