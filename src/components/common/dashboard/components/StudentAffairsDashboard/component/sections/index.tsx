import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DashboardResponseType } from "../../../../type";
import { RootState } from "../../../../../../../store";
import { generateChartOptions } from "../../../../../../../helpers/generateChartOptions";
import { generateChartSeries } from "../../../../../../../utils/generateChartSeries";
import {
  convertToAttendanceStatus,
  generateAttendanceData,
} from "../../../../../../../helpers/generateAttendanceData";
import LeftSection from "./leftSection";
import RightSection from "./rightSection";
import teacher from "../../../../../../../assets/images/faces/teacher.png";
import person from "../../../../../../../assets/images/faces/person.png";
import girl from "../../../../../../../assets/images/faces/girl.png";
import boy from "../../../../../../../assets/images/faces/boy.png";
import bigGirl from "../../../../../../../assets/images/faces/bigGirl.png";
import bigGirl2 from "../../../../../../../assets/images/faces/bigGirl2.png";
import free from "../../../../../../../assets/images/faces/1.jpg";
import { generateStudendAfraidData } from "../../../../../../../utils/generateStudentAfraidData";
import StaffLeaveTrackingTableRow from "../../../foundingDirectorDashboard/component/sections/leftSection/StaffLeaveTrackingTable";
import DailyCourseScheduleTable from "./leftSection/DailyCourseScheduleTable";
import Calendar from "./Calendar";
import ParentFeedbackPanelTable from "./leftSection/ParentFeedbackPanelTable";
import PersonnelTaskDistribution from "./PersonnelTaskDistribution";

interface Row6Props {
  data: DashboardResponseType;
}

const Row6Component: React.FC<Row6Props> = ({ data }) => {
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  const images = {
    teacher: teacher,
    staff: person,
    kindergarten: girl,
    primary: boy,
    middle: bigGirl,
    anatolian: bigGirl2,
    science: bigGirl2,
    total: free,
  };
  const Cardsdata = generateStudendAfraidData(data);

  const Overoptions = generateChartOptions();
  const Overseries = generateChartSeries(data);

  // Günlük devam verisi
  const attendanceData = generateAttendanceData(
    convertToAttendanceStatus(data.data[0].daily_attendance_status),
    images
  );
  // Haftalık yemek menüsü verisi
  const weeklyFoodsMenu = data.data[0].weekly_foods_menu[0];

  // Ödemeler (supplier) verisi
  const supplierPayments = data.data[0].payments?.suppliers || [];
  // dönemsel Karsılastırma verisi
  const periodicalComparisionData = data.data[0].periodic_comparison;
  // İç ve dış kayıtların aylık dağılımı
  const Number_of_internal_and_external_records_by_month =
    data.data[0].Number_of_internal_and_external_records_by_month;
  // Günlük bülten verisi
  const daily_bulletins = data.data[0].daily_bulletins;
  // Personel izin takip tablosu verisi
  const staffLeaveTracking = data.data[0].staff_leave_tracking_table;
  // Personel görev dağılımı verisi
  const staffTaskDistribution = data.data[0].staff_task_distribution_table;
  // Kurs Basarı Analizi verisi
  const courseSuccessAnalysis = data.data[0].course_success_analysis;
  // Yaklaşan Görevler ve Hatırlatmalar
  const upcomingTasksAndReminders = data.data[0].upcoming_tasks_and_reminders;
  //kız ve erkek öğrenci sayıları
  const maleandfemaleStudentsCount =
    data.data[0].number_of_male_and_female_students;
  // Ödev durumu analizi
  const homeworkStatusAnalysis = data.data[0].homework_status_analysis;
  // Veli geri bildirim Paneli
  const parentFeedbackPanel = data.data[0].parent_feedback_panel;
  //Sınav Geri Sayımı
  const examCountdown = data.data[0].exam_countdown;
  // Günlük ders programı
  const dailyCourseSchedule = data.data[0].daily_class_schedule;
  // Haftalık nöbet çizelgesi
  const weeklyDutySchedule = data.data[0].weekly_duty_schedule;
  // Deneme sınavları puan dağılımı
  const trialExamScoreDistribution = data.data[0].trial_exam_score_distribution;
  // servis durumu
  const serviceStatus = data.data[0].service_status;
  // Ders saati yoklama özeti
  const classHourAttendanceSummary = data.data[0].class_hour_attendance_summary;
  // Sonuçlanan Ödev Sayıları
  const numberOfFinalizedAssignments =
    data.data[0].number_of_completed_assignments;
  // Danısmanlık Görüşmeleri Listesi
  const consultingMeetingList = data.data[0].pdr_meeting_list;
  // Yoklama türü dağılımı
  const attendanceTypeDistribution = data.data[0].poll_type_distribution;

  return (
    <Row>
      {/* Sol Sütun - Col 9 */}
      <Col xl={9} xxl={9}>
        <LeftSection
          isDark={isDark}
          cardsData={Cardsdata}
          chartOptions={Overoptions}
          chartSeries={Overseries}
          weeklyFoodsMenu={weeklyFoodsMenu}
          supplierPayments={supplierPayments}
          periodicComprassion={periodicalComparisionData}
          Number_of_internal_and_external_records_by_month={
            Number_of_internal_and_external_records_by_month
          }
          consultingMeetingList={consultingMeetingList}
          staffLeaveTracking={staffLeaveTracking}
          courseSuccessAnalysis={courseSuccessAnalysis}
          upcomingTasksAndReminders={upcomingTasksAndReminders}
          maleandfemaleStudentsCount={maleandfemaleStudentsCount}
          homeworkStatusAnalysis={homeworkStatusAnalysis}
          trialExamScoreDistribution={trialExamScoreDistribution}
          dailyCourseSchedule={dailyCourseSchedule}
          serviceStatus={serviceStatus}
          attendanceTypeDistribution={attendanceTypeDistribution}
          examCountdown={examCountdown}
          weeklyDutySchedule={weeklyDutySchedule}
          classHourAttendanceSummary={classHourAttendanceSummary}
        />
      </Col>

      {/* Sağ Sütun - Col 3 */}
      <Col xl={3} xxl={3}>
        <RightSection
          homeworkStatusAnalysis={homeworkStatusAnalysis}
          isDark={isDark}
          attendanceData={attendanceData}
          daily_bulletins={daily_bulletins}
          numberOfFinalizedAssignments={numberOfFinalizedAssignments}
          weeklyFoodsMenu={weeklyFoodsMenu}
        />
      </Col>
      {/* Personel İzin Takip Tablosu */}
      <Row>
        <Col xl={8} xxl={8}>
          <StaffLeaveTrackingTableRow staffLeaveTracking={staffLeaveTracking} />
        </Col>
        <Col xl={4} xxl={4}>
          <DailyCourseScheduleTable data={dailyCourseSchedule} />
        </Col>
      </Row>
      <Row>
        <Col xl={6} xxl={6}>
          <Calendar />
        </Col>
        <Col xl={6} xxl={6}>
          <ParentFeedbackPanelTable data={parentFeedbackPanel} />
        </Col>
      </Row>
      {/* Personel görev dağılımı */}
      <Row>
        <PersonnelTaskDistribution
          personnelTaskDistribution={staffTaskDistribution}
        />
      </Row>
    </Row>
  );
};

export default Row6Component;
