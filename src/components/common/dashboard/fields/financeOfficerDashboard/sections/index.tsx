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
  const firstItem = data?.data?.[0];

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
    convertToAttendanceStatus(firstItem?.daily_attendance_status),
    images
  );
  // Haftalık yemek menüsü verisi
  const weeklyFoodsMenu = firstItem?.weekly_foods_menu[0];

  // Ödemeler (supplier) verisi
  const supplierPayments = firstItem?.payments?.suppliers || [];
  // dönemsel Karsılastırma verisi
  const periodicalComparisionData = firstItem?.periodic_comparison;
  // İç ve dış kayıtların aylık dağılımı
  const Number_of_internal_and_external_records_by_month =
    firstItem?.Number_of_internal_and_external_records_by_month;
  // Günlük bülten verisi
  const daily_bulletins = firstItem?.daily_bulletins || [];
  // Personel izin takip tablosu verisi
  const staffLeaveTracking = firstItem?.staff_leave_tracking_table || [];
  // Personel görev dağılımı verisi
  const staffTaskDistribution = firstItem?.staff_task_distribution_table || [];
  // Kurs Basarı Analizi verisi
  const courseSuccessAnalysis = firstItem?.course_success_analysis || [];
  // Yaklaşan Görevler ve Hatırlatmalar
  const upcomingTasksAndReminders = firstItem?.upcoming_tasks_and_reminders || [];
  //kız ve erkek öğrenci sayıları
  const maleandfemaleStudentsCount =
    firstItem?.number_of_male_and_female_students || [];
  // Ödev durumu analizi
  const homeworkStatusAnalysis = firstItem?.homework_status_analysis;
  // Veli geri bildirim Paneli
  const parentFeedbackPanel = firstItem?.parent_feedback_panel || [];
  //Sınav Geri Sayımı
  const examCountdown = firstItem?.exam_countdown;
  // Günlük ders programı
  const dailyCourseSchedule = firstItem?.daily_class_schedule || [];
  // Haftalık nöbet çizelgesi
  const weeklyDutySchedule = firstItem?.weekly_duty_schedule || [];
  // Deneme sınavları puan dağılımı
  const trialExamScoreDistribution = firstItem?.trial_exam_score_distribution || [];
  // servis durumu
  const serviceStatus = firstItem?.service_status || [];
  // Ders saati yoklama özeti
  const classHourAttendanceSummary = firstItem?.class_hour_attendance_summary || [];
  // Sonuçlanan Ödev Sayıları
  const numberOfFinalizedAssignments =
    firstItem?.number_of_completed_assignments || [];
  // Danısmanlık Görüşmeleri Listesi
  const consultingMeetingList = firstItem?.pdr_meeting_list || [];
  // Yoklama türü dağılımı
  const attendanceTypeDistribution = firstItem?.poll_type_distribution;
  // yaklaşan randevular
  const upcomingAppointments = firstItem?.upcoming_appointments || [];
  // ödeme vaadinde bulunanlar
  const thoseWhoPromisetoPay = firstItem?.those_who_promise_to_pay || [];
  // Finansal görevler ve hatırlatmalar
  const financialTasksAndReminders = firstItem?.financial_tasks_and_reminders || [];
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
