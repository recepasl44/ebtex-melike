import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DashboardResponseType } from "../../../type.ts";
import { RootState } from "../../../../../../store";
import { generateChartOptions } from "../../../../../../helpers/generateChartOptions.ts";
import { generateChartSeries } from "../../../../../../utils/generateChartSeries.ts";
import {
  convertToAttendanceStatus,
  generateAttendanceData,
} from "../../../../../../helpers/generateAttendanceData.ts";
import LeftSection from "./leftSection";
import RightSection from "./rightSection";
import teacher from "../../../../../../assets/images/faces/teacher.png";
import person from "../../../../../../assets/images/faces/person.png";
import girl from "../../../../../../assets/images/faces/girl.png";
import boy from "../../../../../../assets/images/faces/boy.png";
import bigGirl from "../../../../../../assets/images/faces/bigGirl.png";
import bigGirl2 from "../../../../../../assets/images/faces/bigGirl2.png";
import free from "../../../../../../assets/images/faces/1.jpg";
import { generateFinanceOfficerData } from "../../../../../../utils/generateFinanceOfficerData.ts";
import Payments from "../../../components/Payments.tsx";
import ThoseWhoPromisetoPayTable from "../../../components/ThoseWhoPromisetoPayTable.tsx";
import ParentFeedbackPanelTable from "../../../components/ParentFeedbackPanelTable.tsx";
import Calendar from "../../../components/Calendar.tsx";
import PersonnelTaskDistribution from "../../../components/PersonnelTaskDistribution.tsx";
import ServicesStatusTable from "../../../components/ServicesStatusTable.tsx";

interface Row7Props {
  data: DashboardResponseType;
}

const Row7Component: React.FC<Row7Props> = ({ data }) => {
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
  const Cardsdata = generateFinanceOfficerData(data);

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
  // yaklaşan randevular
  const upcomingAppointments = data.data[0].upcoming_appointments;
  // ödeme vaadinde bulunanlar
  const thoseWhoPromisetoPay = data.data[0].those_who_promise_to_pay;
  // Finansal görevler ve hatırlatmalar
  const financialTasksAndReminders = data.data[0].financial_tasks_and_reminders;
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
          upcomingAppointments={upcomingAppointments}
          financialTasksAndReminders={financialTasksAndReminders}
        />
      </Col>

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
      <Row>
        <Col xl={12} xxl={12}>
          <ServicesStatusTable data={serviceStatus} />
        </Col>
      </Row>
      <Row>
        <Col xl={6} xxl={6}>
          {/* Ödemeler */}

          <Payments supplierPayments={supplierPayments} />
        </Col>
        <Col xl={6} xxl={6}>
          <ParentFeedbackPanelTable data={parentFeedbackPanel} />
        </Col>
      </Row>
      {/* TAkvim ve ödeme vaadinde bulunanlar */}
      <Row>
        <Col xl={6} xxl={6}>
          <Calendar />
        </Col>
        <Col xl={6} xxl={6}>
          <ThoseWhoPromisetoPayTable data={thoseWhoPromisetoPay} />
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

export default Row7Component;
